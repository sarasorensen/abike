import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrdersList from "./pages/OrdersList/index";
import OrderDetails from "./pages/OrderDetails/index";
import NewOrder from "./pages/NewOrder/index";
import NotFound from "./pages/NotFound/index";
import Header from "./components/Header";
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<OrdersList />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order/new" element={<NewOrder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
