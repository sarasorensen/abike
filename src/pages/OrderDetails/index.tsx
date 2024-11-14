import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/index";
import Dropdown from "../../components/Dropdown/index";
import { mockedOrders } from "../../shared-constants/mockedOrders";
import "./OrderDetails.scss";
import ids from "./test-ids.json"

interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  bikeBrand: string;
  serviceType: string;
  dueDate: string;
}

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const order = mockedOrders.find((order) => order.id === id);
      if (order) {
        setOrderDetails(order);
        setLoading(false);
      } else {
        setError("Order not found");
        setLoading(false);
        setTimeout(() => {
          navigate("/orders");
        });
      }
    }
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <p>Redirecting to orders...</p>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="header-container">
        <h1>Order Details</h1>
        <Dropdown
          options={[
            {
              label: "Edit Order",
              action: `/orders/details/edit/${id}`,
              icon: "FaEdit",
            },
            {
              label: "Delete order",
              action: `orders/delete/${id}`,
              icon: "FaTrashAlt",
            },
          ]}
        />
        <hr />
      </div>
      <div className="order-info">
        <div className="info-item">
          <strong>Customer Name:</strong> {orderDetails?.customerName}
        </div>
        <div className="info-item">
          <strong>Phone Number:</strong> {orderDetails?.phoneNumber}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {orderDetails?.email}
        </div>
        <div className="info-item">
          <strong>Bike Brand:</strong> {orderDetails?.bikeBrand}
        </div>
        <div className="info-item">
          <strong>Service Type:</strong> {orderDetails?.serviceType}
        </div>
        <div className="info-item">
          <strong>Due Date:</strong> {orderDetails?.dueDate}
        </div>
        <div className="info-item">
          <strong>Order ID:</strong> {orderDetails?.id}
        </div>
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
