import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOrder, getOrdersFromStorage } from "../utilities/ordersStorage";
import { MaintenanceOrder } from "../types/maintenanceOrder";

export const useDeleteConfirmationModal = (setOrders?: React.Dispatch<React.SetStateAction<MaintenanceOrder[]>>) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleSelect = useCallback((label: string, id?: string) => {
    if (label === "Delete order" && id) {
      setDeleteId(id);
      setShowModal(true);
    }
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteId) {
      deleteOrder(deleteId);

      if (setOrders) {
        setOrders(getOrdersFromStorage());
      }

      setShowModal(false);
      setShowSuccessMessage(true);
    }
  }, [deleteId, setOrders]);

  const cancelDelete = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, navigate]);

  return {
    showModal,
    deleteId,
    showSuccessMessage,
    handleSelect,
    confirmDelete,
    cancelDelete,
  };
};
