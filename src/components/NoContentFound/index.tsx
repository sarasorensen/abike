import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/index";

const NoContentFound: React.FC = () => {
  const navigate = useNavigate();

  const goToNewOrders = () => {
    navigate("/orders/new");
  };

  return (
    <div className="empty-content-wrap">
      <h2>No orders found</h2>
      <p>
        <Button onClick={goToNewOrders} label="Create new order" testId={""} />
      </p>
    </div>
  );
};

export default NoContentFound;
