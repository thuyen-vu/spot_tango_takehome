import { useCart } from "../utilities";

/*
  Button to control item quantity.
*/

const QuantityButton = ({ item }) => {
  const { updateQuantity } = useCart();

  return (
    <div className="flex items-center justify-between space-x-2 px-3 py-0.5 border border-gray-300 rounded-full w-25">
      <button
        onClick={() =>
          item.quantity > 0 &&
          updateQuantity(item.product.id, item.quantity - 1)
        }
        className="cursor-pointer text-lg text-gray-400"
      >
        −
      </button>
      <p className="overflow-x-auto scrollbar-hide text-center text-sm">
        {item.quantity}
      </p>

      <button
        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
        className="cursor-pointer text-lg text-gray-400"
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
