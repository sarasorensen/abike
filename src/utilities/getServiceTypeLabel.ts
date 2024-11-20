import { services } from "../shared-constants/services";

export const getServiceTypeLabel = (value: string): string => {
  const service = services.find((service) => service.value === value);
  return service ? service.label : value;
};
