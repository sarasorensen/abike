import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrdersList from "./index";
import { useDeleteConfirmationModal } from "../../hooks/useDeleteConfirmationModal";

jest.mock("../../hooks/useDeleteConfirmationModal", () => ({
  useDeleteConfirmationModal: jest.fn(),
}));

jest.mock("../../utilities/ordersStorage", () => ({
  getOrdersFromStorage: jest.fn(),
}));

jest.mock("../../utilities/formatDate", () => ({
  formatDate: jest.fn().mockReturnValue("01/01/2024"),
}));

jest.mock("../../utilities/getServiceTypeLabel", () => ({
  getServiceTypeLabel: jest.fn().mockReturnValue("Maintenance"),
}));

const mockOrders = [
  {
    id: "1",
    customerName: "John Doe",
    phoneNumber: "123456789",
    email: "john.doe@example.com",
    bikeBrand: "Yamaha",
    dueDate: "2024-01-01",
    serviceType: "basic",
  },
];

describe("OrdersList Component", () => {
  beforeEach(() => {
    useDeleteConfirmationModal.mockReturnValue({
      showModal: false,
      deleteId: null,
      showSuccessMessage: false,
      handleSelect: jest.fn(),
      confirmDelete: jest.fn(),
      cancelDelete: jest.fn(),
    });

    require("../../utilities/ordersStorage").getOrdersFromStorage.mockReturnValue(
      mockOrders
    );

    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <OrdersList />
      </MemoryRouter>
    );
  });

  it("renders OrdersList heading correctly", async () => {
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Options")).toBeInTheDocument();
  });

  it("handles search by name", async () => {
    const searchInput = screen.getByTestId("input_search_customer_name");
    fireEvent.change(searchInput, { target: { value: "John Doe" } });

    expect(searchInput).toHaveValue("John Doe");
  });

  it("doesnt show delete modal", async () => {
    expect(useDeleteConfirmationModal().showModal).not.toBeTruthy();
  });
});
