import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import headgear from "../assets/headgear.png";
import speakerone from "../assets/speaker1.png";
import earpeez from "../assets/earpeez.png";
import bigspeaker from "../assets/image-removebg-preview(380).png";
import lapspeaker from "../assets/bigspeaker.png";
import Sbackground from "../assets/Group 4.png";
import Sback from "../assets/Sback.png";
import Sbacktab from "../assets/speaker homepage tab.png";
import bitmapbkphone from "../assets/Bitmap phone.png";
import tabbitmap from "../assets/tab zx7.png";
import lapbit from "../assets/BitmapMAIN.png";
import bitmaEAR from "../assets/BitmapEAR.png";
import bitmaeartab from "../assets/bitmaEARTAB.png";
import Man from "../components/Man";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import RollerLoader from "../components/RollerLoader";

const HomePage = () => {
  const { getProductsByCategory, loading, products } = useStore();

  useEffect(() => {
    console.log("Products loaded:", products.length);
  }, [products]);

  if (loading) {
    return <RollerLoader />;
  }

  const headphones = getProductsByCategory("headphones");
  const speakers = getProductsByCategory("speakers");
  const earphones = getProductsByCategory("earphones");

  const zx9Speaker = speakers.find((speaker) => speaker.name === "ZX9 Speaker");
  const zx7Speaker = speakers.find((speaker) => speaker.name === "ZX7 Speaker");
  const yx1Earphones = earphones.find(
    (earphone) => earphone.name === "YX1 Wireless Earphones",
  );

  return (
    <div className="bg-[#FAFAFA] relative z-4">
      <HeroSection />

      {/* Category Navigation */}
      <div className="mt-12 md:mt-20 lg:mt-32 xl:mt-[180px] px-6 md:px-10 lg:px-12 xl:px-[11.458333vw]">
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

      {/* ZX9 Speaker Section */}
      {zx9Speaker && (
        <div className="mt-26 md:mt-20 lg:mt-32 xl:mt-40 px-6 md:px-10 lg:px-12 xl:px-[11.458333vw]">
          <div className="bg-[#D87D4A] flex flex-col lg:flex-row items-center lg:items-start px-6 md:px-12 lg:px-[117.49px] pt-8 md:pt-10 lg:pt-24 gap-6 md:gap-12 lg:gap-35 rounded-lg relative overflow-hidden">
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-start mt-4">
              <img
                src={bigspeaker}
                alt="ZX9 Speaker"
                className="relative z-20 w-[172.25px] md:w-[197.21px] lg:hidden"
              />

              <img
                src={lapspeaker}
                alt=""
                className="hidden md:hidden lg:flex z-20"
              />
            </div>
            <div className="w-full lg:w-[50%] flex text-center lg:text-start flex-col items-center lg:items-start gap-6 md:gap-8 max-w-[349px] mx-auto lg:mx-0 lg:mt-10 z-20 mt-4">
              <h2 className="font-bold text-[36px] md:text-[56px] lg:text-[56px] leading-10 md:leading-[58px] tracking-[1.29px] md:tracking-[2px] uppercase text-[#FFFFFF] px-8 lg:px-0">
                {zx9Speaker.name}
              </h2>
              <p className="font-normal text-[15px] leading-relaxed text-[#FFFFFF75]">
                {/* {zx9Speaker.description} */}
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Link to={`/product/${zx9Speaker._id}`}>
                <button className="w-40 h-12 bg-[#000000] font-bold text-[13px] tracking-[1px] uppercase text-[#FFFFFF] hover:bg-[#4C4C4C] cursor-pointer mb-14 mt-2">
                  See Product
                </button>
              </Link>
            </div>
            <img
              src={Sbackground}
              alt=""
              className="absolute top-0 left-0 z-0 hidden md:hidden lg:flex"
            />
            <img
              src={Sbacktab}
              alt=""
              className="absolute top-0 left-0 z-0 hidden md:flex lg:hidden"
            />
            <img
              src={Sback}
              alt=""
              className="absolute top-0 left-0 z-0 md:hidden lg:hidden"
            />
          </div>
        </div>
      )}

      {/* ZX7 Speaker Section */}
      {zx7Speaker && (
        <div className="mt-6 md:mt-10 lg:mt-20 xl:mt-12 px-6 md:px-10 lg:px-[11.458333vw] lg:w-full">
          <div className="bg-cover bg-center bg-no-repeat flex items-center rounded-lg min-h-80 md:min-h-80 relative lg:w-full">
            <img
              src={bitmapbkphone}
              alt=""
              className="md:hidden lg:hidden rounded-lg w-full"
            />
            <img
              src={tabbitmap}
              alt=""
              className="hidden md:flex lg:hidden rounded-lg"
            />
            <img
              src={lapbit}
              alt=""
              className="hidden md:hidden lg:flex rounded-lg"
            />
            <div className="ml-6 md:ml-[62px] lg:ml-[95px] flex flex-col items-start gap-8 md:gap-7 absolute">
              <h2 className="text-[#000000] font-bold text-[28px] md:text-[28px] tracking-[0.5px] md:tracking-[2px] uppercase">
                {zx7Speaker.name}
              </h2>
              <Link to={`/product/${zx7Speaker._id}`}>
                <button className="border border-[#000000] w-40 h-12 font-bold text-[13px] tracking-[1px] uppercase text-[#000000] cursor-pointer hover:bg-[#000000] hover:text-[#FFFFFF]">
                  See Product
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* YX1 Earphones Section */}
      {yx1Earphones && (
        <div className="mt-6 md:mt-10 lg:mt-20 xl:mt-12 px-6 md:px-10 lg:px-[11.458333vw] lg:w-full">
          <div className="flex flex-col lg:flex-row md:grid md:grid-cols-2 items-center justify-between gap-6 md:gap-3">
            <Link to={`/product/${yx1Earphones._id}`}>
              <img
                src={bitmaEAR}
                alt="YX1 Earphones"
                className="md:hidden lg:flex"
              />
              <img
                src={bitmaeartab}
                alt=""
                className="hidden md:flex lg:hidden"
              />
            </Link>
            <div className="w-full h-[200px] md:h-80 bg-[#F1F1F1] rounded-lg flex items-center lg:h-80">
              <div className="ml-6 md:ml-8 lg:ml-[95px] flex flex-col items-start gap-8 md:gap-7">
                <h2 className="text-[#000000] font-bold text-[28px] md:text-[28px] tracking-[0.5px] md:tracking-[2px] uppercase">
                  {/* {yx1Earphones.name} */}
                  YX1 EARPHONES
                </h2>
                <Link to={`/product/${yx1Earphones._id}`}>
                  <button className="border border-[#000000] w-40  h-12 font-bold text-[13px] tracking-[1px] uppercase text-[#000000] cursor-pointer hover:bg-[#000000] hover:text-[#FFFFFF]">
                    See Product
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Man />
      <Cart />
      <Footer />
    </div>
  );
};

export default HomePage;
