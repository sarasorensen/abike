import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InputField from "./index";
import ids from "./test-ids.json";

describe("InputField Component", () => {
  it("should render the input field with the correct value and label", async () => {
    render(
      <InputField
        label="Customer Name"
        value="John Doe"
        name="customerName"
        placeholder="Enter customer name"
        onChange={jest.fn()}
        testId={ids.input}
      />
    );

    const input = screen.getByTestId(ids.input);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("John Doe");
  });
  it("should call onClear when the clear icon is clicked", async () => {
    const onClear = jest.fn();

    render(
      <InputField
        label="Customer Name"
        value="John Doe"
        name="customerName"
        placeholder="Enter customer name"
        onChange={jest.fn()}
        onClear={onClear}
        testId={ids.input}
      />
    );

    const input = screen.getByTestId(ids.input);
    const clearIcon = screen.getByTestId("input_input-clear");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("John Doe");

    fireEvent.click(clearIcon);

    await waitFor(() => {
      expect(onClear).toHaveBeenCalledTimes(1);
    });
  });
  it("renders a textarea when type is 'textarea'", () => {
    render(
      <InputField
        label="Description"
        value="Sample text"
        name="description"
        onChange={jest.fn()}
        testId="textarea-input"
        type="textarea"
      />
    );

    const textarea = screen.getByTestId("textarea-input");

    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveValue("Sample text");
  });

  it("renders an input when type is 'text'", () => {
    render(
      <InputField
        label="Username"
        value="JohnDoe"
        name="username"
        onChange={jest.fn()}
        testId="text-input"
        type="text"
      />
    );

    const input = screen.getByTestId("text-input");

    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveValue("JohnDoe");
  });
});
