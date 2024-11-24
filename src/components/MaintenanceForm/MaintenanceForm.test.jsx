import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
} from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import MaintenanceForm from "./index";
import useValidation from "../../hooks/Validation/useValidation";
import ids from "./test-ids.json";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

const formData = {
  customerName: "John Doe",
  phoneNumber: "+1234567890",
  email: "johndoe@example.com",
  bikeBrand: "Trek",
  serviceType: "wheel_replacement",
  dueDate: "2024-12-31",
  notes: "Customer requested urgent service",
};

const touchedFields = ["customerName", "email"];
const loading = false;

describe("MaintenanceForm", () => {
  const mockOnSubmit = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form correctly", async () => {
    render(<MaintenanceForm onSubmit={mockOnSubmit} />);

    const customerNameInput = screen.getByTestId(ids.inputCustomerName);
    const phoneNumberInput = screen.getByTestId(ids.inputPhoneNumber);
    const emailInput = screen.getByTestId(ids.inputEmail);
    const bikeBrandInput = screen.getByTestId(ids.inputBikeBrand);
    const dueDateInput = screen.getByTestId(ids.inputDueDate);
    const serviceTypeSelect = screen.getByTestId(ids.selectServiceType);
    const notesTextArea = screen.getByTestId(ids.textAreaNotes);
    const cancelButton = screen.getByTestId(ids.buttonCancelMaintenance);
    const submitButton = screen.getByTestId(ids.buttonSubmitMaintenance);

    await waitFor(() => {
      expect(customerNameInput).toBeInTheDocument();
      expect(phoneNumberInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(bikeBrandInput).toBeInTheDocument();
      expect(dueDateInput).toBeInTheDocument();
      expect(serviceTypeSelect).toBeInTheDocument();
      expect(notesTextArea).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  it("allows input values to be entered and submits onclick", async () => {
    render(<MaintenanceForm onSubmit={mockOnSubmit} />);

    const { result } = renderHook(() =>
      useValidation(formData, touchedFields, loading)
    );

    const customerNameInput = screen.getByTestId(ids.inputCustomerName);
    const phoneNumberInput = screen.getByTestId(ids.inputPhoneNumber);
    const emailInput = screen.getByTestId(ids.inputEmail);
    const bikeBrandInput = screen.getByTestId(ids.inputBikeBrand);
    const dueDateInput = screen.getByTestId(ids.inputDueDate);
    const serviceTypeSelect = screen.getByTestId(ids.selectServiceType);
    const notesTextArea = screen.getByTestId(ids.textAreaNotes);
    const submitButton = screen.getByTestId(ids.buttonSubmitMaintenance);

    fireEvent.change(customerNameInput, { target: { value: "John Doe" } });
    fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(bikeBrandInput, { target: { value: "Trek" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-12-01" } });
    fireEvent.change(notesTextArea, {
      target: { value: "Please check the brakes." },
    });
    expect(serviceTypeSelect).toHaveValue("");

    fireEvent.click(serviceTypeSelect);

    const option = screen.getByText("Wheel adjustment");
    fireEvent.click(option);

    await waitFor(() => {
      expect(customerNameInput).toHaveValue("John Doe");
      expect(phoneNumberInput).toHaveValue(1234567890);
      expect(emailInput).toHaveValue("john.doe@example.com");
      expect(bikeBrandInput).toHaveValue("Trek");
      expect(dueDateInput).toHaveValue("2024-12-01");
      expect(serviceTypeSelect).toHaveValue("Wheel adjustment");
      expect(notesTextArea).toHaveValue("Please check the brakes.");
      expect(submitButton).toBeEnabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(result.current.checkFormValidity()).toBe(true);
    });
  });

  it("resets form correctly", async () => {
    useNavigate.mockReturnValue(navigate);
    render(<MaintenanceForm onSubmit={mockOnSubmit} />);

    const cancelButton = screen.getByTestId(ids.buttonCancelMaintenance);

    await waitFor(() => {
      expect(cancelButton).toBeInTheDocument();
    });

    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
