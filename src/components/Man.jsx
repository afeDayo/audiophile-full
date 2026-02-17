import React from "react";
import bigMan from "../assets/BitmapMan.png";
import bigManphone from "../assets/MAN PHONE.png";
import bitmantab from "../assets/BitmapMANtab.png";

const Man = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 lg:px-[11.458333vw] mb-26 md:mb-20 lg:mb-[133px] mt-26 md:mt-20 lg:mt-40 gap-4 md:gap-4 lg:gap-34">
      <div className="w-full lg:w-[45%] xl:w-[445px] text-center lg:text-start flex flex-col gap-4 md:gap-8">
        <h2 className="text-[#000000] font-bold text-[28px] md:text-[40px] lg:text-[32px] xl:text-[40px] tracking-[1px] md:tracking-[1.43px] uppercase leading-10 md:leading-11 px-6 md:px-12 lg:px-0">
          Bringing you the <span className="text-[#D87D4A]">best</span> audio
          gear
        </h2>
        <p className="font-normal text-[15px] leading-relaxed text-[#00000050] md:px-15 lg:px-0">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className="hidden md:hidden lg:flex">
        <img
          src={bigMan}
          alt="Man enjoying audio gear"
          className="rounded-lg"
        />
      </div>
      <div className="md:hidden lg:hidden">
        <img
          src={bigManphone}
          alt="Man enjoying audio gear"
          className="rounded-lg"
        />
      </div>
      <div className="hidden md:flex lg:hidden">
        <img
          src={bitmantab}
          alt="Man enjoying audio gear"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Man;
