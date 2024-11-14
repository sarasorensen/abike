import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "./index";

// Mock the window.scrollTo function
global.scrollTo = jest.fn();

describe("ScrollToTop Component", () => {
  it("should scroll to top on route change", () => {
    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ScrollToTop />
      </MemoryRouter>
    );

    // Simulate route change
    window.history.pushState({}, "", "/new-route");

    // Assert that window.scrollTo(0, 0) has been called
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
