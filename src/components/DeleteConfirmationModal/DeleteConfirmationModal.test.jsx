import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteConfirmationModal from "./index";
import { getOrdersFromStorage } from "../../utilities/ordersStorage";

jest.mock("../../utilities/ordersStorage", () => ({
  getOrdersFromStorage: jest.fn(),
}));

const mockOnConfirm = jest.fn();
const mockOnCancel = jest.fn();

describe("DeleteConfirmationModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with order details", async () => {
    const mockOrders = [
      { id: "1", customerName: "John Doe" },
      { id: "2", customerName: "Jane Smith" },
    ];
    getOrdersFromStorage.mockReturnValue(mockOrders);

    render(
      <DeleteConfirmationModal
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        orderId="1"
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Confirm Order Deletion/)).toBeInTheDocument();
      expect(
        screen.getByText(/You are about to delete an order/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Are you sure you want to delete order from 'John Doe'/
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId("button_cancel_order")).toBeInTheDocument();
      expect(screen.getByTestId("button_delete_order")).toBeInTheDocument();
      expect(screen.getByTestId("button_delete_order")).not.toBeDisabled();
    });
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const mockOrders = [
      { id: "1", customerName: "John Doe" },
      { id: "2", customerName: "Jane Smith" },
    ];
    getOrdersFromStorage.mockReturnValue(mockOrders);

    render(
      <DeleteConfirmationModal
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        orderId="1"
      />
    );

    const confirmButton = screen.getByTestId("button_delete_order");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const mockOrders = [
      { id: "1", customerName: "John Doe" },
      { id: "2", customerName: "Jane Smith" },
    ];
    getOrdersFromStorage.mockReturnValue(mockOrders);

    render(
      <DeleteConfirmationModal
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        orderId="2"
      />
    );

    const cancelButton = screen.getByTestId("button_cancel_order");
    fireEvent.click(cancelButton);

    await waitFor(() => {
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    })
  });

  it("does not allow confirmation if no order is selected", async () => {
    getOrdersFromStorage.mockReturnValue([]);

    render(
      <DeleteConfirmationModal
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        orderId={null}
      />
    );

    const confirmButton = screen.getByTestId("button_delete_order");

    await waitFor(() => {
      expect(confirmButton).toBeDisabled();
      expect(mockOnCancel).toHaveBeenCalledTimes(0);
    })
  });
});
