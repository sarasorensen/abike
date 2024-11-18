import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import useBreadcrumbs from "use-react-router-breadcrumbs";
import OrdersList from "./pages/OrdersList/index";
import OrderDetails from "./pages/OrderDetails/index";
import NewOrder from "./pages/NewOrder/index";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop/index";
import "./styles/main.scss";

const routes = [
  { path: "/orders", breadcrumb: "Orders" },
  { path: "/orders/details/:id", breadcrumb: "Order Details" },
  { path: "/orders/details/:id/edit", breadcrumb: "Edit" },
  { path: "/orders/new", breadcrumb: "New Order" },
];

const App: React.FC = () => {
  const breadcrumbs = useBreadcrumbs(routes, { excludePaths: ["/orders/details", "/"] });

  return (
    <>
      <ScrollToTop />
      <Header breadcrumbs={breadcrumbs} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/orders" />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/orders/details/:id" element={<OrderDetails />} />
          <Route path="/orders/details/:id/edit" element={<NewOrder />} />
          <Route path="/orders/new" element={<NewOrder />} />
          <Route path="*" element={<Navigate to="/orders" />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
