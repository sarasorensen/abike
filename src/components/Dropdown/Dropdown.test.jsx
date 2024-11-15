import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./index";
import { BrowserRouter } from "react-router-dom";

describe("Dropdown Component", () => {
  const options = [
    { label: "Option 1", icon: "", action: "/option1" },
    { label: "Option 2", icon: "", action: "/option2" },
  ];

  test("renders dropdown button and toggles dropdown menu on click", async () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Dropdown options={options} />
      </BrowserRouter>
    );

    const button = screen.getByTestId("button_options");
    await waitFor(() => {
      expect(button).toBeInTheDocument();
    });

    const dropdownMenu = screen.queryByTestId("button_dropdown_elements");
    await waitFor(() => {
      expect(dropdownMenu).not.toBeInTheDocument();
    });

    userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByTestId("button_dropdown_elements")
      ).toBeInTheDocument();
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });
  });

  test("closes dropdown when button is clicked again", async () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Dropdown options={options} />
      </BrowserRouter>
    );

    const button = screen.getByTestId("button_options");
    userEvent.click(button);

    const dropdownMenu = screen.getByTestId("button_dropdown_elements");

    await waitFor(() => {
      expect(dropdownMenu).toBeInTheDocument();
    });

    userEvent.click(button);
    await waitFor(() => {
      expect(dropdownMenu).not.toBeInTheDocument();
    });
  });
});
