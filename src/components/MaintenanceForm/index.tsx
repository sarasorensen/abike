import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";
import Button from "../Button";
import { MaintenanceOrder } from "../../types/maintenanceOrder";
import ids from "./test-ids.json";
import "./MaintenanceForm.scss";

const MaintenanceForm = ({
  orderData = null,
  onSubmit,
  title,
}: {
  orderData?: MaintenanceOrder | null;
  onSubmit: (data: MaintenanceOrder) => void;
  title: string;
}) => {
  const navigate = useNavigate();
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

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (orderData) {
      setFormData(orderData);
    }
  }, [orderData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const cancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
    setIsFormValid(isValid);
  };

  useEffect(() => {
    checkFormValidity();
    // eslint-disable-next-line
  }, [formData]);

  return (
    <form onSubmit={handleSubmit} className="maintenance-form">
      <h1>{title}</h1>
      <div className="form-card">
        <div className="card-header">
          <h5>Personal Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <InputField
                required
                label="Customer Name"
                name="customerName"
                type="text"
                value={formData.customerName}
                onChange={handleChange}
                testId={ids.inputCustomerName}
                errorMessage="Customer name cannot be empty"
                showError={touched.customerName && !formData.customerName}
              />
            </div>
            <div className="col-sm-6">
              <InputField
                required
                label="Phone Number"
                name="phoneNumber"
                type="number"
                value={formData.phoneNumber}
                onChange={handleChange}
                testId={ids.inputPhoneNumber}
                errorMessage="Phone number cannot be empty"
                showError={touched.phoneNumber && !formData.phoneNumber}
              />
            </div>
            <div className="col-sm-12">
              <InputField
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                testId={ids.inputEmail}
                errorMessage="Email cannot be empty"
                showError={touched.email && !formData.email}
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
                required
                label="Bike Brand"
                name="bikeBrand"
                type="text"
                value={formData.bikeBrand}
                onChange={handleChange}
                testId={ids.inputBikeBrand}
                errorMessage="Bike brand cannot be empty"
                showError={touched.bikeBrand && !formData.bikeBrand}
              />
            </div>
            <div className="col-sm-6">
              <InputField
                required
                label="Service Type"
                name="serviceType"
                type="text"
                value={formData.serviceType}
                onChange={handleChange}
                testId={ids.inputServiceType}
                errorMessage="Service type cannot be empty"
                showError={touched.serviceType && !formData.serviceType}
              />
            </div>
            <div className="col-sm-12">
              <InputField
                required
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                testId={ids.inputDueDate}
                errorMessage="Due date cannot be empty"
                showError={touched.dueDate && !formData.dueDate}
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
            label="Notes"
            name="notes"
            type="textarea"
            value={formData.notes}
            onChange={handleChange}
            testId={ids.textAreaNotes}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-3 mb-4">
        <Button
          onClick={cancelSubmit}
          label="Cancel"
          testId={ids.buttonSubmitMaintenance}
        />
        <Button
          onClick={handleSubmit}
          label="Order"
          testId={ids.buttonSubmitMaintenance}
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
};

export default MaintenanceForm;