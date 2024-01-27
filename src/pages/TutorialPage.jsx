import React from "react";
import { Helmet } from "react-helmet";

const TutorialPage = () => {
  return (
    <div className="pt-[80px] flex flex-col justify-center items-center gap-5 text-white">
      <Helmet>
        <title>TikTok Services | مەرجەکان</title>
      </Helmet>

      <div>
        <h3 className="text-2xl">مەرجەکان</h3>
      </div>

      <div className="text-right p-3 bg-[#212121]/80 rounded-lg w-[90%]">
        <p>
          گرینگە پێش داوا کردنی هەر داواکاریەک ئەم خالانە جێ بەجێ بکەیت
          <br />
          <br />
          ١- هەمو هەژمارەکان دەبێت گشتی بن نەک تایبەت واتا نابێت ئەکاونتەکان
          (پریڤەیت ) قوفل بێت ئەبێت ( پەبلیک ) کراوە بێت
          <br />
          <br />
          ٢- پێش ئەوەی داواکاریەکە ئەنجام بدەی دلنیاببەوە چونکە هەلوەشاندنەوەی
          داواکاری نیە
          <br />
          <br />
          ٣- پێش ئەوەی داواکاری دوەم بنێری بۆ هەمان هەژمار بوەستە تا داواکاری
          یەکەم کۆتای پێ دێت ئەوکات داوا کاری دوەم بکە بۆ هەمان هەژمار
          <br /> <br />
          ٤- هەمو داواکاریەکان لە ماوەی ٢٤ کاژتژمێردا تەواودەبن پێویست ناکات
          ئادمین بێزار بکەیت لە کاتی دوا کەوتن &lrm;
        </p>
      </div>

    </div>
  );
};

export default TutorialPage;
