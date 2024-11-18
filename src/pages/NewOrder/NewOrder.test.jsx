import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  getOrdersFromStorage,
  addOrder,
  editOrder,
} from "../../utilities/ordersStorage";
import NewOrder from "./index";

jest.mock("../../utilities/ordersStorage", () => ({
  getOrdersFromStorage: jest.fn(),
  addOrder: jest.fn(),
  editOrder: jest.fn(),
}));

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

    await waitFor(() => {
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
  });
});
