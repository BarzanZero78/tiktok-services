import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserData();
  }, [getUserData]);

  const fetchUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  if (
    location.pathname.includes("/auth") ||
    location.pathname.includes("/home/admin") ||
    location.pathname.includes("/home/admin/add_product") ||
    location.pathname.includes("/home/admin/product/") ||
    location.pathname.includes("/service/") ||
    location.pathname.includes("/home/admin/orders") ||
    location.pathname.includes("/home/admin/user") ||
    location.pathname.includes("/home/admin/active_orders")
  ) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 flex flex-row-reverse justify-between items-center w-full h-[55px] px-4 bg-black/90 text-white">
      <div>
        <Link to="/">Logo</Link>
      </div>

      <nav>
        <ul className="flex flex-row-reverse justify-center items-center gap-20">
          <Link to="/">
            <li className="flex justify-center items-center gap-0.5 active:scale-95">
              <p className="text-lg">سەرەکی</p>
              <box-icon
                name="home"
                style={{ fill: "white", width: "35px", height: "35px" }}
              ></box-icon>
            </li>
          </Link>

          {userData ? (
            <a href="/my_orders">
              <li className="flex justify-center items-center gap-0.5 active:scale-95">
                <p className="text-lg">{t("My Orders")}</p>
                <box-icon
                  name="cart"
                  style={{ fill: "white", width: "35px", height: "35px" }}
                ></box-icon>
              </li>
            </a>
          ) : (
            <a href="/auth">
              <li className="flex justify-center items-center gap-0.5 active:scale-95">
                <p className="text-lg">داواکاریەکانم</p>
                <box-icon
                  name="cart"
                  style={{ fill: "white", width: "35px", height: "35px" }}
                ></box-icon>
              </li>
            </a>
          )}

          <Link to='/tutorial'>
            <li className="flex justify-center items-center gap-0.5 active:scale-95">
              <p className="text-lg">مەرجەکان</p>
              <box-icon
                name="file"
                style={{ fill: "white", width: "35px", height: "35px" }}
              ></box-icon>
            </li>
          </Link>

          <Link to='/payment'>
            <li className="flex justify-center items-center gap-0.5 active:scale-95">
              <p className="text-lg">پارەدان</p>
              <box-icon
                name="credit-card"
                style={{ fill: "white", width: "35px", height: "35px" }}
              ></box-icon>
            </li>
          </Link>

          {userData ? (
            <>
              {userData.isAdmin === true ? (
                <a href="/home/admin">
                  <li className="flex justify-center items-center gap-0.5 active:scale-95">
                    <p className="text-lg">ئەدمین</p>
                    <box-icon
                      name="user"
                      style={{ fill: "white", width: "35px", height: "35px" }}
                    ></box-icon>
                  </li>
                </a>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </ul>
      </nav>

      <div className="">
        {userData ? (
          <Link to="/profile">
            <img
              src={userData.userImage}
              className="w-10 h-10 object-cover rounded-full active:scale-95"
              alt=""
            />
          </Link>
        ) : (
          <a
            href="/auth"
            className="bg-[#222020] p-2 rounded-lg active:scale-95"
          >
            چوونەژوورەوە
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
