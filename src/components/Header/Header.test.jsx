import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./index";
import ids from "./test-ids.json";

const mockBreadcrumbs = [
    { breadcrumb: "Home", match: { pathname: "/home" } },
    { breadcrumb: "Orders", match: { pathname: "/orders" } },
];

describe("Header", () => {
    it("should render the header with links", async () => {
        render(
            <MemoryRouter  future={{ 
                v7_startTransition: true, 
                v7_relativeSplatPath: true 
            }}>
                <Header breadcrumbs={mockBreadcrumbs} />
            </MemoryRouter>
        );

            expect(screen.getByTestId(ids.navLinkHeader)).toBeInTheDocument();
            
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("Orders")).toBeInTheDocument();

            const lastBreadcrumb = screen.getByText("Orders");
            expect(lastBreadcrumb.closest("span")).toHaveClass("header__link");
    });
});
