import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableFilter from "./index";

const mockHandleChange = jest.fn();
const mockHandleSort = jest.fn();
const mockResetFilters = jest.fn();

const filters = {
  customerName: "",
  phoneNumber: "",
  email: "",
  bikeBrand: "",
  dueDate: "",
  serviceType: "",
};

const selectOptions = {
  customerName: [
    { label: "John Doe", value: "john" },
    { label: "Jane Smith", value: "jane" },
  ],
};

const fields = [
  "customerName",
  "phoneNumber",
  "email",
  "bikeBrand",
  "dueDate",
  "serviceType",
];
const sortConfig = { column: "customerName", direction: "asc" };

describe("TableFilter", () => {
  beforeEach(() => {
    render(
      <table>
        <TableFilter
          filters={filters}
          handleChange={mockHandleChange}
          resetFilters={mockResetFilters}
          handleSort={mockHandleSort}
          fields={fields}
          selectOptions={selectOptions}
          sortConfig={sortConfig}
        />
      </table>
    );
  });

  it("renders the filter input fields and select options", () => {
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Bike Brand")).toBeInTheDocument();
    expect(screen.getByText("Due Date")).toBeInTheDocument();
    expect(screen.getByText("Service Type")).toBeInTheDocument();
  });

  it("calls handleFilterChange when number input changes", () => {
    const number = screen.getByTestId("input_search_phone_number");

    fireEvent.change(number, { target: { value: 12345 } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleFilterChange when email input changes", () => {
    const email = screen.getByTestId("input_search_email");

    fireEvent.change(email, { target: { value: "johndoe@gmail.com" } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleSort when a column header is clicked", () => {
    const columnHeader = screen.getByText("Customer Name");
    fireEvent.click(columnHeader);

    expect(mockHandleSort).toHaveBeenCalledWith("customerName");
  });

  it("calls resetFilters when the reset filter button is clicked", () => {
    const resetButton = screen.getByTestId("reset_filter");
    fireEvent.click(resetButton);

    expect(mockResetFilters).toHaveBeenCalledTimes(1);
  });
  it("does not call resetFilters when resetFilters is not passed as prop", () => {
    render(
      <table>
        <TableFilter
          filters={filters}
          handleChange={mockHandleChange}
          handleSort={mockHandleSort}
          fields={fields}
          selectOptions={selectOptions}
          sortConfig={sortConfig}
        />
      </table>
    );

    const resetButton = screen.queryByTestId("resetFilter");
    expect(resetButton).toBeNull();
  });
});
