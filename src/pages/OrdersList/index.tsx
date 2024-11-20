import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteConfirmationModal } from "../../hooks/useDeleteConfirmationModal";
import { services } from "../../shared-constants/services";
import TableFilter from "../../components/TableFilter";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import ActionSuccessMsg from "../../components/ActionSuccessMsg";
import Dropdown from "../../components/Dropdown";
import NoContentFound from "../../components/NoContentFound";
import {
  MaintenanceOrder,
  defaultMaintenancefilter,
} from "../../types/maintenanceOrder";
import { formatDate } from "../../utilities/formatDate";
import { getOrdersFromStorage } from "../../utilities/ordersStorage";
import { getServiceTypeLabel } from "../../utilities/getServiceTypeLabel";
import { sortByColumn } from "../../utilities/sortByColumn";
import "./OrdersList.scss";

type SortDirection = "asc" | "desc";

const OrdersList: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<MaintenanceOrder[]>([]);
  const [filters, setFilters] = useState(defaultMaintenancefilter);
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
  const handleSearchChange = useCallback((field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSort = useCallback((column: string) => {
    setSortConfig((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const filterOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const field = order[key as keyof MaintenanceOrder];
        if (!field || typeof field !== "string") return false;

        return field.toLowerCase().includes(value.toLowerCase());
      });

      return (
        matchesFilters &&
        (!filters.serviceType ||
          order.serviceType?.toLowerCase() ===
            filters.serviceType.toLowerCase())
      );
    });
  }, [orders, filters]);

  useEffect(() => {
    setFilteredOrders(filterOrders);
    // eslint-disable-next-line
  }, [orders, filters]);

  const resetFilters = useCallback(() => {
    setFilters(defaultMaintenancefilter);
    setFilteredOrders(orders);
  }, [orders]);

  const sortedOrders = useMemo(() => {
    return sortByColumn(
      filteredOrders,
      sortConfig.column,
      sortConfig.direction
    );
  }, [filteredOrders, sortConfig]);

  const serviceTypeOptions = useMemo(
    () => [
      { label: "All", value: "" },
      ...services.map((service) => ({
        label: service.label,
        value: service.value,
      })),
    ],
    []
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
          <TableFilter
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleSearchChange={handleSearchChange}
            resetFilters={resetFilters}
            handleSort={handleSort}
            sortConfig={sortConfig} 
            fields={[
              "customerName",
              "phoneNumber",
              "email",
              "bikeBrand",
              "dueDate",
              "serviceType",
            ]}
            selectOptions={{
              serviceType: serviceTypeOptions,
            }}
          />
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id} onClick={(e) => handleRowClick(order.id, e)}>
                <td data-label="Customer Name">{order.customerName}</td>
                <td data-label="Phone Number">{order.phoneNumber}</td>
                <td data-label="Email">{order.email}</td>
                <td data-label="Bike Brand">{order.bikeBrand}</td>
                <td data-label="Due Date">{formatDate(order.dueDate)}</td>
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

      {orders.length === 0 ? (
        <NoContentFound />
      ) : sortedOrders.length === 0 ? (
        <div className="empty-content-wrap">
          <h2>Sorry, we couldn't find any matches</h2>
          <p>Please try again or reset filter</p>
        </div>
      ) : null}

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
