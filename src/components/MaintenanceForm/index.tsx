import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import InputField from "../InputField";
import Button from "../Button";
import InputSelect from "../InputSelect/index";
import ActionSuccessMsg from "../ActionSuccessMsg/index";
import { MaintenanceOrder } from "../../types/maintenanceOrder";
import { services } from "../../shared-constants/services";
import ids from "./test-ids.json";
import "./MaintenanceForm.scss";

const MaintenanceForm = ({
  orderData = null,
  onSubmit,
}: {
  orderData?: MaintenanceOrder | null;
  onSubmit: (data: MaintenanceOrder) => void;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState<MaintenanceOrder>({
    id: "",
    customerName: "",
    phoneNumber: "",
    email: "",
    bikeBrand: "",
    serviceType: "",
    dueDate: "",
    notes: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({
    customerName: false,
    phoneNumber: false,
    email: false,
    bikeBrand: false,
    serviceType: false,
    dueDate: false,
    notes: false,
  });

  useEffect(() => {
    if (orderData) {
      setLoading(true);
      setFormData(orderData);
      setLoading(false);
    }
  }, [orderData]);

  useEffect(() => {
    if (orderData) {
      const formattedDueDate = new Date(orderData.dueDate)
        .toISOString()
        .split("T")[0];

      setFormData({
        ...orderData,
        dueDate: formattedDueDate,
      });
    }
  }, [orderData]);

  const validateInput = (value: string) => {
    const regex = /[<>]|<script.*?>.*?<\/script>/gi;
    return !regex.test(value);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phoneNumber);
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    if (!validateInput(value)) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const checkFormValidity = () => {
    const requiredFields = [
      "customerName",
      "phoneNumber",
      "email",
      "bikeBrand",
      "serviceType",
      "dueDate",
    ];

    const isValid = requiredFields.every(
      (field) => formData[field as keyof MaintenanceOrder]
    );

    const isEmailValid = validateEmail(formData.email);
    const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);

    setIsFormValid(isValid && isEmailValid && isPhoneNumberValid);
  };

  useEffect(() => {
    checkFormValidity();
    // eslint-disable-next-line
  }, [formData]);

  const resetFormData = () => {
    setFormData({
      id: "",
      customerName: "",
      phoneNumber: "",
      email: "",
      bikeBrand: "",
      serviceType: "",
      dueDate: "",
      notes: "",
    });
  };

  const cancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetFormData();
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newOrderData = {
      ...formData,
      id: orderData ? formData.id : uuidv4(),
    };

    onSubmit(newOrderData);
    resetFormData();

    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/");
      setLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="page-wrap">
      <h1> {orderData ? "Edit Order" : "New Order"}</h1>
      <div className="form-card">
        <div className="card-header">
          <h5>Personal Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <InputField
                loading={loading}
                required
                label="Customer Name"
                name="customerName"
                type="text"
                value={formData.customerName}
                onChange={handleChange}
                testId={ids.inputCustomerName}
                errorMessage="Customer name cannot be empty"
                showError={
                  !loading &&
                  touched.customerName &&
                  (!formData.customerName ||
                    !validateInput(formData.customerName))
                }
              />
            </div>
            <div className="col-sm-6">
              <InputField
                loading={loading}
                required
                label="Phone Number"
                name="phoneNumber"
                type="number"
                value={formData.phoneNumber}
                onChange={handleChange}
                testId={ids.inputPhoneNumber}
                errorMessage="Phone number cannot be empty or invalid"
                showError={
                  !loading &&
                  touched.phoneNumber &&
                  (!formData.phoneNumber ||
                    !validatePhoneNumber(formData.phoneNumber) ||
                    !validateInput(formData.phoneNumber))
                }
              />
            </div>
            <div className="col-sm-12">
              <InputField
                loading={loading}
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                testId={ids.inputEmail}
                errorMessage="Email cannot be empty or invalid"
                showError={
                  !loading &&
                  touched.email &&
                  (!formData.email ||
                    !validateEmail(formData.email) ||
                    !validateInput(formData.email))
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="card-header">
          <h5>Bike Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <InputField
                loading={loading}
                required
                label="Bike Brand"
                name="bikeBrand"
                type="text"
                value={formData.bikeBrand}
                onChange={handleChange}
                testId={ids.inputBikeBrand}
                errorMessage="Bike brand cannot be empty"
                showError={
                  !loading &&
                  touched.bikeBrand &&
                  (!formData.bikeBrand || !validateInput(formData.bikeBrand))
                }
              />
            </div>
            <div className="col-sm-6">
              <InputField
                loading={loading}
                required
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                testId={ids.inputDueDate}
                errorMessage="Due date cannot be empty"
                showError={
                  !loading && touched.notes && !validateInput(formData.notes)
                }
              />
            </div>
            <div className="col-sm-12">
              <InputSelect
                loading={loading}
                options={services}
                value={formData.serviceType}
                onSelect={(value) =>
                  handleChange({ target: { name: "serviceType", value } })
                }
                required
                placeholder="Select service type"
                testId={ids.selectServiceType}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="card-header">
          <h5>Additional Notes</h5>
        </div>
        <div className="card-body">
          <InputField
            loading={loading}
            label="Notes"
            name="notes"
            type="textarea"
            value={formData.notes}
            onChange={handleChange}
            testId={ids.textAreaNotes}
          />
        </div>
      </div>

      <div className="button-wrapper">
        <Button
          onClick={cancelSubmit}
          label="Cancel"
          className="button-cancel"
          testId={ids.buttonCancelMaintenance}
        />
        <Button
          onClick={handleSubmit}
          label={orderData ? "Save" : "Order"}
          testId={ids.buttonSubmitMaintenance}
          disabled={!isFormValid}
        />
      </div>
      {showSuccessMessage && (
        <ActionSuccessMsg action={orderData ? "Save" : "Order"} />
      )}
    </form>
  );
};

export default MaintenanceForm;
