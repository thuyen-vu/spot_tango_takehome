import { createContext, useContext } from "react";
import { Laptop, Tablet, Smartphone, Cable } from "lucide-react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const groupData = {
  Laptop: { label: "Laptops", img: Laptop },
  Tablet: { label: "Tablets", img: Tablet },
  Mobile: { label: "Mobile", img: Smartphone },
  Accessory: { label: "Accessories", img: Cable },
};
