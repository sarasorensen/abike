import React, { useState } from "react";

import Dropdown from "../../components/Dropdown/index";
import InputField from "../../components/InputField/index";
import { mockedOrders } from "../../shared-constants/mockedOrders";
import "./OrdersList.scss";
import ids from "./test-ids.json";

const OrdersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredOrders = mockedOrders.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order.customerName.toLowerCase().includes(query) ||
      order.phoneNumber.toLowerCase().includes(query) ||
      order.email.toLowerCase().includes(query)
    );
  });

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="orders-table">
      <div className="header-container">
        <h1>All Orders</h1>
        <Dropdown
          options={[
            {
              label: "Add New Order",
              action: "/order/new",
              icon: "FaPlus",
            },
          ]}
        />
        <hr></hr>
      </div>

      <InputField
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={"Search by name, phone, or email"}
        name={"search"}
        classesName="input-field--white"
        testId={ids.inputSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Bike Brand</th>
            <th>Service Type</th>
            <th>Due Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.email}</td>
              <td>{order.bikeBrand}</td>
              <td>{order.serviceType}</td>
              <td>{order.dueDate}</td>
              <td>
                <Dropdown
                  type="table"
                  options={[
                    {
                      label: "Edit order",
                      action: `/edit-order/${order.id}`,
                      icon: "FaEdit",
                    },
                    {
                      label: "View order",
                      action: `/order/${order.id}`,
                      icon: "FaEye",
                    },
                    {
                      label: "Delete order",
                      action: `/delete/${order.id}`,
                      icon: "FaTrashAlt",
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
