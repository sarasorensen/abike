import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBicycle } from "react-icons/fa";
import { MdOutlineNoteAlt } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { useDeleteConfirmationModal } from "../../hooks/useDeleteConfirmationModal";
import Button from "../../components/Button";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import ActionSuccessMsg from "../../components/ActionSuccessMsg";
import Dropdown from "../../components/Dropdown";
import NoContentFound from "../../components/NoContentFound";
import { MaintenanceOrder } from "../../types/maintenanceOrder";
import { formatDate } from "../../utilities/formatDate";
import { getOrdersFromStorage } from "../../utilities/ordersStorage";
import { getServiceTypeLabel } from "../../utilities/getServiceTypeLabel";
import "./OrderDetails.scss";
import ids from "./test-ids.json";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<MaintenanceOrder | null>(
    null
  );
  const {
    showModal,
    deleteId,
    showSuccessMessage,
    loading,
    handleSelect,
    confirmDelete,
    cancelDelete,
  } = useDeleteConfirmationModal();

  useEffect(() => {
    const storedOrders = getOrdersFromStorage();
    const foundOrder = storedOrders.find((order) => order.id === id);
    setOrderDetails(foundOrder || null);
  }, [id]);

  return (
    <div className="page-wrap w-50">
      {loading ? (
        <span className="loader"></span>
      ) : (
        <>
          {orderDetails === null ? (
            <NoContentFound />
          ) : (
            <>
              <div className="header-container">
                <h1>Order Details</h1>
                <Dropdown
                  options={[
                    {
                      label: "Edit Order",
                      action: `/orders/details/${id}/edit`,
                      icon: "FaEdit",
                    },
                    { label: "Delete order", icon: "FaTrashAlt", id },
                  ]}
                  onSelect={handleSelect}
                />
                <hr />
              </div>

              <div className="form-card">
                <div className="card-header">
                  <RxAvatar className="card-header--icon" />
                  <h5>Personal Information</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <label>Customer Name:</label> {orderDetails.customerName}
                    </div>
                    <div className="col-sm-6">
                      <label>Phone Number:</label> {orderDetails.phoneNumber}
                    </div>
                    <div className="col-sm-6">
                      <label>Email:</label> {orderDetails.email}
                    </div>
                  </div>
                </div>

                <div className="card-header">
                  <FaBicycle className="card-header--icon" />
                  <h5>Bike Information</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <label>Bike Brand:</label> {orderDetails.bikeBrand}
                    </div>
                    <div className="col-sm-6">
                      <label>Service Type:</label>{" "}
                      {getServiceTypeLabel(orderDetails.serviceType)}
                    </div>
                    <div className="col-sm-12">
                      <label>Due Date:</label>{" "}
                      {formatDate(orderDetails.dueDate)}
                    </div>
                  </div>
                </div>

                {orderDetails.notes && (
                  <>
                    <div className="card-header">
                      <MdOutlineNoteAlt className="card-header--icon" />
                      <h5>Additional Notes</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12">{orderDetails.notes}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="button-wrapper">
                <Button
                  onClick={() => navigate("/orders")}
                  label="Back to Orders"
                  testId={ids.buttonGoBack}
                />
              </div>
            </>
          )}
        </>
      )}

      {showModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          orderId={deleteId}
        />
      )}

      {showSuccessMessage && <ActionSuccessMsg action="Delete" />}
    </div>
  );
};

export default OrderDetails;
