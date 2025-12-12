import { useState } from "react";
import data from "../data.json";
import "./App.css";

function DessertCard({ dessert, cartQuantity, addToCart, removeFromCart }) {
  return (
    <article>
      <div className="relative mb-8">
        <div
          className={
            cartQuantity === 0
              ? "rounded-lg border-2 border-transparent overflow-hidden"
              : "rounded-lg border-2 border-red overflow-hidden"
          }
        >
          <picture>
            <source
              srcSet={dessert.image.desktop}
              media="(min-width: 1024px)"
            />
            <source srcSet={dessert.image.tablet} media="(min-width: 768px)" />
            <img src={dessert.image.mobile} alt={dessert.name} />
          </picture>
        </div>
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
          {cartQuantity === 0 ? (
            <button
              onClick={() => addToCart(dessert)}
              className="border-rose-400 border-[1.5px] rounded-[62rem] px-7 py-3 flex items-center gap-2 bg-white text-rose-900 font-semibold cursor-pointer hover:border-red hover:text-red transition-colors ease-in"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  fill="none"
                  viewBox="0 0 21 20"
                >
                  <g fill="#C73B0F" clip-path="url(#a)">
                    <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                    <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M.333 0h20v20h-20z" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="flex justify-between items-center w-40 p-3 gap-2 border-red border-[1.5px] rounded-[62rem] text-white bg-red">
              <button
                onClick={() => removeFromCart(dessert)}
                className="w-5 h-5 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-red transition-colors ease-in"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="2"
                  fill="none"
                  viewBox="0 0 10 2"
                >
                  <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
                </svg>
              </button>
              <span>{cartQuantity}</span>
              <button
                onClick={() => addToCart(dessert)}
                className="w-5 h-5 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-red transition-colors ease-in"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="none"
                  viewBox="0 0 10 10"
                >
                  <path
                    fill="currentColor"
                    d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <span className="text-sm text-rose-500">{dessert.category}</span>
        <p className="text-base text-rose-900 font-semibold">{dessert.name}</p>
        <span className="text-base text-red font-semibold">
          ${dessert.price}
        </span>
      </div>
    </article>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (dessert) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dessert.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === dessert.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...dessert, quantity: 1 }];
    });
  };

  const removeFromCart = (dessert) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dessert.id);

      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== dessert.id);
      }
      return prevCart.map((item) =>
        item.id === dessert.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  return (
    <div className="font-redhat">
      <main>
        <h1 className="text-[2.5rem] font-bold leading-12">Desserts</h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((dessert) => {
            const cartItem = cart.find((item) => item.id === dessert.id);
            const cartQuantity = cartItem ? cartItem.quantity : 0;

            return (
              <li key={dessert.id}>
                <DessertCard
                  dessert={dessert}
                  cartQuantity={cartQuantity}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
