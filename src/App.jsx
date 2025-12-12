import { useState } from "react";
import data from "../data.json";

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

function Cart({ cart, deleteFromCart, confirmOrder, totalPrice }) {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="p-6 bg-white rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl text-red font-bold">Your Cart ({totalItems})</h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-4 gap-4">
          <img
            src="/images/illustration-empty-cart.svg"
            alt="Chocolate cake"
          />
          <p className="text-sm text-rose-500 font-semibold">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div>
          <ul>
            {cart.map((item) => {
              return (
                <li
                  key={item.id}
                  className="pb-4 border-b border-rose-100 mb-4 flex justify-between items-center"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-rose-900">
                      {item.name}
                    </h3>
                    <div className="flex gap-2 items-center text-sm">
                      <span className="font-semibold text-red">
                        {item.quantity}x
                      </span>
                      <span className="text-rose-500">@ ${item.price}</span>
                      <span className="font-semibold text-rose-500">
                        ${item.quantity * item.price}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteFromCart(item)}
                    className="border rounded-full p-1 border-rose-400 text-rose-400 hover:border-rose-900 hover:text-rose-900 transition-colors ease-in"
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
                        d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                      />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-rose-900">Order Total</p>
            <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-center items-center gap-2 bg-rose-50 rounded-lg p-4 my-6">
            <img
              src="/images/icon-carbon-neutral.svg"
              alt="Green tree icon"
            />
            <p>
              This is a{" "}
              <span className="text-rose-900 font-semibold">
                carbon-neutral
              </span>{" "}
              delivery
            </p>
          </div>
          <button
            onClick={() => confirmOrder()}
            className="cursor-pointer bg-red text-white font-semibold w-full rounded-[62rem] py-4 px-6 hover:bg-[#952C0B] transition-colors ease-in"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}

function ConfirmOrderModal({ cart, totalPrice, startNewOrder }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="w-full md:w-xl py-10 px-6 md:px-10 rounded-t-xl md:rounded-xl flex flex-col gap-8 bg-white">
        <div>
          <img
            src="/images/icon-order-confirmed.svg"
            alt="Green checkmark"
            className="mb-6"
          />
          <h2 className="mb-2 text-[2.5rem] text-rose-900 font-bold leading-12">
            Order Confirmed
          </h2>
          <p className="text-rose-500">We hope you enjoy your food!</p>
        </div>

        <div className="bg-rose-50 rounded-lg p-6">
          <ul className="flex flex-col gap-4 mb-6">
            {cart.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b border-rose-100 pb-4"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image.thumbnail}
                      alt={item.name}
                      className="rounded-sm w-12 h-12"
                    />

                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-rose-900 font-semibold">
                        {item.name}
                      </p>

                      <div className="flex gap-4 text-sm">
                        <span className="text-red font-semibold">
                          x{item.quantity}
                        </span>
                        <span className="text-rose-500">@ ${item.price}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-rose-900 font-semibold">
                    ${item.quantity * item.price}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-between text-rose-900">
            <p className="text-sm">Order Total</p>
            <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => startNewOrder()}
          className="cursor-pointer bg-red text-white font-semibold w-full rounded-[62rem] py-4 px-6 hover:bg-[#952C0B] transition-colors ease-in"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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

  const deleteFromCart = (dessert) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dessert.id));
  };

  const confirmOrder = () => {
    setIsOrderConfirmed(true);
  };

  const startNewOrder = () => {
    setCart([]);
    setIsOrderConfirmed(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-redhat bg-rose-50 relative min-h-screen">
      <div className="grid grid-cols-1 lg:grid-col-2 gap-8 py-12 px-6">
        <main className="flex flex-col gap-8">
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
        <aside>
          <Cart
            cart={cart}
            deleteFromCart={deleteFromCart}
            confirmOrder={confirmOrder}
            totalPrice={totalPrice}
          />
        </aside>
      </div>

      {isOrderConfirmed && (
        <ConfirmOrderModal
          cart={cart}
          totalPrice={totalPrice}
          startNewOrder={startNewOrder}
        />
      )}
    </div>
  );
}

export default App;
