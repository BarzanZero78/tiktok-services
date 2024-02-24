import React, { useEffect, useState } from "react";
import { useProduct } from "../context/ProductsContext";

const UserActiveOrders = ({
  user,
  showUserActiveOrders,
  setShowUserActiveOrders,
  t,
}) => {
  const { fetchAllOrders } = useProduct();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    getUserOrders();
  }, [fetchAllOrders]);

  const getUserOrders = async () => {
    const data = await fetchAllOrders();
    setUserOrders(data);
  };

  // Filter active orders
  const activeOrders = userOrders.filter(
    (userOrder) => userOrder.isServiceActive === true
  );

  return (
    <div
      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen backdrop-blur-sm"
      style={{ zIndex: 1 }}
    >
      <div
        className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white ${
          user.userActiveOrders > 0
            ? "w-[350px] h-[225px] overflow-y-auto"
            : "w-[300px] h-[150px]"
        } rounded-lg flex flex-col justify-center items-center gap-4`}
      >
        <div className="sticky top-0 left-0 bg-black flex justify-between items-center w-full p-2 border-b border-b-[#C5C5C5]/15">
          <div className="flex flex-row-reverse gap-0.5">
            <p>{user.userActiveOrders.toLocaleString()}</p>
          </div>

          <h3 className="text-base">{t("My Active Orders")}</h3>
          <button
            onClick={() => setShowUserActiveOrders(!showUserActiveOrders)}
            className="hover:text-red-500 active:scale-95"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="w-full">
          {user.userActiveOrders > 0 ? (
            <div className="h-[90px]">
              {activeOrders.map((userOrder, index) => (
                <div
                  className="flex flex-row-reverse justify-between w-full items-center p-1 border-b border-b-gray-300/15"
                  key={index}
                >
                  {userOrder.orderData.user.userId === user.userId ? (
                    <>
                      <div className="flex flex-col justify-end items-end gap-0.5">
                        <div className="flex flex-row-reverse justify-center items-center gap-0.5">
                          <p>
                            {
                              userOrder.orderData.selectedService.serviceData
                                .serviceName
                            }
                          </p>
                          <p>{userOrder.orderData.productName}</p>
                          <img
                            src={userOrder.orderData.productImage}
                            className="w-6 h-6 object-cover"
                            alt=""
                          />
                        </div>

                        <div className="flex flex-row-reverse gap-0.5 text-sm">
                          <p>
                            {userOrder.orderData.selectedService.serviceData.servicePrice.toLocaleString()}
                          </p>
                          <p>{t("Thousand Dinar")}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[#00FF00]">چالاک</p>
                        <div className="flex justify-center items-center gap-0.5 text-sm">
                          <span className="material-icons text-sm">
                            schedule
                          </span>
                          <p>{userOrder.orderData.orderDate}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              {t("You Don't Have Any Active Orders")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserActiveOrders;
