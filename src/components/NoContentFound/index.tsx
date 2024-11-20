import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const NoContentFound: React.FC = () => {
  const navigate = useNavigate();

  const goToNewOrders = useCallback(() => {
    navigate("/orders/new");
  }, [navigate]);

  return (
    <section className="empty-content-wrap">
      <h2>No orders found</h2>
      <p>
        <Button onClick={goToNewOrders} label="Create new order" testId="create-order-button" />
      </p>
    </section>
  );
};

export default NoContentFound;
