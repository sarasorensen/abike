import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MaintenanceForm from "../../components/MaintenanceForm";
import { mockedOrders } from "../../shared-constants/mockedOrders";
import { MaintenanceOrder } from "../../types/maintenanceOrder"; 

const NewOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [order, setOrder] = useState<MaintenanceOrder | null>(null); 
  const [orders, setOrders] = useState<MaintenanceOrder[]>(mockedOrders); 

  useEffect(() => {
    // Fetch the order data by ID
    const fetchOrder = () => {
      const foundOrder = orders.find((order) => order.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        // Handle case when order is not found
        navigate("/orders");
      }
    };

    fetchOrder();
  }, [id, orders, navigate]);

  const handleUpdateOrder = (updatedOrder: MaintenanceOrder) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, ...updatedOrder } : order
    );

    setOrders(updatedOrders);

    console.log("Updated Order:", updatedOrder);

    // Redirect to the order details page after update
    navigate(`/orders/edit/${id}`);
  };

  // If the order is not found or still loading, display a loading message
  if (!order) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <MaintenanceForm
        orderData={order}  // Pass the order data with dueDate and serviceType
        title="Edit Order"
        onSubmit={handleUpdateOrder}  // Pass the update function
      />
    </div>
  );
};

export default NewOrder;
