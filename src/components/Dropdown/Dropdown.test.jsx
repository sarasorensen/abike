import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./index";
import { BrowserRouter } from "react-router-dom";

const options = [
  { label: "Option 1", icon: "", action: "/option1" },
  { label: "Option 2", icon: "", action: "/option2" },
];

describe("Dropdown Component", () => {
  it("renders dropdown button and toggles dropdown menu on click", async () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Dropdown options={options} />
      </BrowserRouter>
    );

    const buttonOptions = screen.getByTestId("button_options");
    const dropdownMenu = screen.queryByTestId("button_dropdown_elements");
    await waitFor(() => {
      expect(buttonOptions).toBeInTheDocument();
      expect(dropdownMenu).not.toBeInTheDocument();
    });

    userEvent.click(buttonOptions);

    await waitFor(() => {
      expect(screen.getByTestId("dropdown_menu")).toBeInTheDocument();
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    userEvent.click(buttonOptions);
    expect(dropdownMenu).not.toBeInTheDocument();
  });
});
