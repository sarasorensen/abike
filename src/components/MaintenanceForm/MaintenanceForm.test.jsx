import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MaintenanceForm from "./index";
import ids from "./test-ids.json";

describe("MaintenanceForm", () => {
  it("should render the form with required fields", async () => {
    render(<MaintenanceForm onSubmit={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByTestId(ids.inputCustomerName)).toBeInTheDocument();
      expect(screen.getByTestId(ids.inputPhoneNumber)).toBeInTheDocument();
      expect(screen.getByTestId(ids.inputEmail)).toBeInTheDocument();
      expect(screen.getByTestId(ids.inputBikeBrand)).toBeInTheDocument();
      expect(screen.getByTestId(ids.inputServiceType)).toBeInTheDocument();
      expect(screen.getByTestId(ids.inputDueDate)).toBeInTheDocument();
      expect(screen.getByTestId(ids.textAreaNotes)).toBeInTheDocument();
    });
  });

  it("should show error messages for required fields when empty inputs", async () => {
    render(<MaintenanceForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByTestId(ids.buttonSubmitMaintenance);

    await waitFor(() => {
      expect(submitButton).toBeInTheDocument();
    });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByTestId(ids.inputCustomerName).nextSibling
      ).toHaveTextContent("This field is required");
      expect(
        screen.getByTestId(ids.inputPhoneNumber).nextSibling
      ).toHaveTextContent("This field is required");
      expect(screen.getByTestId(ids.inputEmail).nextSibling).toHaveTextContent(
        "This field is required"
      );
      expect(
        screen.getByTestId(ids.inputBikeBrand).nextSibling
      ).toHaveTextContent("This field is required");
      expect(
        screen.getByTestId(ids.inputServiceType).nextSibling
      ).toHaveTextContent("This field is required");
      expect(
        screen.getByTestId(ids.inputDueDate).nextSibling
      ).toHaveTextContent("This field is required");
    });
  });

  it("should update form field values when typed into", async () => {
    render(<MaintenanceForm onSubmit={jest.fn()} />);

    const customerNameInput = screen.getByTestId(ids.inputCustomerName);
    userEvent.type(customerNameInput, "John Doe");

    await waitFor(() => {
      expect(customerNameInput).toHaveValue("John Doe");
    });
  });
});
