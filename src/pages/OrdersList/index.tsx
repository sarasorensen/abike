import React from "react";
import { Link } from "react-router-dom";

import Dropdown from "../../components/Dropdown/index";
import { mockedOrders } from "../../shared-constants/mockedOrders";
import "./OrdersList.scss";

const OrdersList: React.FC = () => {
  const dropdownOptions = [
    {
      label: "Add New...",
      icon: "uil-plus",
      action: "/ramson/settings/users/new",
    },
  ];

  return (
    <div>
      <h1>All Orders</h1>

      <Dropdown options={dropdownOptions} />

      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Bike Brand</th>
            <th>Service Type</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.email}</td>
              <td>{order.bikeBrand}</td>
              <td>{order.serviceType}</td>
              <td>{order.dueDate}</td>
              <td>
                <Link to={`/edit-order/${order.id}`}>Edit</Link> |{" "}
                <Link to={`/order/${order.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
