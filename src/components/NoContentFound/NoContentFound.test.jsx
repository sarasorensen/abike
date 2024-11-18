import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import NoContentFound from "./index";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("NoContentFound Component", () => {
  it("should render 'No orders found' and 'Create new order' button", async () => {
    render(<NoContentFound />);

    await waitFor(() => {
      expect(screen.getByText("No orders found")).toBeInTheDocument();
    });
    const button = screen.getByText("Create new order");

    await waitFor(() => {
      expect(button).toBeInTheDocument();
    });
  });

  it("should navigate to /orders/new when the button is clicked", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<NoContentFound />);

    const button = screen.getByText("Create new order");
    fireEvent.click(button);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/orders/new");
    });
  });
});