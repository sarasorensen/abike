import { render, screen, waitFor } from "@testing-library/react";
import ActionSuccessMsg from "./index";

describe("ActionSuccessMsg", () => {
  it("should render the success message with the provided action",async () => {
    const actionText = "Order submission";

    render(<ActionSuccessMsg action={actionText} />);

  await waitFor(() =>{
    expect(screen.getByText(`${actionText} successful`)).toBeInTheDocument();
  })
  });
});
