import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FaBicycle } from "react-icons/fa";
import { MdOutlineNoteAlt } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

import useValidation from "../../hooks/useValidation";
import InputField from "../InputField";
import Button from "../Button";
import InputSelect from "../InputSelect";
import ActionSuccessMsg from "../ActionSuccessMsg";
import { MaintenanceOrder, defaultMaintenanceOrderData } from "../../types/maintenanceOrder";
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<MaintenanceOrder>(defaultMaintenanceOrderData);

  const heading = orderData ? "Edit Order" : "New Order";
  const actionTitle = orderData ? "Save" : "Order";

  useEffect(() => {
    if (orderData) {
      setLoading(true);

      setFormData({
        ...orderData,
      });

      setLoading(false);
    }
  }, [orderData]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTouchedFields((prev) => new Set(prev.add(name)));
  };

  const { checkFormValidity, showError, getErrorMessage } = useValidation(
    formData,
    touchedFields,
    loading
  );

  const isFormValid = useMemo(
    () => checkFormValidity(),
    // eslint-disable-next-line
    [formData]
  );

  const resetFormData = () => {
    setFormData(defaultMaintenanceOrderData);
  };

  const cancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetFormData();
    navigate("/");
  };

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/");
      setLoading(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newOrderData = {
      ...formData,
      id: orderData ? formData.id : uuidv4(),
    };

    if (isFormValid) {
      onSubmit(newOrderData);
      resetFormData();
      showSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="page-wrap">
      <h1>{heading}</h1>
      <div className="form-card">
        <div className="card-header">
          <RxAvatar className="card-header--icon" />
          <h5>Personal Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mb-2">
              <InputField
                loading={loading}
                required
                label="Customer Name"
                name="customerName"
                type="text"
                value={formData.customerName}
                onChange={handleChange}
                testId={ids.inputCustomerName}
                errorMessage={getErrorMessage("customerName")}
                showError={showError("customerName")}
              />
            </div>
            <div className="col-sm-6 mb-2">
              <InputField
                loading={loading}
                required
                label="Phone Number"
                name="phoneNumber"
                type="number"
                value={formData.phoneNumber}
                onChange={handleChange}
                testId={ids.inputPhoneNumber}
                errorMessage={getErrorMessage("phoneNumber")}
                showError={showError("phoneNumber")}
              />
            </div>
            <div className="col-sm-12 mb-2">
              <InputField
                loading={loading}
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                testId={ids.inputEmail}
                errorMessage={getErrorMessage("email")}
                showError={showError("email")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="card-header">
          <FaBicycle className="card-header--icon" />
          <h5>Bike Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mb-2">
              <InputField
                loading={loading}
                required
                label="Bike Brand"
                name="bikeBrand"
                type="text"
                value={formData.bikeBrand}
                onChange={handleChange}
                testId={ids.inputBikeBrand}
                errorMessage={getErrorMessage("bikeBrand")}
                showError={showError("bikeBrand")}
              />
            </div>
            <div className="col-sm-6 mb-2">
              <InputField
                loading={loading}
                required
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                testId={ids.inputDueDate}
                errorMessage={getErrorMessage("dueDate")}
                showError={showError("dueDate")}
              />
            </div>
            <div className="col-sm-12 mb-2">
              <InputSelect
                loading={loading}
                options={services}
                value={formData.serviceType}
                onSelect={(value) =>
                  handleChange({ target: { name: "serviceType", value } })
                }
                required
                testId={ids.selectServiceType}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="card-header">
          <MdOutlineNoteAlt className="card-header--icon" />
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
            errorMessage={getErrorMessage("notes")}
            showError={showError("notes")}
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
          label={actionTitle}
          testId={ids.buttonSubmitMaintenance}
          disabled={!isFormValid}
        />
      </div>

      {showSuccessMessage && <ActionSuccessMsg action={actionTitle} />}
    </form>
  );
};

export default MaintenanceForm;
