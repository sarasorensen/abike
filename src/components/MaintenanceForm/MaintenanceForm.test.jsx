import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MaintenanceForm from "./index";
import { MemoryRouter } from "react-router-dom";

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe("MaintenanceForm", () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    console.warn.mockRestore();
  });

  it("should render the form with required fields", async () => {
    render(
      <MemoryRouter>
        <MaintenanceForm onSubmit={jest.fn()} title="Maintenance Order" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("input_customer_name")).toBeInTheDocument();
      expect(screen.getByTestId("input_phone_number")).toBeInTheDocument();
      expect(screen.getByTestId("input_email")).toBeInTheDocument();
      expect(screen.getByTestId("input_bike_brand")).toBeInTheDocument();
      expect(screen.getByTestId("select_service_type")).toBeInTheDocument();
      expect(screen.getByTestId("inputDueDate")).toBeInTheDocument();
      expect(screen.getByTestId("text_area_notes")).toBeInTheDocument();
    });
  });

  it("should send form with valid customer name", async () => {
    const onSubmit = jest.fn();

    render(
      <MemoryRouter>
        <MaintenanceForm onSubmit={onSubmit} title="Maintenance Order" />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId("button_submit_maintenance");
    const customerNameInput = screen.getByTestId("input_customer_name");
    const phoneNumberInput = screen.getByTestId("input_phone_number");
    const emailInput = screen.getByTestId("input_email");
    const bikeBrandInput = screen.getByTestId("input_bike_brand");
    const serviceTypeInput = screen.getByTestId("select_service_type");
    const dueDateInput = screen.getByTestId("inputDueDate");
    const notesInput = screen.getByTestId("text_area_notes");

    await waitFor(() => {
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      expect(customerNameInput).toBeInTheDocument();
      expect(phoneNumberInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(bikeBrandInput).toBeInTheDocument();
      expect(serviceTypeInput).toBeInTheDocument();
      expect(dueDateInput).toBeInTheDocument();
      expect(notesInput).toBeInTheDocument();
    });

    userEvent.type(customerNameInput, "John Doe");
    userEvent.type(phoneNumberInput, "1234567890");
    userEvent.type(emailInput, "john.doe@example.com");
    userEvent.type(bikeBrandInput, "Trek");
    userEvent.type(dueDateInput, "2024-12-31");
    userEvent.type(notesInput, "This is a test note");
    userEvent.click(serviceTypeInput);

    const brakeMaintenanceOption = await screen.findAllByText("Brake maintenance");

    userEvent.click(brakeMaintenanceOption[0]);

    await waitFor(() => {
      expect(customerNameInput).toHaveValue("John Doe");
      expect(phoneNumberInput).toHaveValue(1234567890);
      expect(emailInput).toHaveValue("john.doe@example.com");
      expect(bikeBrandInput).toHaveValue("Trek");
      expect(serviceTypeInput.value).toBe("Brake maintenance");
      expect(dueDateInput).toHaveValue("2024-12-31");
      expect(notesInput).toHaveValue("This is a test note");
      expect(submitButton).toBeEnabled();
    });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        id: "123456789",
        customerName: "John Doe",
        phoneNumber: "1234567890",
        email: "john.doe@example.com",
        bikeBrand: "Trek",
        serviceType: "brake_maintenance",
        dueDate: "2024-12-31",
        notes: "This is a test note",
      });
    });
  });
});
