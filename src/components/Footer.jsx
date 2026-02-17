import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/audiophile 2.png";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="px-6 md:px-10 lg:px-12 xl:px-[11.458333vw] bg-[#101010] pb-6 md:pb-[60px] pt-12 md:pt-[75px] relative">
      <div className="w-[101px] h-1 bg-[#D87D4A] absolute top-0 left-[35%] right-[35%] md:left-10 lg:left-[165px]"></div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-col md:items-start lg:flex-row lg:items-center lg:w-full lg:justify-between">
        <Link to="/" className="order-1">
          <img src={logo} alt="Audiophile" className="w-32" />
        </Link>
        <div className="order-3 flex flex-col items-center justify-center w-full gap-4 my-6 md:gap-6 lg:gap-[32.5px] flex-wrap md:flex-row md:justify-start lg:justify-end">
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
      </div>
      <div className="mt-6 md:mt-4 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <p className="text-center md:text-start font-medium text-[15px] leading-relaxed text-[#FFFFFF50] w-full md:pr-4 lg:w-[540px] lg:pr-0">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we're open 7 days a week.
        </p>

        <div className="items-center gap-2.5 order-2 hidden md:hidden lg:flex">
          <AiFillFacebook className="text-[24px] text-[#FFFFFF] cursor-pointer hover:text-[#D87D4A]" />
          <AiOutlineTwitter className="text-[24px] text-[#FFFFFF] cursor-pointer hover:text-[#D87D4A]" />
          <AiOutlineInstagram className="text-[24px] text-[#FFFFFF] cursor-pointer hover:text-[#D87D4A]" />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-10 md:flex-row md:items-center md:justify-between md:mt-16">
        <div className="flex items-center gap-2.5 order-2 lg:hidden">
          <AiFillFacebook className="text-[24px] text-[#FFFFFF] cursor-pointer hover:text-[#D87D4A]" />
          <AiOutlineTwitter className="text-[24px] text-[#FFFFFF] cursor-pointer hover:text-[#D87D4A]" />
          <AiOutlineInstagram className="text-[24px] text-[#FFFFFF] cursor-pointer hover:text-[#D87D4A]" />
        </div>
        <p className="mt-8 md:mt-0 text-start font-medium text-sm leading-relaxed text-[#FFFFFF50]">
          Copyright 2021. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
