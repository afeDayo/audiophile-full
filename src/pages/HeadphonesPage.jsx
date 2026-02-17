import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import headgear from "../assets/headgear.png";
import speakerone from "../assets/speaker1.png";
import earpeez from "../assets/earpeez.png";
import Man from "../components/Man";
import { useStore } from "../context/StoreContext";
import Cart from "../components/Cart";
import RollerLoader from "../components/RollerLoader";

const HeadphonesPage = () => {
  const { getProductsByCategory, loading } = useStore();
  const headphones = getProductsByCategory("headphones");

  if (loading) {
    return <RollerLoader />;
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#000000] pt-8 md:pt-[99px] pb-8 md:pb-[97px] text-center relative z-4">
        <h2 className="text-[28px] md:text-4xl lg:text-[40px] leading-tight md:leading-11 tracking-[0.5px] md:tracking-[1.43px] text-[#FFFFFF] font-bold">
          HEADPHONES
        </h2>
      </div>

      {/* Products List */}
      {headphones.map((product, index) => (
        <div
          key={product._id}
          className={`flex flex-col ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center justify-between px-6 md:px-10 lg:px-[11.458333vw] mt-16 md:mt-20 lg:mt-40 gap-8 md:gap-12 mb-26 lg:gap-30`}
        >
          {/* Product Image */}
          <div className="w-full lg:w-[54%] bg-[#F1F1F1] rounded-lg h-[352px] md:h-[450px] lg:h-[560px] flex items-center justify-center relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-[170px] md:w-[220px] object-contain lg:w-[349.24px]"
            />
            <div className="absolute bottom-6 md:bottom-20 left-1/2 -translate-x-1/2 w-[120px] md:w-[200px] h-2 md:h-[15px] rounded-full bg-black blur-xl md:blur-2xl"></div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[45%] text-center lg:text-start flex flex-col gap-4 md:gap-[29px]">
            {product.isNew && (
              <h4 className="font-normal text-xs md:text-[14px] tracking-[8px] uppercase text-[#D87D4A]">
                NEW PRODUCT
              </h4>
            )}
            <h1 className="font-bold text-[28px] md:text-[40px] md:px-40 lg:px-0 lg:text-4xl xl:text-[40px] leading-tight md:leading-11 tracking-[0.5px] md:tracking-[2px] uppercase text-[#000000] px-7">
              {product.name}
            </h1>
            <p className="font-normal text-[15px] leading-relaxed text-[#00000050] md:px-16 lg:px-0">
              {product.description}
            </p>
            <Link to={`/product/${product._id}`}>
              <button className="w-40 h-12 bg-[#D87D4A] font-bold text-[13px] tracking-[1px] uppercase text-[#FFFFFF] cursor-pointer hover:bg-[#FBAF85] mt-2">
                See Product
              </button>
            </Link>
          </div>
        </div>
      ))}

      {/* Category Navigation */}
      <div className="mt-12 md:mt-20 lg:mt-32 xl:mt-[180px] px-6 md:px-10 lg:px-[11.458333vw]">
        <div className="flex flex-col items-center justify-between gap-6 md:gap-4 lg:gap-8 pt-12 md:flex-row">
          <Link
            to="/headphones"
            className="w-full lg:w-[30%] xl:w-[350px] bg-[#F1F1F1] relative h-[165px] lg:h-[204px] md:h-[165px] rounded-lg pt-[90px] md:pt-[85px] lg:pt-[120px] group cursor-pointer md:mt-12"
          >
            <div className="absolute top-[-30%] md:top-[-38%] left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] flex justify-center">
              <div className="relative">
                <img
                  src={headgear}
                  alt="headgear"
                  className="z-10 w-20 md:w-none lg:w-[122.95px]"
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
            className="w-full lg:w-[30%] xl:w-[350px] bg-[#F1F1F1] lg:h-[204px] lg:pt-[120px] relative h-[165px] md:h-[165px] rounded-lg pt-[90px] md:pt-[85px] group cursor-pointer mt-12"
          >
            <div className="absolute top-[-28%] md:top-[-34%] left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] flex justify-center">
              <div className="relative">
                <img
                  src={speakerone}
                  alt="speaker"
                  className="z-10 w-[84px] md:w-none lg:w-[121.49px]"
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
            className="w-full lg:w-[30%] xl:w-[350px] bg-[#F1F1F1] relative h-[165px] md:h-[165px] rounded-lg pt-[90px] md:pt-[85px] group cursor-pointer mt-12 lg:h-[204px] lg:pt-[120px]"
          >
            <div className="absolute top-[-24%] md:top-[-28%] left-1/2 -translate-x-1/2 w-[60%] md:w-[40%] flex justify-center">
              <div className="relative">
                <img
                  src={earpeez}
                  alt="earphones"
                  className="z-10 w-[103px] md:w-none lg:w-[125px]"
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

      <Man />
      <Cart />
    </div>
  );
};

export default HeadphonesPage;
