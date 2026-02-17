import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useStore } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const { orderData, isThankYouOpen, setIsThankYouOpen } = useStore();
  const navigate = useNavigate();

  if (!isThankYouOpen || !orderData) {
    return null;
  }

  const { orderSummary, cartItems } = orderData;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const firstONEItems = cartItems.slice(0, 1);
  const remainingItems = cartItems.length - 1;

  const handleClose = () => {
    setIsThankYouOpen(false);
    navigate("/");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-6"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <div className="bg-[#FFFFFF] rounded-lg w-full max-w-[540px] p-6 md:p-12 lg:p-12 text-start flex flex-col gap-4 md:gap-6 lg:gap-7.5 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 md:top-4 right-2 md:right-4 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <IoIosCheckmarkCircle className="text-[64px] md:text-[79px] lg:text-[64px] text-[#D87D4A]" />

        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          <h2 className="font-bold text-xl md:text-3xl lg:text-[32px] leading-tight md:leading-9 tracking-[0.5px] md:tracking-[1.14px] text-[#000000]">
            THANK YOU <br /> FOR YOUR ORDER
          </h2>
          <p className="font-normal text-sm text-[#00000050]">
            You will receive an email confirmation shortly.
          </p>
        </div>

        <div className="w-full flex flex-col lg:flex-row items-stretch md:grid md:grid-cols-[1.5fr_1fr]">
          <div className="p-4 md:p-6 bg-[#F1F1F1] flex-1 flex flex-col items-center gap-3 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none md:rounded-l-lg md:rounded-t-none">
            <div className="flex flex-col gap-3 w-full">
              {firstONEItems.map((item) => (
                <div
                  key={item.productId || item._id}
                  className="flex items-center w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 md:w-[50px] md:h-[50px] flex items-center justify-center rounded-lg bg-[#F1F1F1] md:rounded-l-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-sm text-[#000000]">
                        {item.name.slice(0, 12)}
                      </p>
                      <p className="font-bold text-xs text-[#00000050]">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-[#00000050]">
                    x{item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {remainingItems > 0 && (
              <>
                <hr className="w-full border-t border-[#00000010]" />
                <p className="font-bold text-xs text-[#00000050] text-center">
                  and {remainingItems} other item(s)
                </p>
              </>
            )}
          </div>

          <div className="w-full md:w-[198px] lg:w-full bg-[#000000] text-start p-4 md:p-6 rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none flex flex-col justify-center md:rounded-r-lg md:rounded-bl-none">
            <div className="flex flex-col gap-2">
              <h4 className="font-normal text-sm text-[#FFFFFF50]">
                GRAND TOTAL
              </h4>
              <h3 className="font-bold text-base md:text-[18px] text-[#FFFFFF]">
                $ {orderSummary.grandTotal.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        <button
          className="bg-[#D87D4A] font-bold text-[13px] tracking-[1px] uppercase w-full py-3 text-[#FFFFFF] cursor-pointer hover:bg-[#FBAF85] mt-2 md:mt-4"
          onClick={handleClose}
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
