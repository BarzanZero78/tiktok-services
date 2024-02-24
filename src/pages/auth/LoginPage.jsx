import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import GoogleIcon from "../../assets/icons/google.png";
import FacebookIcon from "../../assets/icons/facebook.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  connectAuthEmulator,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, db } from "../../firebase/FirebaseConfig";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const LoginPage = () => {
  const countryCode = "+964";
  const [userPhoneNumber, setUserPhoneNumber] = useState(countryCode);
  const [otp, setOTP] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const { googleSignIn, facebookSignIn } = useAuth();
  const navigate = useNavigate();
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  useEffect(() => {
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (response) => {},
      expiredCallback: () => {},
    });

    setRecaptchaVerifier(verifier);

    return () => verifier.clear();
  }, []);

  const handleRequestOTP = async () => {
    try {
      const userRef = doc(db, "users", userPhoneNumber);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        if (userPhoneNumber.length >= 10) {
          setExpandForm(true);
          const appVerifier = recaptchaVerifier;

          const confirmationResult = await signInWithPhoneNumber(
            auth,
            userPhoneNumber,
            appVerifier
          );
          window.confirmationResult = confirmationResult;
        } else {
          console.log("دەبێت ژمارەی مۆبایل 10 ژمارە بێت");
        }
      } else {
        alert("ئەم بەکارهێنەرە بوونی نییە");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const hanldeLogin = async () => {
    try {
      if (otp.length === 6) {
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(otp).then(async () => {
          await updateDoc(doc(db, "users", userPhoneNumber), {
            lastLogin: new Date(),
          });
        });
        // Navigate user to home page
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const hanldeGoogleSignIn = async () => {
    await googleSignIn();
    navigate("/");
  };

  const hanldeFacebookSignIn = async () => {
    await facebookSignIn();
    navigate("/");
  };

  return (
    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-5 w-[350px] h-[425px] border border-[#C5C5C5]/50 rounded-lg text-white">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl">لۆگۆ</h2>
        <h3 className="text-lg">بەخێربێیتەوە</h3>
        <p>بۆ بەردەوام بوون پێویستە بچیتە ژوورەوە</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <>
          <input
            type="text"
            placeholder="ژمارەی مۆبایل"
            value={userPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
            className="w-[300px] border border-[#C5C5C5]/50 rounded-lg p-2 bg-[#24232a] focus:outline-none"
          />
          {expandForm === true ? (
            <>
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="w-[300px] border border-[#C5C5C5]/50 rounded-lg p-2 bg-[#24232a] focus:outline-none"
              />
              <button
                onClick={hanldeLogin}
                className="w-[300px] p-2 bg-[#212121] rounded-lg active:scale-95"
              >
                چوونەژوورەوە
              </button>
            </>
          ) : (
            <button
              onClick={handleRequestOTP}
              className="w-[300px] p-2 bg-[#212121] rounded-lg active:scale-95"
            >
              داواکردنی کۆد
            </button>
          )}
          <div id="recaptcha-container"></div>
        </>

        <div className="flex justify-around items-center w-full">
          <span className="flex justify-center items-center w-[90px] h-1 bg-[#C5C5C5]/50"></span>
          <span>یان</span>
          <span className="flex justify-center items-center w-[90px] h-1 bg-[#C5C5C5]/50"></span>
        </div>

        <div className="flex justify-center items-center gap-10">
          <button
            onClick={() => hanldeGoogleSignIn()}
            className="border border-[#C5C5C5]/50 rounded-md p-1 active:scale-95"
          >
            <img src={GoogleIcon} alt="" className="w-6 h-6" />
          </button>

          <button
            onClick={() => hanldeFacebookSignIn()}
            className="border border-[#C5C5C5]/50 rounded-md p-1 active:scale-95"
          >
            <img src={FacebookIcon} alt="" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <p className="text-sm">
        هەژمارت نییە؟{" "}
        <Link
          to="/signup"
          className="text-blue-500 hover:text-blue-600 transition transform ease-in-out duration-100"
        >
          خۆتۆمارکردن
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
