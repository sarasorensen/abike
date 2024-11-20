export interface MaintenanceOrder {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  bikeBrand: string;
  serviceType: string;
  dueDate: string;
  notes: string;
}

export const defaultMaintenanceOrderData: MaintenanceOrder = {
  id: "",
  customerName: "",
  phoneNumber: "",
  email: "",
  bikeBrand: "",
  serviceType: "",
  dueDate: "",
  notes: "",
};

export const defaultMaintenancefilter = {
  id: "",
  customerName: "",
  phoneNumber: "",
  email: "",
  bikeBrand: "",
  serviceType: "",
  dueDate: ""
};