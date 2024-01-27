// ChangeAccent.jsx
import React from "react";
import KurdistanFlag from "../assets/images/kurdish.png";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

const ChangeAccent = ({
  showChangeAccent,
  setShowChangeAccent,
  currentAccent,
  changeAccent,
}) => {
  const { t, i18n } = useTranslation();
  const { setApplicationAccent } = useTheme();

  const handleClick = (newAccent) => {
    changeAccent(newAccent);
    setApplicationAccent(newAccent);
    i18n.changeLanguage(newAccent);
    setShowChangeAccent(false);
  };

  return (
    <div
      className={`${currentAccent} absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white w-[400px] h-[200px] rounded-lg flex flex-col justify-center items-center gap-4`}
    >
      <div className="flex justify-between items-center w-full p-2 border-b border-b-[#C5C5C5]/15">
        <a href=""></a>
        <h3 className="text-lg">{t("Change Accent")}</h3>
        <button
          onClick={() => setShowChangeAccent(!showChangeAccent)}
          className="active:scale-95 hover:text-red-500"
        >
          <span className="material-icons">close</span>
        </button>
      </div>

      <button
        className="flex flex-row-reverse border-b border-b-[#C5C5C5]/15 w-full gap-1 justify-center items-center p-1 active:scale-95"
        onClick={() => handleClick("sorani")}
      >
        <img
          src={KurdistanFlag}
          className="w-[35px] h-[35px] object-cover rounded-full"
          alt=""
        />
        <p>{t("زاراوەی سۆرانی")}</p>
      </button>

      <button
        className="flex flex-row-reverse gap-1 justify-center items-center mr-0 ml-auto p-1 w-full active:scale-95"
        onClick={() => handleClick("badini")}
      >
        <img
          src={KurdistanFlag}
          className="w-[35px] h-[35px] object-cover rounded-full"
          alt=""
        />
        <p>{t("زاراوەی بادینی")}</p>
      </button>
    </div>
  );
};

export default ChangeAccent;
