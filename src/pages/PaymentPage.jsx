import React from "react";
import FastPayIcon from "../assets/icons/fastpay.png";
import KorekIcon from "../assets/icons/korek.png";
import { Helmet } from "react-helmet";

const PaymentPage = () => {
  return (
    <div className="text-white flex flex-col justify-center items-center pt-[80px] p-5">

      <Helmet>
        <title>TikTok Services | پارەدان</title>
      </Helmet>

      <div className="flex flex-col justify-center items-center py-2">
        <h3 className="text-2xl">پارەدان</h3>
      </div>

      <div className="bg-[#212121]/80 w-[95%] rounded-lg p-3 flex flex-col justify-center items-center gap-10">
        <p className="text-center">
          بەڕێز کاتێک داوای خزمەتگوزاریەک دەکەیت سەرەتا ئەبێت پارە بنێری بۆ ئەم
          ژمارانەی خوارەوە بۆ ئەوەی هەژمارەکەت چالاک بکرێت و داواکاریەکەت
          بەسەرکەوتووی جێبەجێ بکرێت
        </p>

        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-row-reverse justify-center items-center gap-1">
            <p>
              پارەدان بە ڕێگای باڵانسی{" "}
              <span className="text-[#ED1069]">فاستپەی</span>
            </p>
            <img src={FastPayIcon} className="w-7 h-7 object-cover" alt="" />
          </div>

          <a
            href="tel:07518980248"
            className="flex flex-row-reverse justify-center items-center gap-1 bg-[#1b1b1b] rounded-full py-1 px-2 active:scale-95"
          >
            <p className="">07518980248</p>
            <span className="material-icons">call</span>
          </a>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-row-reverse justify-center items-center gap-1">
            <p>
              پارەدان بە ڕێگای باڵانسی{" "}
              <span className="text-[#0985F9]">کۆڕەک</span>
            </p>
            <img src={KorekIcon} className="w-7 h-7 object-cover" alt="" />
          </div>

          <a
            href="tel:07518980248"
            className="flex flex-row-reverse justify-center items-center gap-1 bg-[#1b1b1b] rounded-full py-1 px-2 active:scale-95"
          >
            <p className="">07518980248</p>
            <span className="material-icons">call</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
