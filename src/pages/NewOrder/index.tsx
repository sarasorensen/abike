import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import MaintenanceForm from "../../components/MaintenanceForm";
import { addOrder, editOrder, getOrdersFromStorage } from '../../utilities/ordersStorage';
import { MaintenanceOrder } from "../../types/maintenanceOrder";

const NewOrder: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); 
  const [order, setOrder] = useState<MaintenanceOrder | null>(null);

  useEffect(() => {
    const storedOrders = getOrdersFromStorage();
    if (id) {
      const foundOrder = storedOrders.find((order) => order.id === id);
      setOrder(foundOrder || null);
    }
  }, [id]); 

  const handleUpdateOrder = useCallback((formData: MaintenanceOrder) => {
    if (order) {
      editOrder(formData); 
    } else {
      addOrder(formData);
    }
  }, [order]); 

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
