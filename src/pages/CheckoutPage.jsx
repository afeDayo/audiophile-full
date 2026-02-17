import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import ThankYou from "../components/ThankYou";
import axios from "axios";
import Cart from "../components/Cart";
import { MdOutlinePayments } from "react-icons/md";

const CheckoutPage = () => {
  const {
    cart,
    calculateTotals,
    clearCart,
    setOrderData,
    setIsThankYouOpen,
    isThankYouOpen,
    orderData,
  } = useStore();
  const navigate = useNavigate();
  const totals = calculateTotals();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "e-Money",
    eMoneyNumber: "",
    eMoneyPIN: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    if (formData.paymentMethod === "e-Money") {
      if (!formData.eMoneyNumber.trim())
        newErrors.eMoneyNumber = "e-Money number is required";
      if (!formData.eMoneyPIN.trim())
        newErrors.eMoneyPIN = "e-Money PIN is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customerInfo: formData,
        cartItems: cart,
        orderSummary: totals,
      };

      console.log("Sending order data:", orderData);

      const response = await axios.post(
        "https://audiophile-server-eioh.onrender.com/api/orders",
        orderData,
      );

      console.log("Order created successfully:", response.data);

      // Set order data and open thank you modal
      setOrderData(response.data);
      setIsThankYouOpen(true);
      clearCart();

      console.log("Modal should now be visible. isThankYouOpen:", true);
      console.log("orderData is set:", response.data);
    } catch (error) {
      console.error("Order error details:", error);

      // More detailed error message
      if (error.response) {
        // Server responded with error status
        console.error("Server response error:", error.response.data);
        alert(`Order failed: ${error.response.data.message || "Server error"}`);
      } else if (error.request) {
        // No response received
        console.error("No response received:", error.request);
        alert(
          "Order failed: No response from server. Please check your connection.",
        );
      } else {
        // Other errors
        console.error("Error:", error.message);
        alert(`Order failed: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
      eMoneyNumber: "",
      eMoneyPIN: "",
    }));
  };

  // Check if cart is empty and no thank you modal is showing
  if (cart.length === 0 && !isThankYouOpen) {
    return (
      <div className="pt-16 md:pt-[79px] bg-[#F1F1F1] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
          <Link
            to="/"
            className="bg-[#D87D4A] text-white px-6 py-3 rounded hover:bg-[#FBAF85]"
          >
            Continue Shopping
          </Link>
        </div>
        {/* Still include ThankYou in case it needs to show */}
        <ThankYou />
        <Cart />
      </div>
    );
  }

  return (
    <div className="pt-4 md:pt-[79px] bg-[#F1F1F1] pb-8 md:pb-[113px] min-h-screen">
      {/* Always include ThankYou - it will control its own visibility */}
      <ThankYou />

      {/* Only show checkout form if thank you modal is NOT open */}
      {!isThankYouOpen && (
        <>
          <div className="text-start pb-8 md:pb-14 px-6 md:px-10 lg:px-12 xl:px-[11.458333vw]">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="font-normal text-sm text-[#00000050] hover:text-[#D87D4A]"
            >
              Go Back
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row items-start justify-between px-6 md:px-10 lg:px-12 xl:px-[11.458333vw] gap-8 md:gap-12 lg:gap-8"
          >
            {/* Checkout Form */}
            <div className="w-full lg:w-[65%] xl:w-[730px] p-6 md:p-12 bg-[#FFFFFF] rounded-lg text-start flex flex-col gap-6 md:gap-10">
              <h3 className="font-bold text-xl md:text-3xl lg:text-[32px] text-[#000000] tracking-[0.5px] md:tracking-[1.14px]">
                CHECKOUT
              </h3>

              {/* Billing Details Section */}
              <div className="w-full flex flex-col gap-4">
                <h4 className="font-bold text-xs text-[#D87D4A] tracking-[0.5px] uppercase">
                  Billing Details
                </h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Name Field */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full flex items-center justify-between">
                      <label className="font-bold text-xs text-[#000000]">
                        Name
                      </label>
                      {errors.name && (
                        <span className="text-red-500 text-xs">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Alexei Ward"
                      className={`border rounded-lg px-4 py-3 text-sm font-medium w-full caret-[#D87D4A] focus:outline-none focus:border-[#D87D4A] cursor-pointer ${
                        errors.name ? "border-red-500" : "border-[#CFCFCF]"
                      }`}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full flex items-center justify-between">
                      <label className="font-bold text-xs text-[#000000]">
                        Email Address
                      </label>
                      {errors.email && (
                        <span className="text-red-500 text-xs">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alexei@mail.com"
                      className={`border rounded-lg px-4 py-3 text-sm font-medium w-full caret-[#D87D4A] focus:outline-none focus:border-[#D87D4A] cursor-pointer ${
                        errors.email ? "border-red-500" : "border-[#CFCFCF]"
                      }`}
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full flex items-center justify-between">
                      <label className="font-bold text-xs text-[#000000]">
                        Phone Number
                      </label>
                      {errors.phone && (
                        <span className="text-red-500 text-xs">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 812 437 4721"
                      className={`border rounded-lg px-4 py-3 text-sm font-medium w-full caret-[#D87D4A] focus:outline-none focus:border-[#D87D4A] cursor-pointer ${
                        errors.phone ? "border-red-500" : "border-[#CFCFCF]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info Section */}
              <div className="w-full flex flex-col gap-4">
                <h4 className="font-bold text-xs text-[#D87D4A] tracking-[0.5px] uppercase">
                  shipping info
                </h4>

                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full flex items-center justify-between">
                    <label className="font-bold text-xs text-[#000000]">
                      Address
                    </label>
                    {errors.address && (
                      <span className="text-red-500 text-xs">
                        {errors.address}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="1137 Williams Avenue"
                    className={`border rounded-lg px-4 py-3 text-sm font-medium w-full caret-[#D87D4A] focus:outline-none focus:border-[#D87D4A] cursor-pointer ${
                      errors.address ? "border-red-500" : "border-[#CFCFCF]"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* ZIP Code Field */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full flex items-center justify-between">
                      <label className="font-bold text-xs text-[#000000]">
                        ZIP Code
                      </label>
                      {errors.zipCode && (
                        <span className="text-red-500 text-xs">
                          {errors.zipCode}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className={`border rounded-lg px-4 py-3 text-sm font-medium w-full caret-[#D87D4A] focus:outline-none focus:border-[#D87D4A] cursor-pointer ${
                        errors.zipCode ? "border-red-500" : "border-[#CFCFCF]"
                      }`}
                    />
                  </div>

                  {/* City Field */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full flex items-center justify-between">
                      <label className="font-bold text-xs text-[#000000]">
                        City
                      </label>
                      {errors.city && (
                        <span className="text-red-500 text-xs">
                          {errors.city}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className={`border rounded-lg px-4 py-3 text-sm  font-medium w-full caret-[#D87D4A] focus:outline-none focus:border-[#D87D4A] cursor-pointer ${
                        errors.city ? "border-red-500" : "border-[#CFCFCF]"
                      }`}
                    />
                  </div>

                  {/* Country Field */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="w-full flex items-center justify-between">
                      <label className="font-bold text-xs text-[#000000]">
                        Country
                      </label>
                      {errors.country && (
                        <span className="text-red-500 text-xs">
                          {errors.country}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="United States"
                      className={`border rounded-lg px-4 py-3 text-sm font-medium w-full caret-[#D87D4A] focus:outline-none focus:border-[#D87D4A] cursor-pointer ${
                        errors.country ? "border-red-500" : "border-[#CFCFCF]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details Section */}
              <div className="w-full flex flex-col gap-4">
                <h4 className="font-bold text-xs text-[#D87D4A] tracking-[0.5px] uppercase">
                  payment details
                </h4>
                <div className="flex flex-col items-start w-full gap-4 md:flex-row">
                  <label className="font-bold text-xs text-[#000000] w-full">
                    Payment Method
                  </label>

                  <div className="flex flex-col w-full gap-4">
                    <div
                      className={`flex items-center gap-4 w-full border rounded-lg px-4 py-3 hover:border-[#D87D4A] cursor-pointer ${
                        formData.paymentMethod === "e-Money"
                          ? "border-[#D87D4A]"
                          : "border-[#CFCFCF]"
                      }`}
                      onClick={() => handlePaymentMethodChange("e-Money")}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "e-Money"}
                        onChange={() => handlePaymentMethodChange("e-Money")}
                        className="cursor-pointer"
                      />
                      <p className="font-bold text-sm text-[#000000]">
                        e-Money
                      </p>
                    </div>

                    <div
                      className={`flex items-center gap-4 w-full border rounded-lg px-4 py-3 hover:border-[#D87D4A] cursor-pointer ${
                        formData.paymentMethod === "Cash on Delivery"
                          ? "border-[#D87D4A]"
                          : "border-[#CFCFCF]"
                      }`}
                      onClick={() =>
                        handlePaymentMethodChange("Cash on Delivery")
                      }
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === "Cash on Delivery"}
                        onChange={() =>
                          handlePaymentMethodChange("Cash on Delivery")
                        }
                        className="cursor-pointer"
                      />
                      <p className="font-bold text-sm text-[#000000]">
                        Cash on Delivery
                      </p>
                    </div>
                  </div>
                </div>

                {formData.paymentMethod === "e-Money" && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="w-full flex items-center justify-between">
                        <label className="font-bold text-xs text-[#000000]">
                          e-Money Number
                        </label>
                        {errors.eMoneyNumber && (
                          <span className="text-red-500 text-xs">
                            {errors.eMoneyNumber}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        name="eMoneyNumber"
                        value={formData.eMoneyNumber}
                        onChange={handleInputChange}
                        placeholder="238521993"
                        className={`border rounded-lg px-4 py-3 text-sm font-medium w-full caret-[#D87D4A] focus:outline-none focus:border-[#D87D4A] cursor-pointer ${
                          errors.eMoneyNumber
                            ? "border-red-500"
                            : "border-[#CFCFCF]"
                        }`}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="w-full flex items-center justify-between">
                        <label className="font-bold text-xs text-[#000000]">
                          e-Money PIN
                        </label>
                        {errors.eMoneyPIN && (
                          <span className="text-red-500 text-xs">
                            {errors.eMoneyPIN}
                          </span>
                        )}
                      </div>
                      <input
                        type="password"
                        name="eMoneyPIN"
                        value={formData.eMoneyPIN}
                        onChange={handleInputChange}
                        placeholder="6891"
                        className={`border rounded-lg px-4 py-3 text-sm font-medium w-full caret-[#D87D4A] focus:outline-none focus:border-[#D87D4A] cursor-pointer ${
                          errors.eMoneyPIN
                            ? "border-red-500"
                            : "border-[#CFCFCF]"
                        }`}
                      />
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "Cash on Delivery" && (
                  <div className="flex flex-col items-center gap-4 mt-2">
                    <MdOutlinePayments className="text-[#D87D4A] text-[60px] md:text-[100px]" />

                    <p className="font-normal text-sm leading-relaxed text-[#00000050]">
                      The 'Cash on Delivery' option enables you to pay in cash
                      when our delivery courier arrives at your residence. Just
                      make sure your address is correct so that your order will
                      not be cancelled.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:w-[32%] xl:w-[350px] p-4 md:p-[33px] rounded-lg bg-[#FFFFFF] flex flex-col text-start gap-4 md:gap-7 sticky top-4">
              <h3 className="font-bold text-lg md:text-[18px] text-[#000000] tracking-[1px] uppercase">
                summary
              </h3>

              <div className="flex flex-col gap-3 max-h-[30vh] overflow-y-auto lg:gap-6">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center w-full justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F1F1F1] rounded-lg flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-6 object-contain"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-20">
                        <p className="font-bold text-sm text-[#000000]">
                          {item.name.slice(0, 4)}
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

              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center w-full justify-between">
                  <p className="font-normal text-sm text-[#00000050]">TOTAL</p>
                  <p className="font-bold text-base md:text-[18px] text-[#000000] uppercase">
                    $ {totals.subtotal.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center w-full justify-between">
                  <p className="font-normal text-sm text-[#00000050]">
                    SHIPPING
                  </p>
                  <p className="font-bold text-base md:text-[18px] text-[#000000] uppercase">
                    $ {totals.shipping.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center w-full justify-between">
                  <p className="font-normal text-sm text-[#00000050]">
                    VAT (INCLUDED)
                  </p>
                  <p className="font-bold text-base md:text-[18px] text-[#000000] uppercase">
                    $ {totals.vat.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center w-full justify-between">
                <p className="font-normal text-sm text-[#00000050] uppercase">
                  GRAND TOTAL
                </p>
                <p className="font-bold text-base md:text-[18px] text-[#D87D4A] uppercase">
                  $ {totals.grandTotal.toLocaleString()}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#D87D4A] font-bold text-[13px] tracking-[1px] uppercase w-full py-3 text-[#FFFFFF] cursor-pointer hover:bg-[#FBAF85] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "PROCESSING..." : "CONTINUE & PAY"}
              </button>
            </div>
          </form>
        </>
      )}

      <Cart />
    </div>
  );
};

export default CheckoutPage;
