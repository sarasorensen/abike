import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import OrderDetails from "./index";
import { mockedOrders } from "../../shared-constants/mockedOrders";
import ids from "./test-ids.json";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("OrderDetails", () => {
  let navigate;

  beforeAll(() => {
    const originalWarn = console.warn;
    console.warn = (message) => {
      if (message.includes("React Router Future Flag Warning")) {
        return;
      }
      originalWarn(message);
    };
  });

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  it("renders the order details correctly", async () => {
    const order = mockedOrders[0];
    render(
      <MemoryRouter initialEntries={[`/orders/${order.id}`]}>
        <Routes>
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Order Details/i)).toBeInTheDocument();
      expect(screen.getByText(`${order.customerName}`)).toBeInTheDocument();
      expect(screen.getByText(`${order.phoneNumber}`)).toBeInTheDocument();
      expect(screen.getByText(`${order.email}`)).toBeInTheDocument();
      expect(screen.getByText(`${order.bikeBrand}`)).toBeInTheDocument();
      expect(screen.getByText(`${order.serviceType}`)).toBeInTheDocument();
      expect(screen.getByText(`${order.dueDate}`)).toBeInTheDocument();
      expect(screen.getByText(`${order.id}`)).toBeInTheDocument();
    });
  });

  it("navigates when back button is clicked", async () => {
    const order = mockedOrders[0];

    render(
      <MemoryRouter initialEntries={[`/orders/${order.id}`]}>
        <Routes>
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByTestId(ids.buttonGoBack);
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(backButton).toBeInTheDocument();
      expect(backButton).toHaveTextContent("Back to Orders");
      expect(navigate).toHaveBeenCalledWith("/orders");
    });
  });
});