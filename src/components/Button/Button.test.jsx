import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./index";
import ids from "./test-ids.json";

describe("Button Component", () => {
  it("should render the button with the correct label", async () => {
    render(<Button label="Submit" onClick={jest.fn()} testId={ids.button} />);

    const button = screen.getByTestId(ids.button);

    await waitFor(() => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Submit");
    });
  });

  it("should call onClick when clicked", async () => {
    const onClickMock = jest.fn();

    render(<Button label="Submit" onClick={onClickMock} testId={ids.button} />);

    const button = screen.getByTestId(ids.button);

    userEvent.click(button);

    await waitFor(() => {
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });
});
