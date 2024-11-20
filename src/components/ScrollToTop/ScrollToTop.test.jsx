import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "./index";

global.scrollTo = jest.fn();

describe("ScrollToTop Component", () => {
  it("should scroll to top on route change", async() => {
    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ScrollToTop />
      </MemoryRouter>
    );

    window.history.pushState({}, "", "/new-route");
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
