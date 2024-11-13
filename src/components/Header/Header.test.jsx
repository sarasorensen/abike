import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./index";
import ids from "./test-ids.json";

describe("Header", () => {
    it("should render the header with links", async () => {
        render(
            <MemoryRouter future={{ 
                v7_startTransition: true, 
                v7_relativeSplatPath: true 
            }}>
                <Header />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId(ids.navLinkOrderList)).toBeInTheDocument();
            expect(screen.getByTestId(ids.navLinkNewOrderList)).toBeInTheDocument();
        });
    });
});
