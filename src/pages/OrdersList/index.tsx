import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteConfirmationModal } from "../../hooks/DeleteConfirmationModal/useDeleteConfirmationModal";
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

  const handleSort = useCallback((column: string) => {
    setSortConfig((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const handleChange = useCallback(
    (
      e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: string
    ) => {
      const value = typeof e === "string" ? e : e.target.value;

      setFilters((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const filterOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const field = order[key as keyof MaintenanceOrder];
        if (!field || typeof field !== "string") return false;

        return field.toLowerCase().includes(value.toLowerCase());
      });

      return matchesFilters;
    });
  }, [orders, filters]);

  useEffect(() => {
    setFilteredOrders(filterOrders);
    // eslint-disable-next-line
  }, [filterOrders]);

  const resetFilters = useCallback(() => {
    setFilters(defaultMaintenancefilter);
    setFilteredOrders(orders);
    setSortConfig({
      column: "customerName",
      direction: "asc" as SortDirection,
    });
  }, [orders]);

  const sortedOrders = useMemo(() => {
    return sortByColumn(
      filteredOrders,
      sortConfig.column,
      sortConfig.direction
    );
  }, [filteredOrders, sortConfig]);
console.log('sortedOrders', sortedOrders)
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

  const validDueDates = orders.map((order) => order.dueDate);

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
            handleChange={handleChange}
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
            validDueDates={validDueDates}
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
