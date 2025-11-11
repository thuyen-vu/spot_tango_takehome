import { useState } from "react";
import { CartContext } from "../utilities.js";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({}); // { [productId]: { product, quantity } }
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [subtotalPrice, setSubtotalPrice] = useState(0);

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        product,
        quantity: (prev[product.id]?.quantity || 0) + 1,
      },
    }));
    setTotalQuantity((prev) => prev + 1);
    setSubtotalPrice((prev) => prev + product.price);
  };

  const removeFromCart = (itemId) => {
    setTotalQuantity((prev) => prev - cart[itemId].quantity);
    setSubtotalPrice(
      (prev) => prev - cart[itemId].quantity * cart[itemId].product.price
    );
    const newCart = { ...cart };
    delete newCart[itemId];
    setCart(newCart);
  };

  const updateQuantity = (itemId, quantity) => {
    const ogQuantity = cart[itemId].quantity;
    setCart((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantity,
      },
    }));
    setTotalQuantity((prev) => prev - ogQuantity + quantity);
    setSubtotalPrice(
      (prev) => prev + (quantity - ogQuantity) * cart[itemId].product.price
    );
    if (quantity === 0) {
      const newCart = { ...cart };
      delete newCart[itemId];
      setCart(newCart);
    }
  };

  return (
    <CartContext
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalQuantity,
        subtotalPrice,
      }}
    >
      {children}
    </CartContext>
  );
};

export default CartProvider;
