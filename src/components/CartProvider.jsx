import { useState } from "react";
import { CartContext } from "../utilities.js";

/*
  Writes states and utility functions to input as props into the CartContext component and 
  returns it to use as a context provider.
  Used to centralize cart state across the application.
*/

const CartProvider = ({ children }) => {
  // Cart state: stores items keyed by product id
  // Ex: { "214aaffb-2230-49f8-a18b-9e7b19e01bfd": { product : {...}, quantity: 2 } }
  const [cart, setCart] = useState({});

  // Update total quantity and price each time we update the cart for performance
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
    
    // Use Math.abs() to avoid negative zeroes from float arithmetic
    setSubtotalPrice((prev) => Math.abs(prev + product.price));
  };

  const removeFromCart = (itemId) => {
    setTotalQuantity((prev) => prev - cart[itemId].quantity);
    setSubtotalPrice((prev) =>
      Math.abs(prev - cart[itemId].quantity * cart[itemId].product.price)
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
    setSubtotalPrice((prev) =>
      Math.abs(prev + (quantity - ogQuantity) * cart[itemId].product.price)
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
