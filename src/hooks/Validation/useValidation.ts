import { useCallback, useMemo } from "react";
import { MaintenanceOrder } from "../../types/maintenanceOrder";
import { formatFieldToLabel } from "../../utilities/formatFieldToLabel";
import DOMPurify from "dompurify";

type FieldError = "empty" | "invalid" | null;

const useValidation = (
  formData: MaintenanceOrder,
  touchedFields: Set<string>,
  loading: boolean
) => {
  const preventXXSInput = (input: string) => {
    const sanitizedInput = DOMPurify.sanitize(input);
    return sanitizedInput !== input;
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhoneNumber = (phoneNumber: string) => {
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d+]/g, "");
    return (
      /^\+?[1-9]\d{1,14}$/.test(cleanedPhoneNumber) &&
      cleanedPhoneNumber.replace(/\D/g, "").length >= 5 &&
      cleanedPhoneNumber.replace(/\D/g, "").length <= 15
    );
  };

  const validateEmptyInput = (input: string) => {
    return input !== "" ? null : "empty";
  };

  const fieldErrors = useMemo(() => {
    const errors: Record<keyof MaintenanceOrder, FieldError> = {
      id: null,
      customerName: null,
      phoneNumber: null,
      email: null,
      bikeBrand: null,
      serviceType: null,
      dueDate: null,
      notes: null,
    };

    Object.keys(errors).forEach((field) => {
      const fieldValue =
        formData[field as keyof MaintenanceOrder]?.trim() || "";
      if (preventXXSInput(fieldValue)) {
        errors[field as keyof MaintenanceOrder] = "invalid";
      } else {
        switch (field) {
          case "customerName":
          case "bikeBrand":
          case "serviceType":
          case "dueDate":
            errors[field as keyof MaintenanceOrder] =
              validateEmptyInput(fieldValue);
            break;
          case "phoneNumber":
            errors.phoneNumber = formData.phoneNumber
              ? validatePhoneNumber(formData.phoneNumber)
                ? null
                : "invalid"
              : "empty";
            break;
          case "email":
            errors.email = formData.email
              ? validateEmail(formData.email)
                ? null
                : "invalid"
              : "empty";
            break;
          default:
            break;
        }
      }
    });
    return errors;
  }, [formData]);

  const checkFormValidity = useCallback((): boolean => {
    return Object.values(fieldErrors).every((error) => error === null);
  }, [fieldErrors]);

  const showError = (field: keyof MaintenanceOrder): boolean => {
    return !loading && touchedFields.has(field) && fieldErrors[field] !== null;
  };

  const getErrorMessage = (
    field: keyof MaintenanceOrder
  ): string | undefined => {
    const errorType = fieldErrors[field];
    if (errorType === "empty") {
      return `${formatFieldToLabel(field)} cannot be empty`;
    } else if (errorType === "invalid") {
      return `${formatFieldToLabel(field)} is invalid`;
    }
    return undefined;
  };

  return { checkFormValidity, showError, getErrorMessage };
};

export default useValidation;
