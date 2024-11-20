import { render, screen } from "@testing-library/react";
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
});
