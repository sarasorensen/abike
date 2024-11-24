import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { getOrdersFromStorage } from "../../utilities/ordersStorage";
import NewOrder from "./index";
import MaintenanceForm from "../../components/MaintenanceForm";

jest.mock("../../utilities/ordersStorage", () => ({
  getOrdersFromStorage: jest.fn(),
  addOrder: jest.fn(),
  editOrder: jest.fn(),
}));

const order = {
  customerName: "John Doe",
  phoneNumber: "1234567890",
  email: "johndoe@example.com",
  bikeBrand: "Trek",
  serviceType: "chain_repair",
  dueDate: "2024-12-25",
  notes: "Check the brakes",
};

const handleUpdateOrder = jest.fn();

describe("NewOrder Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a new order form", async () => {
    getOrdersFromStorage.mockReturnValue([]);

    render(
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <NewOrder />
      </Router>
    );

    expect(screen.getByTestId("input_customer_name")).toBeInTheDocument();
    expect(screen.getByTestId("input_phone_number")).toBeInTheDocument();
    expect(screen.getByTestId("input_email")).toBeInTheDocument();
    expect(screen.getByTestId("input_bike_brand")).toBeInTheDocument();
    expect(screen.getByTestId("select_service_type")).toBeInTheDocument();
    expect(screen.getByTestId("input_due_date")).toBeInTheDocument();
    expect(screen.getByTestId("text_area_notes")).toBeInTheDocument();
    expect(screen.getByTestId("button_cancel_maintenance")).toBeInTheDocument();
    expect(screen.getByTestId("button_submit_maintenance")).toBeInTheDocument();
  });
  it("should render the form with pre-filled values from orderData prop", async () => {
    render(
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <MaintenanceForm orderData={order} onSubmit={handleUpdateOrder} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("input_customer_name")).toHaveValue("John Doe");
      expect(screen.getByTestId("input_phone_number")).toHaveValue(1234567890);
      expect(screen.getByTestId("input_email")).toHaveValue(
        "johndoe@example.com"
      );
      expect(screen.getByTestId("input_bike_brand")).toHaveValue("Trek");
      expect(screen.getByTestId("select_service_type")).toHaveValue(
        "Chain repair"
      );
      expect(screen.getByTestId("input_due_date")).toHaveValue("2024-12-25");
      expect(screen.getByTestId("text_area_notes")).toHaveValue(
        "Check the brakes"
      );
      expect(
        screen.getByTestId("button_cancel_maintenance")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("button_submit_maintenance")
      ).toBeInTheDocument();
    });
  });
});
