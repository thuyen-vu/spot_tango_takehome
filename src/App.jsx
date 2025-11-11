import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CartProvider,
  NavigationBar,
  Products,
  CartPage,
  Footer,
} from "./components";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <CartProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Products group="" />} />
            <Route path="/shop-all" element={<Products group="" />} />
            <Route path="/laptops" element={<Products group="Laptop" />} />
            <Route path="/tablets" element={<Products group="Tablet" />} />
            <Route path="/mobile" element={<Products group="Mobile" />} />
            <Route
              path="/accessories"
              element={<Products group="Accessory" />}
            />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </CartProvider>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
