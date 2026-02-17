import React, { useState } from "react";
import heroimg from "../assets/Bitmap2.jpg";
import { PiShoppingCartBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import logo from "../assets/audiophile 2.png";
import { useStore } from "../context/StoreContext";
import { HiMenu, HiX } from "react-icons/hi";
import heroimgmob from "../assets/MOBILE HERO.png";
import headgear from "../assets/headgear.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import speakerone from "../assets/speaker1.png";
import earpeez from "../assets/earpeez.png";

const HeroSection = () => {
  const { setIsCartOpen, cart, products } = useStore();
  const markIIProduct = products.find(
    (product) => product.name === "XX99 Mark II Headphones",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#141414] md:overflow-hidden">
      <div className="md:px-10 lg:px-12 xl:px-[11.458333vw] pt-4 md:pt-8 w-full relative z-20">
        <div className="flex items-center lg:justify-between pb-8 pt-3 md:pb-9 lg:gap-4">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="Audiophile"
              className="min-w-[143px] hidden lg:flex"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center ml-8 md:ml-12 lg:ml-[197px] gap-4 md:gap-8 lg:gap-[32.5px]">
            <Link
              to="/"
              className="cursor-pointer hover:text-[#D87D4A] text-[13px] font-bold text-[#FFFFFF] tracking-[2px]"
            >
              HOME
            </Link>
            <Link
              to="/headphones"
              className="cursor-pointer hover:text-[#D87D4A] text-[13px] font-bold text-[#FFFFFF] tracking-[2px]"
            >
              HEADPHONES
            </Link>
            <Link
              to="/speakers"
              className="cursor-pointer hover:text-[#D87D4A] text-[13px] font-bold text-[#FFFFFF] tracking-[2px]"
            >
              SPEAKERS
            </Link>
            <Link
              to="/earphones"
              className="cursor-pointer hover:text-[#D87D4A] text-[13px] font-bold text-[#FFFFFF] tracking-[2px]"
            >
              EARPHONES
            </Link>
          </div>

          <div className="flex items-center justify-between w-full px-6 md:px-10 lg:hidden">
            <div className="lg:hidden flex items-center md:ps-0 md:gap-10 w-full justify-between">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-white text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <HiX /> : <HiMenu />}
              </button>

              {/* Logo */}
              <Link to="/">
                <img
                  src={logo}
                  alt="Audiophile"
                  className="min-w-[143px] lg:hidden"
                />
              </Link>
            </div>

            {/* Cart Icon */}
            <div className="relative ms-[24%] lg:ms-0 md:ms-[68%] lg:hidden">
              <PiShoppingCartBold
                className="text-[20px] text-[#FFFFFF] cursor-pointer hover:text-[#D87D4A]"
                onClick={() => setIsCartOpen(true)}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
          {/* Cart Icon */}
          <div className="relative ms-[24%] lg:ms-0 md:ms-[68%] hidden lg:flex">
            <PiShoppingCartBold
              className="text-[20px] text-[#FFFFFF] cursor-pointer hover:text-[#D87D4A]"
              onClick={() => setIsCartOpen(true)}
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="py-[31px] px-6 w-full md:px-10 absolute top-21 z-10 left-0 bg-[#F2E3BB] rounded-b-lg animate-slideDown lg:hidden">
            <div className="flex flex-col items-center justify-between gap-6 md:gap-4 pt-12 md:flex-row">
              <Link
                to="/headphones"
                className="w-full bg-[#F1F1F1] relative h-[165px] md:h-[165px] rounded-lg pt-[90px] md:pt-[85px] group cursor-pointer md:mt-12"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="absolute top-[-30%] md:top-[-38%] left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] flex justify-center">
                  <div className="relative">
                    <img
                      src={headgear}
                      alt="headgear"
                      className="z-10 w-20 md:w-none"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 md:w-[120px] h-[15px] md:h-[25px] rounded-full bg-black blur-[20px] md:blur-[30px]"></div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <h4 className="text-[15px] md:text-[18px] font-bold tracking-[1px] text-[#000000]">
                    HEADPHONES
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold tracking-[0.5px] uppercase text-[#00000050] group-hover:text-[#D87D4A]">
                      Shop
                    </p>
                    <MdKeyboardArrowRight className="text-lg md:text-[22px] text-[#D87D4A]" />
                  </div>
                </div>
              </Link>

              <Link
                to="/speakers"
                className="w-full bg-[#F1F1F1] relative h-[165px] md:h-[165px] rounded-lg pt-[90px] md:pt-[85px] group cursor-pointer mt-12"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="absolute top-[-28%] md:top-[-34%] left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] flex justify-center">
                  <div className="relative">
                    <img
                      src={speakerone}
                      alt="speaker"
                      className="z-10 w-[84px] md:w-none"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 md:w-[120px] h-[15px] md:h-[25px] rounded-full bg-black blur-[20px] md:blur-[30px]"></div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <h4 className="text-[15px] md:text-[18px] font-bold tracking-[1px] text-[#000000]">
                    SPEAKERS
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold tracking-[0.5px] uppercase text-[#00000050] group-hover:text-[#D87D4A]">
                      Shop
                    </p>
                    <MdKeyboardArrowRight className="text-lg md:text-[22px] text-[#D87D4A]" />
                  </div>
                </div>
              </Link>

              <Link
                to="/earphones"
                className="w-full bg-[#F1F1F1] relative h-[165px] md:h-[165px] rounded-lg pt-[90px] md:pt-[85px] group cursor-pointer mt-12"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="absolute top-[-24%] md:top-[-28%] left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] flex justify-center">
                  <div className="relative">
                    <img
                      src={earpeez}
                      alt="earphones"
                      className="z-10 w-[103px] md:w-none"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 md:w-[120px] h-[15px] md:h-[25px] rounded-full bg-black blur-[20px] md:blur-[30px]"></div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <h4 className="text-[15px] md:text-[18px] font-bold tracking-[1px] text-[#000000]">
                    EARPHONES
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold tracking-[0.5px] uppercase text-[#00000050] group-hover:text-[#D87D4A]">
                      Shop
                    </p>
                    <MdKeyboardArrowRight className="text-lg md:text-[22px] text-[#D87D4A]" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        <hr className="text-[#FFFFFF] w-full" />
      </div>
      <div className="flex flex-col lg:flex-row items-center relative px-6 md:px-8 lg:px-12 xl:px-[11.458333vw]">
        <div className="mt-30 md:mt-28 lg:mt-[132px] mb-26 md:mb-36 lg:mb-[157px] text-center lg:text-start w-full lg:w-[45%] xl:w-[398px] flex flex-col gap-6 md:gap-6 lg:gap-[37px] relative z-4 md:w-[379px]">
          <h4 className="font-normal text-[14px] md:text-[14px] tracking-[8px] uppercase text-[#FFFFFF50]">
            NEW PRODUCT
          </h4>
          <h1 className="font-bold text-[36px] md:text-[56px] md:text-4xl lg:text-5xl xl:text-[56px] leading-10 md:leading-[58px] tracking-[0.5px] md:tracking-[2px] uppercase text-[#FFFFFF]">
            XX99 Mark II Headphones
          </h1>
          <p className="font-medium text-[15px] px-6 md:px-1 lg:px-0 lg:pe-10 leading-relaxed text-[#FFFFFF75]">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link to={markIIProduct ? `/product/${markIIProduct._id}` : "#"}>
            <button className="w-40 h-12 bg-[#D87D4A] font-bold text-[13px] tracking-[1px] uppercase text-[#FFFFFF] cursor-pointer hover:bg-[#FBAF85] md:mt-3">
              See Product
            </button>
          </Link>
        </div>
        <div className="hidden lg:flex md:flex w-full lg:w-[55%] relative lg:absolute lg:top-[-95px] lg:left-[50%] xl:left-[609.6px] z-0 mt-8 lg:mt-0 md:top-[-150px] md:absolute">
          <img
            src={heroimg}
            alt="Hero Headphones"
            className="max-w-[500px] lg:max-w-none mx-auto lg:mx-0 z-0"
          />
        </div>

        <div className="lg:hidden md:hidden absolute -top-18">
          <img src={heroimgmob} alt="Hero Headphones" className="z-0" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
