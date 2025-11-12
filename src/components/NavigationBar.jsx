import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import logo from "/logo.png";
import { useCart } from "../utilities";

/* 
  Navigation bar for site navigation.
  Includes logo, desktop menu, mobile menu with toggle, and cart icon.
 */

const NavigationBar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const nav = useNavigate();

  const menuItems = [
    { label: "Shop All", route: "/shop-all" },
    { label: "Laptops", route: "/laptops" },
    { label: "Tablets", route: "/tablets" },
    { label: "Mobile", route: "/mobile" },
    { label: "Accessories", route: "/accessories" },
  ];

  const { totalQuantity } = useCart(); // Get cart quantity from custom hook

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpened) {
        setIsMenuOpened(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpened]);

  return (
    <div className="flex flex-col">
      <nav className="py-8 border-b border-gray-200 shadow-xs">

        {/* Logo */}
        <div className="px-5 max-w-7xl flex items-center mx-auto">
          <Link to="/">
            <img src={logo} className="h-8" />
          </Link>

          {/* Desktop Menu */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
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

          {/* Cart icon with badge to show if it contains items */}
          <button
            onClick={() => nav("/cart")}
            className="cursor-pointer relative ml-auto"
          >
            <ShoppingCart size={25} />
            {totalQuantity > 0 && (
              <div className="absolute top-0.5 -right-0.5 bg-red-500 rounded-full h-2 w-2" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center ml-3">
            <button
              onClick={() =>
                isMenuOpened ? setIsMenuOpened(false) : setIsMenuOpened(true)
              }
            >
              {isMenuOpened ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="lg:hidden">

        {/* Overlay that closes the menu when clicked */}
        <div
          className={`fixed inset-0 z-20 ${
            isMenuOpened ? "pointer-events-auto" : "pointer-events-none"
          }`}
          onClick={() => setIsMenuOpened(false)}
        />

        {/* Sliding Menu */}
        <div
          className={`fixed right-0 z-30 flex flex-col w-100 bg-white shadow-md transform transition-transform duration-300 rounded-lg h-full ${
            isMenuOpened ? "translate-x-0" : "translate-x-full"
          } flex flex-col px-5 py-4`}
        >
          {menuItems.map((item) => (
            <Link
              to={item.route}
              key={item.label}
              className="hover:underline decoration-1 underline-offset-6 py-2"
              onClick={() => setIsMenuOpened(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
