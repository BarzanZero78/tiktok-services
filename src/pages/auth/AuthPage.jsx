import React from "react";
import { useAuth } from "../../context/AuthContext";
import GoogleIcon from "../../assets/icons/google.png";
import FacebookIcon from "../../assets/icons/facebook.png";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { googleSignIn, facebookSignIn } = useAuth();
  const navigate = useNavigate();

  const hanldeGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const hanldeFacebookSignIn = async () => {
    try {
      await facebookSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-5 w-[400px] max-sm:w-[350px] h-[220px] border border-[#C5C5C5]/50 rounded-lg text-white">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl">لۆگۆ</h2>
        <h3 className="text-lg">بەخێربێیت</h3>
        <p>بۆ بەردەوام بوون پێویسە بچیتە ژوورەوە</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <button
          onClick={hanldeGoogleSignIn}
          className="w-[325px] h-10 px-2 flex justify-end items-center gap-1.5 rounded-md border border-[#C5C5C5]/50 active:scale-95"
        >
          <p>بچۆ ژوورەوە لەڕێگای گوگڵ</p>
          <img src={GoogleIcon} className="w-[26px] h-[26px]" alt="" />
        </button>

        <button
          onClick={hanldeFacebookSignIn}
          className="w-[325px] h-10 px-2 flex justify-end items-center gap-1.5 rounded-md border border-[#C5C5C5]/50 active:scale-95"
        >
          <p>بچۆ ژوورەوە لەڕێگای فەیسبووک</p>
          <img src={FacebookIcon} className="w-[26px] h-[26px]" alt="" />
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
