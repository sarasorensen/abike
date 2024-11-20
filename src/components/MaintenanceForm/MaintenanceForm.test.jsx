import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MaintenanceForm from "./index";
import { services } from "../../shared-constants/services";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../hooks/useValidation", () => () => ({
  checkFormValidity: jest.fn(() => true),
  showError: jest.fn(() => false),
  getErrorMessage: jest.fn(() => ""),
}));

describe("MaintenanceForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form correctly", () => {
    render(<MaintenanceForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/customer name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bike brand/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(screen.findByTestId("button_cancel_maintenance").toBeInTheDocument);
    expect(screen.findByTestId("button_submit_maintenance").toBeInTheDocument);
  });
});
