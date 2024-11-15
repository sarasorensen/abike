import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { useDeleteConfirmationModal } from "../../hooks/useDeleteConfirmationModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import ActionSuccessMsg from "../../components/ActionSuccessMsg";
import Dropdown from "../../components/Dropdown";
import InputField from "../../components/InputField";
import InputSelect from "../../components/InputSelect";
import NoContentFound from "../../components/NoContentFound";
import { services } from "../../shared-constants/services";
import { MaintenanceOrder } from "../../types/maintenanceOrder";
import { getOrdersFromStorage } from "../../utilities/ordersStorage";
import { getServiceTypeLabel } from "../../utilities/getServiceTypeLabel";
import { sortByColumn } from "../../utilities/sortByColumn";
import { testId } from "../../utilities/testId";
import ids from "./test-ids.json";
import "./OrdersList.scss";

type SortDirection = "asc" | "desc";

const OrdersList: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<MaintenanceOrder[]>([]);
  const [filters, setFilters] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
    brand: "",
    serviceType: "",
    dueDate: "",
  });
  const [sortConfig, setSortConfig] = useState({
    column: "customerName",
    direction: "asc" as SortDirection,
  });
  const [filteredOrders, setFilteredOrders] = useState<MaintenanceOrder[]>([]);
  const {
    showModal,
    deleteId,
    showSuccessMessage,
    handleSelect,
    confirmDelete,
    cancelDelete,
  } = useDeleteConfirmationModal(setOrders);

  useEffect(() => {
    setOrders(getOrdersFromStorage());
  }, []);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleRowClick = (id: string, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const isDropdownClick = target.closest(".dropdown");

    if (!isDropdownClick) {
      navigate(`/orders/details/${id}`);
    }
  };

  const handleSearchChange = (field: keyof typeof filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleSort = (column: string) => {
    setSortConfig((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const filterOrders = () => {
    const query = Object.keys(filters).reduce(
      (acc: Record<string, string>, key: string) => {
        const filterValue = filters[key as keyof typeof filters];
        acc[key] = filterValue.toLowerCase();
        return acc;
      },
      {} as Record<string, string>
    );

    return orders.filter((order) => {
      const matches = Object.keys(query).every((key) => {
        if (!query[key]) return true;

        if (key === "dueDate") {
          return order.dueDate === query[key];
        }

        return order[key as keyof MaintenanceOrder]
          .toLowerCase()
          .includes(query[key]);
      });

      const matchesServiceType =
        !filters.serviceType ||
        filters.serviceType.toLowerCase() === order.serviceType.toLowerCase();

      return matches && matchesServiceType;
    });
  };

  useEffect(() => {
    setFilteredOrders(filterOrders());
    // eslint-disable-next-line
  }, [orders, filters]);

  const resetFilters = () => {
    setFilters({
      customerName: "",
      phoneNumber: "",
      email: "",
      brand: "",
      serviceType: "",
      dueDate: "",
    });
    setFilteredOrders(orders);
  };

  const sortedOrders = sortByColumn(
    filteredOrders,
    sortConfig.column,
    sortConfig.direction
  );

  return (
    <div className="page-wrap">
      <div className="header-container">
        <h1>Orders</h1>
        <Dropdown
          options={[
            { label: "Add New Order", action: "/orders/new", icon: "FaPlus" },
          ]}
        />
        <hr />
      </div>

      {orders.length > 0 && (
        <table className="table table-hover">
          <thead>
            <tr className="filters-heading">
              {[
                "customerName",
                "phoneNumber",
                "email",
                "bikeBrand",
                "dueDate",
                "serviceType",
              ].map((column) => (
                <th key={column} onClick={() => handleSort(column)}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}{" "}
                  {sortConfig.column === column &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
              ))}
              <th></th>
            </tr>

            <tr className="filters-container">
              {["customerName", "phoneNumber", "email", "brand", "dueDate"].map(
                (field) => (
                  <th key={field}>
                    <InputField
                      type={field === "dueDate" ? "date" : "text"}
                      value={filters[field as keyof typeof filters]}
                      onChange={(e) => handleFilterChange(e, field)}
                      onClear={() =>
                        handleSearchChange(field as keyof typeof filters, "")
                      }
                      placeholder={`Filter by ${field}`}
                      name={`search${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }`}
                      classesName="input-field--white"
                      testId={
                        ids[
                          `inputSearch${
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }` as keyof typeof ids
                        ]
                      }
                    />
                  </th>
                )
              )}
              <th>
                <InputSelect
                  options={[
                    { label: "All", value: "" },
                    ...services.map((service) => ({
                      label: service.label,
                      value: service.value,
                    })),
                  ]}
                  value={filters.serviceType}
                  onSelect={(value) => handleSearchChange("serviceType", value)}
                  placeholder="Select service type"
                  classesName="select-input--white"
                  displayLabel={false}
                  testId={ids.selectServiceType}
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
                <td data-label="Due Date">{order.dueDate}</td>
                <td data-label="Service type">
                  {getServiceTypeLabel(order.serviceType)}
                </td>
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
                        action: `/orders/details/${order.id}/edit`,
                        icon: "FaEdit",
                      },
                      {
                        label: "Delete order",
                        icon: "FaTrashAlt",
                        id: order.id,
                      },
                    ]}
                    onSelect={handleSelect}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {sortedOrders.length === 0 && (
        <div className="empty-content-wrap">
          <h2> Sorry, we couldn't find any matches</h2>
          <p>Please try again or reset filter</p>
        </div>
      )}

      {orders.length === 0 && <NoContentFound />}

      {showModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          orderId={deleteId}
        />
      )}
      {showSuccessMessage && <ActionSuccessMsg action="Delete" />}
    </div>
  );
};

export default OrdersList;
