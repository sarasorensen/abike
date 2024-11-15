import { MaintenanceOrder } from "../types/maintenanceOrder";
import { mockedOrders } from "../shared-constants/mockedOrders";

export const getOrdersFromStorage = (): MaintenanceOrder[] => {
  const orders = localStorage.getItem("orders");
  if (orders) {
    return JSON.parse(orders);
  }
  localStorage.setItem("orders", JSON.stringify(mockedOrders));
  return mockedOrders;
};

export const saveOrdersToStorage = (orders: MaintenanceOrder[]): void => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

export const addOrder = (newOrder: MaintenanceOrder): void => {
  const orders = getOrdersFromStorage();
  const exists = orders.some((order) => order.id === newOrder.id);
  if (!exists) {
    orders.push(newOrder);
    saveOrdersToStorage(orders);
  } else {
    console.warn(`Order with id ${newOrder.id} already exists.`);
  }
};

export const editOrder = (updatedOrder: MaintenanceOrder): void => {
  const orders = getOrdersFromStorage();
  const index = orders.findIndex((order) => order.id === updatedOrder.id);
  if (index !== -1) {
    orders[index] = updatedOrder;
    saveOrdersToStorage(orders);
  } else {
    console.warn(`Order with id ${updatedOrder.id} does not exist.`);
  }
};

export const deleteOrder = (orderId: string): void => {
  const orders = getOrdersFromStorage().filter((order) => order.id !== orderId);
  saveOrdersToStorage(orders);
};
