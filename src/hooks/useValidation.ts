import { useCallback } from "react";
import { MaintenanceOrder } from "../types/maintenanceOrder";
import {formatFieldToLabel} from "../utilities/formatFieldToLabel"
import DOMPurify from "dompurify";

type FieldError = "empty" | "invalid" | null;

const useValidation = (
  formData: MaintenanceOrder,
  touchedFields: Set<string>,
  loading: boolean
) => {
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhoneNumber = (phoneNumber: string) =>
    /^\+?[1-9]\d{1,14}$/.test(phoneNumber);

  const isValidField = (field: keyof MaintenanceOrder): FieldError => {
    const fieldValue = formData[field]?.trim() || "";

    if (containsScriptTags(fieldValue)) {
      return "invalid"; 
    }

    switch (field) {
      case "customerName":
      case "bikeBrand":
      case "serviceType":
      case "dueDate":
        return fieldValue !== "" ? null : "empty"; 
      case "phoneNumber":
        return validatePhoneNumber(formData.phoneNumber) ? null : "invalid";
      case "email":
        return validateEmail(formData.email) ? null : "invalid";
      case "notes":
        return null; 
      default:
        return null;
    }
  };

  const containsScriptTags = (input: string) => {
    const sanitizedInput = DOMPurify.sanitize(input);
    return sanitizedInput !== input;
  };

  const checkFormValidity = useCallback(() => {
    const inputFields: (keyof MaintenanceOrder)[] = [
      "customerName",
      "phoneNumber",
      "email",
      "bikeBrand",
      "serviceType",
      "dueDate",
      "notes"
    ];
    return inputFields.every((field) => isValidField(field) === null);
    // eslint-disable-next-line 
  }, [formData]);

  const showError = (field: keyof MaintenanceOrder) => {
    const errorType = isValidField(field);
    return (
      !loading &&
      touchedFields.has(field) &&
      errorType !== null
    );
  };



  const getErrorMessage = (field: keyof MaintenanceOrder): string | undefined => {
    const errorType = isValidField(field);
    if (errorType === "empty") {
      return `${formatFieldToLabel(field)} cannot be empty`;
    } else if (errorType === "invalid") {
      return `${formatFieldToLabel(field)} is invalid`;
    }
    return undefined;
  };

  return { checkFormValidity, isValidField, showError, getErrorMessage };
};

export default useValidation;
