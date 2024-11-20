import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InputSelect from "./index";

const mockOnSelect = jest.fn();

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

describe("InputSelect Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with options", async () => {
    render(
      <InputSelect
        options={options}
        onSelect={mockOnSelect}
        testId="input-select"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("input-select")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Select service type")
      ).toBeInTheDocument();
    });
  });

  it("opens the dropdown when input is clicked", async () => {
    render(
      <InputSelect
        options={options}
        onSelect={mockOnSelect}
        testId="input-select"
      />
    );

    const input = screen.getByTestId("input-select");
    fireEvent.click(input);

    await waitFor(() => {
      expect(screen.getByTestId("select-menu")).toBeInTheDocument();
    });
  });

  it("selects an option when clicked", async () => {
    render(
      <InputSelect
        options={options}
        onSelect={mockOnSelect}
        testId="input-select"
      />
    );

    fireEvent.click(screen.getByTestId("input-select"));
    fireEvent.click(screen.getByText("Option 1"));

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith("1");
    });
  });

  it("closes the dropdown when an option is selected", async () => {
    render(
      <InputSelect
        options={options}
        onSelect={mockOnSelect}
        testId="input-select"
      />
    );

    fireEvent.click(screen.getByTestId("input-select"));
    fireEvent.click(screen.getByText("Option 1"));

    await waitFor(() => {
      expect(screen.queryByTestId("select-menu")).not.toBeInTheDocument();
    });
  });

  it("closes the dropdown when clicked outside", async () => {
    render(
      <InputSelect
        options={options}
        onSelect={mockOnSelect}
        testId="input-select"
      />
    );

    fireEvent.click(screen.getByTestId("input-select"));
    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(screen.queryByTestId("select-menu")).not.toBeInTheDocument();
    });
  });

  it("displays a loading state when loading is true", async () => {
    render(
      <InputSelect
        options={options}
        onSelect={mockOnSelect}
        testId="input-select"
        loading={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("input-select")).toHaveClass("loading-select");
    });
  });

  it("renders with a label when displayLabel is true", async () => {
    render(
      <InputSelect
        options={options}
        onSelect={mockOnSelect}
        testId="input-select"
        displayLabel={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Select service type")).toBeInTheDocument();
    });
  });

  it("does not render label when displayLabel is false", async () => {
    render(
      <InputSelect
        options={options}
        onSelect={mockOnSelect}
        testId="input-select"
        displayLabel={false}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText("Select service type")).not.toBeInTheDocument();
    });
  });

  it("shows the correct selected value when value is provided", async () => {
    render(
      <InputSelect
        options={options}
        onSelect={mockOnSelect}
        value="2"
        testId="input-select"
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("input-select")).toHaveValue("Option 2");
    });
  });
});
