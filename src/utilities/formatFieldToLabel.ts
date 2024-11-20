  export const formatFieldToLabel = (field: string): string => {
    return field
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^\w/, (char) => char.toUpperCase()); 
  };