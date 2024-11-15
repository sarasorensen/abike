export function sortByColumn<T>(
    items: T[],
    sortColumn: string,
    sortDirection: "asc" | "desc" = "asc"
  ): T[] {
    return [...items].sort((a, b) => {
      const valueA = (a[sortColumn as keyof T] as unknown as string)?.toString().toLowerCase() ?? "";
      const valueB = (b[sortColumn as keyof T] as unknown as string)?.toString().toLowerCase() ?? "";
  
      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
  }
  