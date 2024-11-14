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
    const fetchOrder = () => {
      const foundOrder = orders.find((order) => order.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    };

    fetchOrder();
  }, [id, orders, navigate]);

  const handleUpdateOrder = (updatedOrder: MaintenanceOrder) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, ...updatedOrder } : order
    );

    setOrders(updatedOrders);

    navigate(`/orders/details/${id}/edit`);
  };

  return (
    <div>
      <MaintenanceForm
        orderData={order}
        title="Edit Order"
        onSubmit={handleUpdateOrder}
      />
    </div>
  );
};

export default NewOrder;
