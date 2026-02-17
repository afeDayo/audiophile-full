import React from "react";
import { ImPlus, ImMinus } from "react-icons/im";
import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    calculateTotals,
    clearCart,
  } = useStore();
  const totals = calculateTotals();

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-start justify-end z-50 pt-[15%] pr-4 md:pr-[3.5%] lg:pr-[165px] lg:pt-[150px]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <div className="w-[90%] p-6 md:p-8 flex flex-col items-start gap-4 md:gap-6.5 rounded-lg bg-[#FFFFFF] shadow-lg relative mx-2  md:w-[377px]">
        <button
          onClick={() => setIsCartOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="flex items-center justify-between w-full mt-4">
          <h4 className="font-bold text-base md:text-[18px] tracking-[1px] text-[#000000] uppercase">
            cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </h4>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="font-normal text-sm text-[#00000050] cursor-pointer hover:text-[#D87D4A] underline"
            >
              Remove all
            </button>
          )}
        </div>

        <div className="w-full flex flex-col gap-4 max-h-[40vh] overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-6">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center w-full justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-6 max-h-10"
                    />
                  </div>

                  <div className="flex flex-col gap-1 items-start w-20">
                    <h4 className="font-bold text-sm text-[#000000] text-start">
                      {item.name.slice(0, 4)}
                    </h4>
                    <p className="font-bold text-xs text-[#00000050]">
                      $ {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center w-20 h-8 bg-[#F1F1F1] justify-between px-3">
                  <ImMinus
                    className="text-[#00000025] text-[5px] cursor-pointer hover:text-[#D87D4A]"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  />
                  <p className="font-bold text-xs text-[#000000] tracking-[1px]">
                    {item.quantity}
                  </p>
                  <ImPlus
                    className="text-[#00000025] text-[5px] cursor-pointer hover:text-[#D87D4A]"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div className="flex items-center justify-between w-full mt-2">
              <p className="font-normal text-sm text-[#00000050]">TOTAL</p>
              <h4 className="font-bold text-base md:text-[18px] tracking-[1px] text-[#000000] uppercase">
                $ {totals.subtotal.toLocaleString()}
              </h4>
            </div>

            <Link to="/checkout" className="w-full mt-2">
              <button
                className="bg-[#D87D4A] font-bold text-[13px] tracking-[1px] uppercase w-full py-3 text-[#FFFFFF] cursor-pointer hover:bg-[#FBAF85]"
                onClick={() => setIsCartOpen(false)}
              >
                checkout
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
