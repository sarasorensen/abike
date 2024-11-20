import React, { ChangeEvent } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";
import InputField from "../../components/InputField";
import InputSelect from "../../components/InputSelect";
import { testId } from "../../utilities/testId";
import ids from "../../pages/OrdersList/test-ids.json";
import { formatFieldToLabel } from "../../utilities/formatFieldToLabel";

const getTestId = (field: string, type: string) =>
  ids[
    `${type}${
      field.charAt(0).toUpperCase() + field.slice(1)
    }` as keyof typeof ids
  ];

type FiltersProps = {
  filters: Record<string, string>;
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => void;
  handleSearchChange: (field: string, value: string) => void;
  resetFilters?: () => void;
  handleSort: (column: string) => void;
  fields: string[];
  selectOptions: Record<string, { label: string; value: string }[]>;
  sortConfig: { column: string; direction: "asc" | "desc" };
};

const TableFilter: React.FC<FiltersProps> = ({
  filters,
  handleFilterChange,
  handleSearchChange,
  resetFilters,
  handleSort,
  fields,
  selectOptions,
  sortConfig,
}) => {
  return (
    <thead>
      <tr className="filters-heading">
        {fields.map((column) => (
          <th key={column} onClick={() => handleSort(column)}>
            {formatFieldToLabel(column)}
            {sortConfig.column === column && (
              <span>
                {sortConfig.direction === "asc" ? (
                  <FaArrowUp />
                ) : (
                  <FaArrowDown />
                )}
              </span>
            )}
          </th>
        ))}
        <th></th>
      </tr>
      <tr className="filters-container">
        {fields.map((field) => {
          const label = formatFieldToLabel(field);
          const hasSelectOptions = Boolean(selectOptions[field]);

          return (
            <th key={field}>
              <div className="filter-input-container">
                {hasSelectOptions ? (
                  <InputSelect
                    options={selectOptions[field]}
                    value={filters[field]}
                    onSelect={(value) => handleSearchChange(field, value)}
                    placeholder={`Select ${label}`}
                    classesName="select-input--white"
                    displayLabel={false}
                    testId={getTestId(field, "select")}
                  />
                ) : (
                  <InputField
                    type={field === "dueDate" ? "date" : "text"}
                    value={filters[field]}
                    onChange={(e) => handleFilterChange(e, field)}
                    onClear={() => handleSearchChange(field, "")}
                    placeholder={`Filter by ${label}`}
                    name={`search${label}`}
                    classesName="input-field--white"
                    testId={getTestId(field, "inputSearch")}
                  />
                )}
              </div>
            </th>
          );
        })}
        {resetFilters && (
          <th>
            <span
              onClick={resetFilters}
              className="reset-filter-icon"
              {...testId(ids.resetFilter)}
            >
              <FaFilterCircleXmark />
            </span>
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableFilter;