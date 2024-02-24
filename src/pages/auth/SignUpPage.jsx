import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { auth, db, storage } from "../../firebase/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import GoogleIcon from "../../assets/icons/google.png";
import FacebookIcon from "../../assets/icons/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const SignUpPage = () => {
  const { googleSignIn, facebookSignIn } = useAuth();
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const countryCode = "+964";
  const [userPhoneNumber, setUserPhoneNumber] = useState(countryCode);
  const [otp, setOTP] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const navigate = useNavigate();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      }
    );
  };

  const requestOTP = async () => {
    if (userPhoneNumber.length >= 12) {
      setExpandForm(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, userPhoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleUploadImage = async () => {
    try {
      const storageRef = ref(storage, `${image.name}`);
      await uploadBytes(storageRef, image);
      const userImage = await getDownloadURL(storageRef);
      return userImage;
    } catch (error) {
      console.log(error.message);
    }
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);

    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(async (result) => {
          const user = result.user;
          const usersCollection = doc(db, "users", userPhoneNumber);
          const querySnapshot = await getDoc(usersCollection);

          if (!querySnapshot.exists()) {
            let userImage = null;
            if (image) {
              userImage = await handleUploadImage();
            }
            const isAdmin = false;
            const userMoney = 0;
            const userMoneySpent = 0;
            const userAllOrders = 0;
            const userActiveOrders = 0;
            await setDoc(usersCollection, {
              isAdmin,
              userMoney,
              userMoneySpent,
              userAllOrders,
              userActiveOrders,
              userImage,
              userPhoneNumber,
              userName,
              lastLogin: new Date(),
              userId: user.uid,
            });
          }
          localStorage.setItem("UID", user.uid);
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
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
    <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-5 w-[350px] h-[500px] border border-[#C5C5C5]/50 rounded-lg text-white">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl">لۆگۆ</h2>
        <h3 className="text-lg">بەخێربێیت</h3>
        <p>هەژمارەکەت تۆماربکە</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <>
          <input
            id="user_image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
          />

          <label
            htmlFor="user_image"
            className="w-[300px] border border-[#C5C5C5]/50 rounded-lg text-right p-2 bg-[#24232a] focus:outline-none"
          >
            وێنەی هەژمارەکەت هەڵبژێرە
          </label>

          <input
            type="text"
            placeholder="ناو"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-[300px] border border-[#C5C5C5]/50 rounded-lg text-right p-2 bg-[#24232a] focus:outline-none"
          />
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
                onChange={verifyOTP}
                className="w-[300px] border border-[#C5C5C5]/50 rounded-lg p-2 bg-[#24232a] focus:outline-none"
              />
            </>
          ) : (
            <button
              onClick={requestOTP}
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
        هەژمارت هەیە؟{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-600 transition transform ease-in-out duration-100"
        >
          چوونەژوورەوە
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
