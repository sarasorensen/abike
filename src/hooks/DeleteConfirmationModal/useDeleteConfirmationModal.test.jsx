import { act, renderHook } from "@testing-library/react";
import { useDeleteConfirmationModal } from "./useDeleteConfirmationModal"; 
import { deleteOrder, getOrdersFromStorage } from "../../utilities/ordersStorage";
import { useNavigate, useLocation } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("../../utilities/ordersStorage", () => ({
  deleteOrder: jest.fn(),
  getOrdersFromStorage: jest.fn(),
}));

describe("useDeleteConfirmationModal", () => {
  let setOrders; 

  beforeEach(() => {
    jest.clearAllMocks();

    useNavigate.mockReturnValue(jest.fn());
    useLocation.mockReturnValue({
      pathname: "/orders/1",
    });
  });

  it('should set showModal to true when handleSelect is called with "Delete order"', () => {
    const { result } = renderHook(() => useDeleteConfirmationModal(setOrders));

    act(() => {
      result.current.handleSelect("Delete order", "1");
    });

    expect(result.current.showModal).toBe(true);
    expect(result.current.deleteId).toBe("1");
  });

  it('should not show modal if label is not "Delete order"', () => {
    const { result } = renderHook(() => useDeleteConfirmationModal(setOrders));

    act(() => {
      result.current.handleSelect("Edit order", "1");
    });

    expect(result.current.showModal).toBe(false);
  });

  it("should call deleteOrder and set showSuccessMessage when confirmDelete is called", async () => {
    const { result } = renderHook(() => useDeleteConfirmationModal(setOrders));
    const deleteMock = jest.fn();
    const getOrdersMock = jest.fn(() => [{ id: "1", label: "Test Order" }]);

    deleteOrder.mockImplementation(deleteMock);
    getOrdersFromStorage.mockImplementation(getOrdersMock);

    act(() => {
      result.current.handleSelect("Delete order", "1");
    });

    act(() => {
      result.current.confirmDelete();
    });

    expect(deleteMock).toHaveBeenCalledWith("1");
    expect(result.current.showSuccessMessage).toBe(true);
    expect(result.current.loading).toBe(true);
  });

  it("should call cancelDelete and set showModal to false", () => {
    const { result } = renderHook(() => useDeleteConfirmationModal(setOrders));

    act(() => {
      result.current.handleSelect("Delete order", "1");
    });

    act(() => {
      result.current.cancelDelete();
    });

    expect(result.current.showModal).toBe(false);
  });
});
