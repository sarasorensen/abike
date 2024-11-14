import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { FaFilterCircleXmark } from "react-icons/fa6";
import Dropdown from "../../components/Dropdown/index";
import InputField from "../../components/InputField/index";
import InputSelect from "../../components/InputSelect/index";
import { mockedOrders } from "../../shared-constants/mockedOrders";
import { services } from "../../shared-constants/services";
import "./OrdersList.scss";
import { testId } from "../../utilities/testId";
import ids from "./test-ids.json";

type SortDirection = "asc" | "desc";

const OrdersList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQueryCustomerName, setSearchQueryCustomerName] =
    useState<string>("");
  const [searchQueryPhoneNumber, setSearchQueryPhoneNumber] =
    useState<string>("");
  const [searchQueryEmail, setSearchQueryEmail] = useState<string>("");
  const [searchQueryBrand, setSearchQueryBrand] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string>("customerName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("");
  const [dueDateFilter, setDueDateFilter] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState(mockedOrders);

  const handleRowClick = (id: string, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;

    const isDropdownClick = target.closest(".dropdown");

    if (!isDropdownClick) {
      navigate(`/orders/details/${id}`);
    }
  };

  const handleSearchChange = (
    column: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (column === "customerName") {
      setSearchQueryCustomerName(e.target.value);
    } else if (column === "phoneNumber") {
      setSearchQueryPhoneNumber(e.target.value);
    } else if (column === "email") {
      setSearchQueryEmail(e.target.value);
    } else if (column === "brand") {
      setSearchQueryBrand(e.target.value);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleDueDateFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDueDateFilter(e.target.value);
  };

  const handleServiceTypeChange = (value: string) => {
    setSelectedServiceType(value);
  };

  useEffect(() => {
    const queryCustomerName = searchQueryCustomerName.toLowerCase();
    const queryPhoneNumber = searchQueryPhoneNumber.toLowerCase();
    const queryEmail = searchQueryEmail.toLowerCase();
    const queryBrand = searchQueryBrand.toLowerCase();

    const filtered = mockedOrders.filter((order) => {
      const matchesCustomerName = order.customerName
        .toLowerCase()
        .includes(queryCustomerName);
      const matchesPhoneNumber = order.phoneNumber
        .toLowerCase()
        .includes(queryPhoneNumber);
      const matchesEmail = order.email.toLowerCase().includes(queryEmail);
      const matchesBrand = order.bikeBrand.toLowerCase().includes(queryBrand);

      const selectedServiceLabel = services.find(
        (service) => service.value === selectedServiceType
      )?.label;

      const matchesServiceType =
        !selectedServiceType ||
        selectedServiceLabel?.toLowerCase() === order.serviceType.toLowerCase();

      const formatDate = (date: string) => {
        const [day, month, year] = date.split("-");
        return `${year}-${month}-${day}`;
      };

      const normalizedOrderDueDate = formatDate(order.dueDate);
      const normalizedFilterDate = dueDateFilter;

      const matchesDueDate =
        !dueDateFilter || normalizedOrderDueDate === normalizedFilterDate;

      return (
        matchesCustomerName &&
        matchesPhoneNumber &&
        matchesEmail &&
        matchesServiceType &&
        matchesBrand &&
        matchesDueDate
      );
    });

    setFilteredOrders(filtered);
  }, [
    searchQueryCustomerName,
    searchQueryPhoneNumber,
    searchQueryEmail,
    selectedServiceType,
    searchQueryBrand,
    dueDateFilter,
  ]);

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const valueA =
      a[sortColumn as keyof typeof a]?.toString().toLowerCase() ?? "";
    const valueB =
      b[sortColumn as keyof typeof b]?.toString().toLowerCase() ?? "";

    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  });

  const resetFilters = () => {
    setSearchQueryCustomerName("");
    setSearchQueryPhoneNumber("");
    setSearchQueryEmail("");
    setSearchQueryBrand("");
    setSortColumn("customerName");
    setSortDirection("asc");
    setSelectedServiceType("");
    setDueDateFilter("");
    setFilteredOrders(mockedOrders);
  };

  return (
    <div className="orders-table">
      <div className="header-container">
        <h1>Orders</h1>
        <Dropdown
          options={[
            {
              label: "Add New Order",
              action: "/orders/new",
              icon: "FaPlus",
            },
          ]}
        />
        <hr />
      </div>

      <table className="table table-hover">
        <thead>
          <tr className="filters-heading">
            <th
              onClick={() => handleSort("customerName")}
              style={{ minWidth: "250px" }}
            >
              Customer Name{" "}
              {sortColumn === "customerName" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("phoneNumber")}>
              Phone Number{" "}
              {sortColumn === "phoneNumber" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("bikeBrand")}>
              Bike Brand{" "}
              {sortColumn === "bikeBrand" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("serviceType")}
              style={{ minWidth: "250px" }}
            >
              Service type{" "}
              {sortColumn === "serviceType" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("dueDate")}>
              Due Date{" "}
              {sortColumn === "dueDate" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th></th>
          </tr>

          <tr className="filters-container">
            <th>
              <InputField
                type="text"
                value={searchQueryCustomerName}
                onChange={(e) => handleSearchChange("customerName", e)}
                onClear={() => setSearchQueryCustomerName("")}
                placeholder={"Filter by name"}
                name={"searchCustomerName"}
                classesName="input-field--white"
                testId={ids.inputSearchCustomerName}
              />
            </th>
            <th>
              <InputField
                type="tel"
                value={searchQueryPhoneNumber}
                onChange={(e) => handleSearchChange("phoneNumber", e)}
                onClear={() => setSearchQueryPhoneNumber("")}
                placeholder={"Filter by number"}
                name={"searchPhoneNumber"}
                classesName="input-field--white"
                testId={ids.inputSearchPhoneNumber}
              />
            </th>
            <th>
              <InputField
                type="email"
                value={searchQueryEmail}
                onChange={(e) => handleSearchChange("email", e)}
                onClear={() => setSearchQueryEmail("")}
                placeholder={"Filter by email"}
                name={"searchEmail"}
                classesName="input-field--white"
                testId={ids.inputSearchEmail}
              />
            </th>
            <th>
              <InputField
                type="text"
                value={searchQueryBrand}
                onChange={(e) => handleSearchChange("brand", e)}
                onClear={() => setSearchQueryBrand("")}
                placeholder={"Filter by brand"}
                name={"searchEmail"}
                classesName="input-field--white"
                testId={ids.inputSearchBrand}
              />
            </th>
            <th>
              <InputSelect
                options={[
                  { label: "All", value: "" },
                  ...services.map((service) => ({
                    label: service.label,
                    value: service.value,
                  })),
                ]}
                value={selectedServiceType}
                onSelect={handleServiceTypeChange}
                placeholder="Select service type"
                classesName="select-input--white"
                displayLabel={false}
                testId={ids.selectServiceType}
              />
            </th>
            <th>
              <InputField
                type="date"
                value={dueDateFilter}
                onChange={handleDueDateFilterChange}
                name="dueDate"
                classesName="input-field--white pl-0"
                testId={ids.inputDueDate}
              />
            </th>
            <th>
              <span
                onClick={resetFilters}
                className="reset-filter-icon"
                {...testId(ids.resetFilter)}
              >
                <FaFilterCircleXmark />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order.id} onClick={(e) => handleRowClick(order.id, e)}>
              <td data-label="Customer Name">{order.customerName}</td>
              <td data-label="Phone Number">{order.phoneNumber}</td>
              <td data-label="Email">{order.email}</td>
              <td data-label="Bike Brand">{order.bikeBrand}</td>
              <td data-label="Service type">{order.serviceType}</td>
              <td data-label="Due Date">{order.dueDate}</td>
              <td>
                <Dropdown
                  type="table"
                  options={[
                    {
                      label: "View order",
                      action: `/orders/details/${order.id}`,
                      icon: "FaEye",
                    },
                    {
                      label: "Edit order",
                      action: `/orders/edit/${order.id}`,
                      icon: "FaEdit",
                    },
                    {
                      label: "Delete order",
                      action: `orders/delete/${order.id}`,
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
