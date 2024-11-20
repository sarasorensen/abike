import React, { useEffect, useState } from "react";
import Button from "../Button/index";
import { FaTimes } from "react-icons/fa";
import { MaintenanceOrder } from "../../types/maintenanceOrder";
import { getOrdersFromStorage } from "../../utilities/ordersStorage";
import ids from "./test-ids.json";
import "./DeleteConfirmationModal.scss";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  orderId: string | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  orderId,
}) => {
  const [orders, setOrders] = useState<MaintenanceOrder[]>([]);
  const [orderDetails, setOrderDetails] = useState<MaintenanceOrder | null>(
    null
  );

  useEffect(() => {
    if (orderId) {
      const order = orders.find((order) => order.id === orderId);
      if (order) {
        setOrderDetails(order);
      }
    }
  }, [orders, orderId]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  useEffect(() => {
    const ordersFromStorage = getOrdersFromStorage();
    setOrders(ordersFromStorage);
  }, []);

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <span className="close-btn" onClick={onCancel}>
          <FaTimes />
        </span>
        <h3>Confirm Order Deletion</h3>
        <p>You are about to delete an order. This action is irreversible.</p>
        {orderDetails && (
          <>
            <p>
              Are you sure you want to delete order from '
              {orderDetails.customerName}'?
            </p>
          </>
        )}

        <div className="modal-footer d-flex justify-content-end gap-3">
          <Button
            onClick={onCancel}
            label="Cancel"
            className="button-cancel"
            testId={ids.buttonCancelOrder}
          />
          <Button
            onClick={onConfirm}
            label={"Confirm"}
            disabled={!orderDetails}
            testId={ids.buttonDeleteOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
