import { useState } from "react";

export const useDeleteConfirmationModal = () => {
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
      setShowModal(false);
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
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
