import { FaCheckCircle } from "react-icons/fa";

interface ActionSuccessMsgProps {
  action: string; 
}

const ActionSuccessMsg: React.FC<ActionSuccessMsgProps> = ({ action }) => {
  return (
    <div className="success-message">
      <p>{action} successful</p>
      <FaCheckCircle className="check-icon" />
    </div>
  );
};

export default ActionSuccessMsg;
