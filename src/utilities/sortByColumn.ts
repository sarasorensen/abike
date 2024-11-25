import { MaintenanceOrder } from "../types/maintenanceOrder";
export function sortByColumn(
  items: MaintenanceOrder[],
  sortColumn: string,
  sortDirection: "asc" | "desc" = "asc"
): MaintenanceOrder[] {
  return [...items].sort((a, b) => {
    const valueA =
      (a[sortColumn as keyof MaintenanceOrder] as string)
        ?.toString()
        .toLowerCase() ?? "";
    const valueB =
      (b[sortColumn as keyof MaintenanceOrder] as string)
        ?.toString()
        .toLowerCase() ?? "";

    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  });
}
