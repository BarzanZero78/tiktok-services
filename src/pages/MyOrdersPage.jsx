import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useProduct } from "../context/ProductsContext";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const MyOrdersPage = () => {
  const { user, getUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const { fetchAllOrders } = useProduct();
  const [userOrders, setUserOrders] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserData();
  }, [getUserData]);

  const fetchUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  useEffect(() => {
    getUserOrders();
  } , [fetchAllOrders]);

  const getUserOrders = async () => {
      const data = await fetchAllOrders();
      setUserOrders(data);
  };

  return (
    <div className="text-white">
      <Helmet>
        <title>TikTok Services | داواکاریەکانم</title>
      </Helmet>

      {userData ? (
        <div className="pt-[80px] flex flex-col justify-center items-center gap-10">
          <div>
            <h3 className="text-2xl">{t("My Orders")}</h3>
          </div>

          <div className="container mx-auto max-w-[1200px] flex flex-wrap justify-center items-center gap-10">
            {userOrders.map((userOrder, index) => (
              <div key={index}>
              {userOrder.orderData.userData.userId === userData.userId ? (
                <div
                className="flex flex-col justify-center items-center gap-4 border border-[#C5C5C5]/50 rounded-lg w-[275px] h-[350px] hover:shadow-xl hover:-translate-y-6 transition ease-in-out duration-300"
              >
                <div className="flex justify-center items-center gap-0.5">
                  <h3 className="text-lg">
                    {
                      userOrder.orderData.selectedService.serviceData
                        .serviceName
                    }
                  </h3>
                  <img
                    src={userOrder.orderData.productImage}
                    className="w-7 h-7 object-cover"
                    alt=""
                  />
                </div>

                <div>
                  <img
                    src={
                      userOrder.orderData.selectedService.serviceData
                        .serviceImageURL
                    }
                    className="w-[100px] h-[100px] object-cover"
                    alt=""
                  />
                </div>

                <div className="flex flex-row-reverse justify-center items-center gap-0.5 text-[#EE1D52] border-b border-b-[#C5C5C5]/25 w-full py-2">
                  <p>
                    {userOrder.orderData.selectedService.serviceData.servicePrice.toLocaleString()}
                  </p>
                  <p>{t("Thousand Dinar")}</p>
                </div>

                <div className="flex flex-col justify-end items-end mr-0 ml-auto px-2 gap-3">
                  <div className="flex flex-row-reverse">
                    <p>:لينك</p>
                    <div className="flex justify-center items-center break-all w-full">
                      <a
                        href={userOrder.orderData.orderLink}
                        target="_blank"
                        className="font-sans text-blue-500 active:scale-95"
                      >
                        {userOrder.orderData.orderLink}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col justify-end items-end gap-3">
                    <div>
                      {userOrder.isServiceActive == true ? (
                        <div className="flex flex-row-reverse justify-center items-center gap-0.5">
                          <p>:دۆخ</p>
                          <p className="text-[#00FF00]">چالاک</p>
                          <span className="material-icons text-[#00FF00]">
                            task_alt
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-row-reverse justify-center items-center gap-0.5">
                          <p>:دۆخ</p>
                          <p className="text-[#EE1D52]">{t("Waiting")}</p>
                          <span className="material-icons text-[#d4d649]">
                            hourglass_bottom
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row-reverse justify-center items-center gap-0.5">
                      <p>:كاتى داواكردن</p>
                      <p>{userOrder.orderData.orderDate}</p>
                      <span className="material-icons">schedule</span>
                    </div>
                  </div>
                </div>
              </div>
              ) : <></>}
              </div>

            ))}
          </div>
          <br />
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default MyOrdersPage;
