import { renderHook } from "@testing-library/react";
import useValidation from "./useValidation"; 
import { formatFieldToLabel } from "../../utilities/formatFieldToLabel"; 
import DOMPurify from "dompurify";

jest.mock("../../utilities/formatFieldToLabel", () => ({
  formatFieldToLabel: jest.fn(),
}));

jest.mock("dompurify", () => ({
  sanitize: jest.fn(),
}));

describe("useValidation Hook", () => {
  let formData;
  let touchedFields;

  beforeEach(() => {
    formData = {
      id: "",
      customerName: "",
      phoneNumber: "",
      email: "",
      bikeBrand: "",
      serviceType: "",
      dueDate: "",
      notes: "",
    };
    touchedFields = new Set();
    formatFieldToLabel.mockImplementation((field) => field); 
    DOMPurify.sanitize.mockImplementation((input) => input); 
  });

  it("should return error message when phone number is invalid", () => {
    formData.phoneNumber = "123abc"
    touchedFields.add("phoneNumber");

    const { result } = renderHook(() =>
      useValidation(formData, touchedFields, false)
    );

    expect(result.current.showError("phoneNumber")).toBe(true);
    expect(result.current.getErrorMessage("phoneNumber")).toBe(
      "phoneNumber is invalid"
    );
  });

  it("should return error message when email is invalid", () => {
    formData.email = "invalid-email";
    touchedFields.add("email");

    const { result } = renderHook(() =>
      useValidation(formData, touchedFields, false)
    );

    expect(result.current.showError("email")).toBe(true);
    expect(result.current.getErrorMessage("email")).toBe("email is invalid");
  });

  it("should not show error when form data is valid", () => {
    formData.phoneNumber = "1234567890";
    formData.email = "valid@example.com";
    touchedFields.add("phoneNumber");
    touchedFields.add("email");

    const { result } = renderHook(() =>
      useValidation(formData, touchedFields, false)
    );

    expect(result.current.showError("phoneNumber")).toBe(false);
    expect(result.current.showError("email")).toBe(false);
  });

  it("should correctly check form validity", () => {
    formData.customerName = "Jane";
    formData.phoneNumber = "1234567890";
    formData.email = "valid@example.com";
    formData.bikeBrand = "Grant";
    formData.serviceType = "wheel_replacement";
    formData.dueDate = "2024-12-31"

    const { result } = renderHook(() =>
      useValidation(formData, touchedFields, false)
    );

    expect(result.current.checkFormValidity()).toBe(true);

    formData.email = "invalid-email";
    const { result: resultAfterInvalidEmail } = renderHook(() =>
      useValidation(formData, touchedFields, false)
    );

    expect(resultAfterInvalidEmail.current.checkFormValidity()).toBe(false); 
  });

  it("should handle sanitized input for preventing XXS", () => {
    formData.customerName = '<script>alert("XSS")</script>';
    touchedFields.add("customerName");

    const { result } = renderHook(() =>
      useValidation(formData, touchedFields, false)
    );

    expect(DOMPurify.sanitize).toHaveBeenCalled();
  });

  it("should handle empty input validation", () => {
    formData.customerName = "";
    touchedFields.add("customerName");

    const { result } = renderHook(() =>
      useValidation(formData, touchedFields, false)
    );

    expect(result.current.showError("customerName")).toBe(true);
    expect(result.current.getErrorMessage("customerName")).toBe(
      "customerName cannot be empty"
    );
  });
});
