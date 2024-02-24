import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ChangeAccent from "../components/ChangeAccent";
import UserMoneySpent from "../components/UserMoneySpent";
import SignOutDialog from "../components/SignOutDialog";
import { useProduct } from "../context/ProductsContext";
import UserAllOrders from "../components/UserAllOrders";
import UserActiveOrders from "../components/UserActiveOrders";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { Helmet } from "react-helmet";

const ProfilePage = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [showSignOutDialog, setShowSignOuDialog] = useState(false);
  const [showChangeAccent, setShowChangeAccent] = useState(false);
  const [showUserMoneySpent, setShowUserMoneySpent] = useState(false);
  const [showUserAllOrders, setShowUserAllOrders] = useState(false);
  const [showUserActiveOrders, setShowUserActiveOrders] = useState(false);
  const { t } = useTranslation();
  const { currentAccent, changeAccent } = useTheme();

  const hanldleSignOut = async () => {
    try {
      await signOutUser();
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
      {user ? (
        <div className="pt-[80px]">

          <Helmet>
            <title>TikTok Services | {user.userName}</title>
          </Helmet>

          <div className="w-[95%] h-[200px] bg-[#212121] text-white rounded-xl mx-auto flex flex-row-reverse justify-between items-center p-2">
            <div className="flex flex-col justify-between items-center h-full py-2">
              <div className="flex flex-row-reverse justify-center items-center gap-1">
                <div>
                  {user.userImage ? (
                    <img
                      src={user.userImage}
                      className="w-[70px] h-[70px] rounded-full object-cover"
                      alt=""
                    />
                  ) : (
                    <p className="bg-[#969393]/15 rounded-full w-[70px] h-[70px] text-center grid place-items-center text-2xl">
                      {user.userName.charAt(0)}
                    </p>
                  )}
                </div>

                <div className="flex flex-col justify-start items-start">
                  <p>{user.userName}</p>
                  <div className="font-sans text-[#C5C5C5]/70 truncate">
                    {user.userPhoneNumber ? (
                      <p>{user.userPhoneNumber}</p>
                    ) : (
                      <p>{user.userEmail}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center mr-0 ml-auto px-1">
                <p className="text-[#C5C5C5]/70">{t("Balance")}</p>

                <div className="flex flex-row-reverse items-center text-[#00FF00] gap-1">
                  <p>{user.userMoney.toLocaleString()}</p>
                  <p>{t("Thousand Dinar")}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-center h-full py-2">
              <button
                onClick={() => setShowSignOuDialog(!showSignOutDialog)}
                className="bg-[#23242A] w-[40px] h-[40px] rounded-full p-1 flex justify-center items-center active:scale-95"
                title={t("Logout")}
              >
                <box-icon
                  name="log-out"
                  style={{ fill: "#c24848", width: "25px", height: "25px" }}
                ></box-icon>
              </button>

              {showSignOutDialog && (
                <SignOutDialog
                  showSignOutDialog={showSignOutDialog}
                  setShowSignOuDialog={setShowSignOuDialog}
                  hanldleSignOut={hanldleSignOut}
                  t={t}
                />
              )}

              <button
                onClick={() => setShowChangeAccent(!showChangeAccent)}
                className="bg-[#23242A] w-[40px] h-[40px] rounded-full p-1 flex justify-center items-center active:scale-95"
                title={t("Change Accent")}
              >
                <span className="material-icons">translate</span>
              </button>
            </div>
          </div>

          {showChangeAccent && (
            <div
              className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen backdrop-blur-sm"
              style={{ zIndex: 1 }}
            >
              <ChangeAccent
                showChangeAccent={showChangeAccent}
                setShowChangeAccent={setShowChangeAccent}
                currentAccent={currentAccent}
                changeAccent={changeAccent}
              />
            </div>
          )}

          <div className="flex flex-col justify-center items-center gap-3 pt-[20px]">
            <button
              onClick={() => setShowUserMoneySpent(!showUserMoneySpent)}
              className="w-[95%] active:scale-95 cursor-pointer h-[60px] bg-[#212121] text-white rounded-xl mx-auto flex flex-row-reverse justify-between items-center p-2 hover:shadow-2xl"
            >
              <h3 className="text-base">{t("How Much Spent")}</h3>

              <div className="flex flex-row-reverse justify-center items-center gap-0.5 text-[#FF0000] text-base">
                <p>{user.userMoneySpent.toLocaleString()}</p>
                <p>{t("Thousand Dinar")}</p>
              </div>
            </button>

            {showUserMoneySpent && (
              <UserMoneySpent
                user={user}
                showUserMoneySpent={showUserMoneySpent}
                setShowUserMoneySpent={setShowUserMoneySpent}
                t={t}
              />
            )}

            <button
              onClick={() => setShowUserAllOrders(!showUserAllOrders)}
              className="w-[95%] active:scale-95 cursor-pointer h-[60px] bg-[#212121] text-white rounded-xl mx-auto flex flex-row-reverse justify-between items-center p-2 hover:shadow-2xl"
            >
              <h3 className="text-base">{t("My Orders")}</h3>

              <p className="text-[#404FD8] text-xl drop-shadow-2xl">
                {user.userAllOrders.toLocaleString()}
              </p>
            </button>

            {showUserAllOrders && (
              <UserAllOrders
                user={user}
                showUserAllOrders={showUserAllOrders}
                setShowUserAllOrders={setShowUserAllOrders}
                t={t}
              />
            )}

            <button
              onClick={() => setShowUserActiveOrders(!showUserActiveOrders)}
              className="w-[95%] active:scale-95 cursor-pointer h-[60px] bg-[#212121] text-white rounded-xl mx-auto flex flex-row-reverse justify-between items-center p-2 hover:shadow-2xl"
            >
              <div className="flex flex-row-reverse gap-1 text-base">
                <h3>{t("My Active Orders")}</h3>
                <span className="material-icons text-[#00FF00]">task_alt</span>
              </div>

              <p className="text-[#00FF00] text-xl drop-shadow-2xl">
                {user.userActiveOrders.toLocaleString()}
              </p>
            </button>

            {showUserActiveOrders && (
              <UserActiveOrders
                user={user}
                showUserActiveOrders={showUserActiveOrders}
                setShowUserActiveOrders={setShowUserActiveOrders}
                t={t}
              />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfilePage;
