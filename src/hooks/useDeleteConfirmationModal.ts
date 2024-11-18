import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOrder, getOrdersFromStorage } from "../utilities/ordersStorage";
import { MaintenanceOrder } from "../types/maintenanceOrder";

export const useDeleteConfirmationModal = (setOrders?: React.Dispatch<React.SetStateAction<MaintenanceOrder[]>>) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSelect = (label: string, id?: string) => {
    if (label === "Delete order" && id) {
      setDeleteId(id);
      setShowModal(true);
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteOrder(deleteId); 
      
      if(setOrders){
      setOrders(getOrdersFromStorage());  
      }

      setShowModal(false);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/");
      }, 2500);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return {
    showModal,
    deleteId,
    showSuccessMessage,
    handleSelect,
    confirmDelete,
    cancelDelete,
  };
};
