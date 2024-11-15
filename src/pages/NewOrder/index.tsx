import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaintenanceForm from "../../components/MaintenanceForm";
import { addOrder, editOrder, getOrdersFromStorage } from '../../utilities/ordersStorage';
import { MaintenanceOrder } from "../../types/maintenanceOrder";

const NewOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<MaintenanceOrder | null>(null);
  const [orders, setOrders] = useState<MaintenanceOrder[]>([]);

  useEffect(() => {
    const storedOrders = getOrdersFromStorage();
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    const fetchOrder = () => {
      if (id) {
        const foundOrder = orders.find((order) => order.id === id);
        if (foundOrder) {
          setOrder(foundOrder);
        }
      }
    };

    fetchOrder();
  }, [id, orders]);

  const handleUpdateOrder = (formData: MaintenanceOrder) => {
    if (order) {
      editOrder(formData);
    } else {
      addOrder(formData);
    }
  };

  return (
    <div>
      <MaintenanceForm
        orderData={order}
        onSubmit={handleUpdateOrder}
      />
    </div>
  );
};

export default NewOrder;
