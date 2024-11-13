import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/index";
import InputField from "../../components/InputField/index";

const OrderDetails = () => {
  const { id } = useParams(); // Get order ID from the URL
  const navigate = useNavigate(); // Use navigate for React Router v6
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
    bikeBrand: "",
    serviceType: "",
    dueDate: "",
    notes: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Track if in edit mode

  // Fetch order details when the component mounts
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${id}`);
        setOrder(response.data);
        setFormData(response.data); // Set initial form data from the fetched order
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Handle form field changes
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to update the order
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/orders/${id}`, formData);
      setOrder(response.data);
      setIsEditing(false); // Stop editing mode after successful update
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Handle delete order
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/orders/${id}`);
      navigate("/"); // Redirect to the orders list page after deletion
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Custom save logic here
    console.log("Save button clicked");
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      <div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          label={isEditing ? "Cancel Editing" : "Edit Order"}
          testId={""}
        />

        <Button onClick={handleDelete} label="Delete Order" testId={""} />
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            label={""}
            testId={""}
          />
          <InputField
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            testId={""}
            label={""}
          />
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            testId={""}
            label={""}
          />
          <InputField
            type="text"
            name="bikeBrand"
            value={formData.bikeBrand}
            onChange={handleChange}
            required
            testId={""}
            label={""}
          />
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="Wheel adjustment">Wheel adjustment</option>
            <option value="Chain replacement">Chain replacement</option>
            <option value="Brake maintenance">Brake maintenance</option>
          </select>
          <InputField
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            testId={""}
            label={""}
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
          <Button
            type="submit"
            onClick={handleSave}
            testId="save-button"
            label="Save Changes"
          />
        </form>
      ) : (
        <div>
          {/* <p><strong>Customer Name:</strong> {order.customerName}</p>
          <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Bike Brand:</strong> {order.bikeBrand}</p>
          <p><strong>Service Type:</strong> {order.serviceType}</p>
          <p><strong>Due Date:</strong> {order.dueDate}</p>
          <p><strong>Notes:</strong> {order.notes || 'No additional notes'}</p> */}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
