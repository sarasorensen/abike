import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OrdersList from "./pages/OrdersList/index";
import OrderDetails from "./pages/OrderDetails/index";
import NewOrder from "./pages/NewOrder/index";
import NotFound from "./pages/NotFound/index";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop/index";
import "./styles/main.scss";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/orders" />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/orders/new" element={<NewOrder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
