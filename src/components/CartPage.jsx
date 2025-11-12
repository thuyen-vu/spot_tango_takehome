import { useCart, groupData } from "../utilities.js";
import { Link } from "react-router-dom";
import { Trash, ShoppingCart as Cart, Lock } from "lucide-react";
import { QuantityButton } from "./";

const CartPage = () => {
  const { cart: cartObject, removeFromCart, subtotalPrice } = useCart();
  const cart = Object.values(cartObject);

  const savings = cart
    .reduce(
      (sum, item) =>
        item.product.msrp - item.product.price > 0 &&
        sum + (item.product.msrp - item.product.price) * item.quantity,
      0
    )
    .toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold mb-10">Your Cart</h1>

        <div className="flex flex-col space-y-7 lg:space-y-0 lg:flex-row lg:items-start">
          <div className="flex lg:w-3/5">
            {/* Cart */}
            <div
              className={`w-full lg:w-[90%] bg-white rounded-xl p-7 space-y-5 min-h-100 ${
                cart && cart.length === 0 && "flex flex-col justify-center"
              }`}
            >
              {cart && cart.length > 0 ? (
                cart.map((item) => {
                  const Image = groupData[item.product.group].img;
                  const price = item.product.price;
                  const msrp = item.product.msrp;
                  return (
                    <div
                      key={item.product.id}
                      className="flex justify-between items-start relative border-b pb-6 border-gray-200 last:border-none"
                    >
                      <div className="flex space-x-4">
                        <Image
                          size={150}
                          strokeWidth={0.5}
                          className="p-1 bg-gray-50 rounded-sm shadow-sm"
                        />

                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="font-semibold text-lg">
                              {item.product.name}
                            </p>
                            <p className="text-gray-500">
                              {item.product.group}
                            </p>
                            <p className="text-gray-500">
                              ${item.product.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex space-x-2">
                            <QuantityButton item={item} />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between h-[150px]">
                        <button
                          className="cursor-pointer self-end"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash size={15} />
                        </button>

                        {msrp > price ? (
                          <div>
                            <p className="text-gray-500 text-sm float-right">
                              <s>${(msrp * item.quantity).toFixed(2)}</s>
                            </p>
                            <p className="font-semibold">
                              ${(price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ) : (
                          <p className="font-semibold">${price.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center py-10 my-auto">
                  <Cart strokeWidth={1} size={150} className="mb-5" />
                  Your cart is empty. <br />
                  <Link
                    to="/shop-all"
                    className="rounded-full bg-black py-1 px-8 text-white mt-3 hover:bg-gray-900 cursor-pointer"
                  >
                    Shop now
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-2/5 bg-white rounded-xl py-10 px-15 min-h-100 space-y-1 flex flex-col justify-between">
            <div>
              <h1 className="font-bold text-2xl mb-7">Order Summary</h1>
              <div className="flex justify-between">
                <p>Item Subtotal</p>
                <p>${subtotalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="text-gray-500">Calculated at checkout</p>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <p className="text-gray-500">Calculated at checkout</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-bold">Estimated total</p>
                <p className="font-bold">${subtotalPrice.toFixed(2)}</p>
              </div>
            </div>
            <div>
              {savings > 0 && (
                <p className="w-full text-center mb-2 text-green-600 font-bold">
                  You saved ${savings}
                </p>
              )}

              <button className="w-full flex items-center justify-center bg-black hover:bg-gray-900 text-white rounded-full p-3">
                <Lock className="h-4 mr-1" />
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
