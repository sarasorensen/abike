import { render, screen, waitFor } from "@testing-library/react";
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

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("John Doe");
    });
  });

  it("should show the error message if the field is required and empty", async () => {
    render(
      <InputField
        label="Customer Name"
        value=""
        name="customerName"
        placeholder="Enter customer name"
        onChange={jest.fn()}
        required
        testId={ids.input}
      />
    );

    const input = screen.getByTestId(ids.input);
    const errorMessage = screen.getByText("This field is required");

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
