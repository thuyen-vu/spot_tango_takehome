import { useCart, groupData } from "../utilities";
import { X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuantityButton } from "./";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, totalQuantity, subtotalPrice } = useCart();
  const nav = useNavigate();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-110 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold ml-31">
            Your Cart ({totalQuantity})
          </h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-5 flex-1 flex flex-col space-y-10 overflow-y-auto">
          {Object.values(cart).length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            Object.values(cart).map((item) => {
              const Image = groupData[item.product.group].img;

              return (
                <>
                  <div
                    key={item.product.id}
                    className="relative flex items-start"
                  >
                    <div>
                      <Image
                        size={60}
                        strokeWidth={0.5}
                        className="mt-2 p-1 bg-gray-50 rounded-sm shadow-sm"
                      />
                    </div>
                    <div className="ml-5 w-55">
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.product.group}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <button
                        className="text-gray-500 text-xs underline underline-offset-2 cursor-pointer"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="absolute right-0 flex flex-col items-end">
                      <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="absolute right-0 bottom-0">
                      <QuantityButton item={item} />
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>

        {/* Footer / Total */}

        <div className="p-5 border-t border-gray-200">
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Subtotal</span>
            <span>${subtotalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              onClose();
              nav("/cart");
            }}
            className="cursor-pointer justify-center flex items-center mt-4 w-full bg-black text-white py-2 rounded-full hover:bg-gray-900"
          >
            <ShoppingCart className="h-4 mr-1" />
            Review Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
