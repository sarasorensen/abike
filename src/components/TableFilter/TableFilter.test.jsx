import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableFilter from './index'; 

const mockHandleFilterChange = jest.fn();
const mockHandleSearchChange = jest.fn();
const mockHandleSort = jest.fn();
const mockResetFilters = jest.fn();

const filters = {
  customerName: '',
  email: '',
  dueDate: '',
};

const selectOptions = {
  customerName: [
    { label: 'John Doe', value: 'john' },
    { label: 'Jane Smith', value: 'jane' },
  ],
};

const fields = ['customerName', 'email', 'dueDate'];
const sortConfig = { column: 'customerName', direction: 'asc' };

describe('TableFilter', () => {
  beforeEach(() => {
    render(
      <table>
        <TableFilter
          filters={filters}
          handleFilterChange={mockHandleFilterChange}
          handleSearchChange={mockHandleSearchChange}
          resetFilters={mockResetFilters}
          handleSort={mockHandleSort}
          fields={fields}
          selectOptions={selectOptions}
          sortConfig={sortConfig}
        />
      </table>
    );
  });

  it('renders the filter input fields and select options', () => {
    expect(screen.getByText('Customer Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Due Date')).toBeInTheDocument();
  });
  it('calls handleFilterChange when text input changes', () => {
    const email = screen.getByTestId('input_search_email');

    fireEvent.change(email, { target: { value: 'johndoe@gmail.com' } });
    expect(mockHandleFilterChange).toHaveBeenCalledTimes(1)
  });
  
  it('calls handleSort when a column header is clicked', () => {
    const columnHeader = screen.getByText('Customer Name');
    fireEvent.click(columnHeader);

    expect(mockHandleSort).toHaveBeenCalledWith('customerName');
  });


  it('calls resetFilters when the reset filter button is clicked', () => {
    const resetButton = screen.getByTestId('reset_filter');
    fireEvent.click(resetButton);

    expect(mockResetFilters).toHaveBeenCalledTimes(1);
  });
});
