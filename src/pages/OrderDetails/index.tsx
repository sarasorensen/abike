import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBicycle } from "react-icons/fa";
import { MdOutlineNoteAlt } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import Button from "../../components/Button/index";
import Dropdown from "../../components/Dropdown/index";
import { mockedOrders } from "../../shared-constants/mockedOrders";
import "./OrderDetails.scss";
import ids from "./test-ids.json";

interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  bikeBrand: string;
  serviceType: string;
  dueDate: string;
  notes?: string;
}

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const order = mockedOrders.find((order) => order.id === id);
      if (order) {
        setOrderDetails(order);
        setLoading(false);
      }
    }
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-wrap w-50">
      <div className="header-container">
        <h1>Order Details</h1>
        <Dropdown
          options={[
            {
              label: "Edit Order",
              action: `/orders/details/${id}/edit`,
              icon: "FaEdit",
            },
            {
              label: "Delete Order",
              action: `orders/delete/${id}`,
              icon: "FaTrashAlt",
            },
          ]}
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
              <label>Customer Name:</label> {orderDetails?.customerName}
            </div>
            <div className="col-sm-6">
              <label>Phone Number:</label> {orderDetails?.phoneNumber}
            </div>
            <div className="col-sm-6">
              <label>Email:</label> {orderDetails?.email}
            </div>
            <div className="col-sm-6">
              <label>Order ID:</label> {orderDetails?.id}
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
              <label>Bike Brand:</label> {orderDetails?.bikeBrand}
            </div>
            <div className="col-sm-6">
              <label>Service Type:</label> {orderDetails?.serviceType}
            </div>
            <div className="col-sm-12">
              <label>Due Date:</label> {orderDetails?.dueDate}
            </div>
          </div>
        </div>

        {orderDetails?.notes && (
          <>
            <div className="card-header">
              <MdOutlineNoteAlt className="card-header--icon" />
              <h5>Additional Notes</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12">{orderDetails?.notes}</div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="d-flex justify-content-end gap-3 mb-4 mt-2">
        <Button
          onClick={() => navigate("/orders")}
          label="Back to Orders"
          testId={ids.buttonGoBack}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
