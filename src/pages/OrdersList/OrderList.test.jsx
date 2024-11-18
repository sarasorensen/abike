import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrdersList from "./index";
import { mockedOrders } from "../../shared-constants/mockedOrders";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("OrdersList", () => {
  it("should filter orders by phone number", async () => {
    render(<OrdersList />);

    const phoneNumberInput = screen.getByTestId('input_search_phone_number');
    userEvent.type(phoneNumberInput, "12345");

    await waitFor(() => {
      expect(phoneNumberInput.value).toBe("12345");
    });
  });

  it("should filter orders by email", async () => {
    render(<OrdersList />);

    const emailInput = screen.getByTestId('input_search_email');
    userEvent.type(emailInput, "john@example.com");

    await waitFor(() => {
      expect(emailInput.value).toBe("john@example.com");
    });
  });

  it("should filter orders by service type", async () => {
    render(<OrdersList />);
    
    const serviceSelect = screen.getByTestId('select_service_type');
  
    await waitFor(() => {
      expect(serviceSelect.value).toBe("All");
    });

    userEvent.click(serviceSelect);
  
    const brakeMaintenanceOption = await screen.findAllByText("Brake maintenance");
  
    userEvent.click(brakeMaintenanceOption[0]);
  
    await waitFor(() => {
      expect(serviceSelect.value).toBe("Brake maintenance");
    });

    const serviceFilter = "brake maintenance";  
    userEvent.clear(serviceSelect);
    userEvent.type(serviceSelect, serviceFilter);

    await waitFor(() => {
      expect(serviceSelect.value).toBe("Brake maintenance");
    });
  });
  
  it("should reset filters when reset button is clicked", async () => {
    render(<OrdersList />);

    userEvent.type(screen.getByTestId('input_search_phone_number'), "12345");

    userEvent.click(screen.getByTestId('reset_filter'));

    await waitFor(() => {
      expect(screen.getByTestId('input_search_phone_number').value).toBe("");
    });
  });

  it("should sort orders by phone number ascending", async () => {
    render(<OrdersList />);

    const phoneNumberHeader = screen.getByText("Phone Number");
    userEvent.click(phoneNumberHeader);

    await waitFor(() => {
      expect(screen.getByText(mockedOrders[0].phoneNumber)).toBeInTheDocument();
    });
  });

  it("should sort orders by phone number descending", async () => {
    render(<OrdersList />);

    const phoneNumberHeader = screen.getByText("Phone Number");
    userEvent.click(phoneNumberHeader); 
    userEvent.click(phoneNumberHeader); 

    await waitFor(() => {
      expect(screen.getByText(mockedOrders[mockedOrders.length - 1].phoneNumber)).toBeInTheDocument();
    });
  });

  it("should sort orders by due date", async () => {
    render(<OrdersList />);

    const dueDateHeader = screen.getByText("Due Date");
    userEvent.click(dueDateHeader);

    await waitFor(() => {
      expect(screen.getByText(mockedOrders[0].dueDate)).toBeInTheDocument();
    });
  });
});
