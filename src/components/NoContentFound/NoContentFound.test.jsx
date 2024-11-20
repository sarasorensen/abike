import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import NoContentFound from "./index";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("NoContentFound Component", () => {
  it("should render 'No orders found' and 'Create new order' button", async () => {
    render(<NoContentFound />);

    expect(screen.getByText("No orders found")).toBeInTheDocument();

    const button = screen.getByTestId("create-order-button");
    expect(button).toBeInTheDocument();
  });

  it("should navigate to /orders/new when the button is clicked", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<NoContentFound />);

    const button = screen.getByTestId("create-order-button");
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith("/orders/new");
  });
});
