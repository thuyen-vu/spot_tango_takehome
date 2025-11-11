import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import logo from "/logo.png";
import { useCart } from "../utilities";
import { CartSidebar } from "./";

const NavigationBar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isCartBarOpen, setIsCartBarOpen] = useState(false);

  const menuItems = [
    { label: "Shop All", route: "/shop-all" },
    { label: "Laptops", route: "/laptops" },
    { label: "Tablets", route: "/tablets" },
    { label: "Mobile", route: "/mobile" },
    { label: "Accessories", route: "/accessories" },
  ];
  const { totalQuantity } = useCart();
  return (
    <div>
      <nav className="py-8 border-b border-gray-200">
        {/* Logo */}
        <div className="px-5 max-w-7xl flex items-center mx-auto">
          <Link to="/">
            <img src={logo} className="h-8" />
          </Link>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  to={item.route}
                  key={item.label}
                  className="hover:underline decoration-1 underline-offset-6 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setIsCartBarOpen(true);
            }}
            className="cursor-pointer relative ml-auto"
          >
            <ShoppingCart size={25} />
            {totalQuantity > 0 && (
              <div className="absolute top-0.5 -right-0.5 bg-red-500 rounded-full h-2 w-2" />
            )}
          </button>
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-cente ml-2">
            <button
              onClick={() =>
                isMenuOpened ? setIsMenuOpened(false) : setIsMenuOpened(true)
              }
            >
              {isMenuOpened ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <CartSidebar
          isOpen={isCartBarOpen}
          onClose={() => setIsCartBarOpen(false)}
        />
      </nav>
    </div>
  );
};

export default NavigationBar;
