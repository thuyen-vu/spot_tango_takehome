import { SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart, groupData } from "../utilities.js";
import { CartSidebar, Filter } from "./";

const Products = ({ group }) => {
  const [productsData, setProductsData] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCartBarOpen, setIsCartBarOpen] = useState(false);
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(
      "https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json"
    )
      .then((response) => response.json())
      .then((data) => setProductsData(data))
      .catch(() =>
        setErrorMessage("Error fetching products. Please try again later.")
      );
  }, []);

  const location = useLocation();
  useEffect(() => {
    setSelectedGroups([]);
    setSelectedAvailability("");
  }, [location.pathname]);

  const filteredProducts = productsData.filter((product) => {
    const matchesGroup =
      (selectedGroups.length === 0 && location.pathname === "/shop-all") ||
      (selectedGroups.length === 0 && location.pathname === "/") ||
      selectedGroups.includes(product.group) ||
      group === product.group;

    const matchesAvailability =
      selectedAvailability === "" ||
      (selectedAvailability === "Available" &&
        product.status === "Available") ||
      (selectedAvailability === "Unavailable" &&
        product.status === "Unavailable");

    return matchesGroup && matchesAvailability;
  });

  return (
    <div className="max-w-7xl mx-auto px-5">
      {/* Product Page Heading */}
      <h1 className="text-4xl mt-10 mb-17">
        {group === "" ? "All Products" : groupData[group].label}
      </h1>

      <div className="items-start flex">
        {/* Filter */}
        <Filter
          {...{
            isFilterBarOpen,
            setIsFilterBarOpen,
            selectedGroups,
            setSelectedGroups,
            selectedAvailability,
            setSelectedAvailability,
          }}
        />

        {/* Products Grid */}
        <div>
          <SlidersHorizontal
            className="lg:hidden mb-2 "
            onClick={() => setIsFilterBarOpen(true)}
          />
          <main className="flex-1 grid gap-x-4 gap-y-4 grid-cols-2 md:grid-cols-3 mb-20 place-items-center">
            {errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              filteredProducts.map((product) => {
                const Image = groupData[product.group].img;

                return (
                  <div
                    key={product.id}
                    className="flex flex-col space-y-3 w-full max-w-[300px] justify-between items-center p-7 border border-gray-200 rounded-lg shadow-sm h-130"
                  >
                    <div className="relative">
                      <Image
                        strokeWidth={0.5}
                        className={`absolute inset-0 w-full h-full ${
                          product.group === "Mobile" ||
                          product.group === "Accessory"
                            ? "p-12"
                            : "p-7"
                        } object-cover transition-opacity duration-300 hover:opacity-0 bg-gray-50 rounded-md`}
                      />
                      <img
                        src={`https://placehold.co/300/f9fafb/black?text=${encodeURIComponent(
                          product.group
                        )}`}
                        className="block rounded-md shadow-sm"
                      />
                      {product.status === "Unavailable" && (
                        <div className="absolute inset-0 bg-black opacity-5 rounded-md" />
                      )}
                    </div>

                    <div>
                      <p className="text-lg text-center">{product.name}</p>
                      <p className="text-sm text-gray-600 text-center">
                        {product.group}
                      </p>
                    </div>

                    <div className="flex space-x-2 items-end">
                      {product.msrp > product.price ? (
                        <>
                          <p className="text-gray-600">
                            <s>${product.msrp.toFixed(2)}</s>
                          </p>
                          <p className="font-semibold">
                            ${product.price.toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="font-semibold">
                          ${product.price.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-red-600 font-semibold">
                      SAVE ${Math.round(product.msrp - product.price)}
                    </p>

                    {product.status === "Available" ? (
                      <button
                        onClick={() => {
                          addToCart(product);
                          setIsCartBarOpen(true);
                        }}
                        className="cursor-pointer text-white bg-black hover:bg-gray-900 rounded-full py-2 w-full mt-4 "
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button className="text-white bg-sky-950 rounded-full py-2 w-full mt-4">
                        SOLD OUT
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </main>
        </div>
      </div>

      <CartSidebar
        isOpen={isCartBarOpen}
        onClose={() => setIsCartBarOpen(false)}
      />
    </div>
  );
};

export default Products;
