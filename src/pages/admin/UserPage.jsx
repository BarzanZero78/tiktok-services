import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SideBar from "../../components/admin/SideBar";
import { useProduct } from "../../context/ProductsContext";
import { collection, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import EditUserMoneyForm from "../../components/admin/EditUserMoneyForm";

const UserPage = () => {
  const { userName } = useParams();
  const { user, getUsers } = useAuth();
  const { fetchUserOrders } = useProduct();
  const [userOrders, setUserOrders] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [showEditUserMoney, setShowEditUserMoney] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };

    fetchData();
  }, [getUsers]);

  useEffect(() => {
    if (userDetails && userDetails.length > 0) {
      const foundUser = userDetails.find(
        (userDetail) => userDetail.userName === userName
      );
      setUserDetails(foundUser);
    }
  }, [userDetails, userName]);

  
  const fetchUsers = async () => {
    const data = await getUsers();
    setUserDetails(data);
  };

  const hanldeIsServiceActive = async (orderIndex) => {
    if (userOrders && userOrders[orderIndex]) {
      try {
        const updatedOrders = [...userOrders];
        const updatedOrder = { ...updatedOrders[orderIndex] };

        const ordersCollection = collection(db, "orders", updatedOrder.id);

        await updateDoc(ordersCollection, {
          isServiceActive: !updatedOrder.isServiceActive,
        });

        updatedOrders[orderIndex] = updatedOrder;

        await updateDoc(collection(db, "users", userDetails.userId), {
          userActiveOrders: userData.userActiveOrders + 1,
        });

        setUserOrders(updatedOrders);

        alert(
          `${updatedOrder.orderData.selectedService.serviceData.serviceName} ${updatedOrder.orderData.productSlug} order activated successfully.`
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getUserOrders();
  }, [fetchUserOrders]);
  
  const getUserOrders = async () => {
    if (userDetails) {
      const data = await fetchUserOrders(userDetails.userId);
      setUserOrders(data);
    }
  };

  return (
    <div className="text-white">
      {user ? (
        <>
          {user.isAdmin === true ? (
            <div className="flex">
              <div className="flex-1">
                <SideBar />
              </div>

              <div className="flex-1 p-10">
                {userDetails ? (
                  <div className="flex flex-col justify-center items-center gap-5">
                    <div className="w-[95%] h-[200px] bg-[#212121] text-white rounded-xl mx-auto flex flex-row-reverse justify-between items-center p-2">
                      <div className="flex flex-col justify-between items-center h-full py-2">
                        <div className="flex flex-row-reverse justify-center items-center gap-1">
                          <div>
                            <img
                              src={userDetails.userImage}
                              className="w-[70px] h-[70px] rounded-full object-cover"
                              alt=""
                            />
                          </div>

                          <div className="flex flex-col justify-start items-start">
                            <dir>{userDetails.userName}</dir>
                            <div className="font-sans text-[#C5C5C5]/70 truncate">
                              {userDetails.userPhoneNumber ? (
                                <p>{userDetails.userPhoneNumber}</p>
                              ) : (
                                <p>{userDetails.userEmail}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center mr-0 ml-auto px-1">
                          <p className="text-[#C5C5C5]/70">باڵانس</p>

                          <div className="flex flex-row-reverse items-center text-[#00FF00] gap-1">
                            <p>{userDetails.userMoney}</p>
                            <p>هەزار دینار</p>
                            <button
                              onClick={() =>
                                setShowEditUserMoney(!showEditUserMoney)
                              }
                              className="active:scale-95 hover:text-white text-[#C5C5C5]"
                            >
                              <span className="material-icons">edit</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {showEditUserMoney && (
                      <EditUserMoneyForm
                        userDetails={userDetails}
                        showEditUserMoney={showEditUserMoney}
                        setShowEditUserMoney={setShowEditUserMoney}
                      />
                    )}

                    <div className="flex flex-col justify-center items-center gap-3 pt-[20px]">
                      <button className="w-[95%] active:scale-95 cursor-pointer h-[60px] bg-[#212121] text-white rounded-xl mx-auto flex flex-row-reverse justify-between items-center p-2 hover:shadow-2xl">
                        <h3 className="text-base">چەندت سەرف کردووە</h3>

                        <div className="flex flex-row-reverse justify-center items-center gap-0.5 text-[#FF0000] text-base">
                          <p>{userDetails.userMoneySpent}</p>
                          <p>هەزار دینار</p>
                        </div>
                      </button>

                      <button className="w-[95%] active:scale-95 cursor-pointer h-[60px] bg-[#212121] text-white rounded-xl mx-auto flex flex-row-reverse justify-between items-center p-2 hover:shadow-2xl">
                        <h3 className="text-base">داواکاریەکان</h3>

                        <p className="text-[#404FD8] text-xl drop-shadow-2xl">
                          {userDetails.userAllOrders}
                        </p>
                      </button>

                      <button className="w-[95%] active:scale-95 cursor-pointer h-[60px] bg-[#212121] text-white rounded-xl mx-auto flex flex-row-reverse justify-between items-center p-2 hover:shadow-2xl">
                        <div className="flex flex-row-reverse gap-1 text-base">
                          <h3>داواکاریەکان چالاک</h3>
                          <span className="material-icons text-[#00FF00]">
                            task_alt
                          </span>
                        </div>

                        <p className="text-[#00FF00] text-xl drop-shadow-2xl">
                          {userDetails.userActiveOrders}
                        </p>
                      </button>
                    </div>

                    <div className="container mx-auto max-w-[1200px] flex flex-wrap justify-center items-center gap-1">
                      {userOrders.map((userOrder, index) => (
                        <div
                          className="flex font-sans flex-col justify-end items-end gap-3 p-7"
                          key={index}
                        >
                          <div className="flex flex-col justify-center items-center gap-3 border border-[#C5C5C5]/50 rounded-lg w-[250px] h-[300px] hover:shadow-2xl cursor-pointer">
                            <div className="flex flex-col justify-center items-center gap-3 border-b border-b-[#C5C5C5]/30 w-full p-1">
                              <h3 className="text-lg font-bold">
                                {
                                  userOrder.orderData.selectedService
                                    .serviceData.serviceName
                                }
                              </h3>
                              <img
                                src={
                                  userOrder.orderData.selectedService
                                    .serviceData.serviceImageURL
                                }
                                className="w-[70px] h-[70px] object-cover"
                                alt=""
                              />
                              <p className="bg-[#212121] rounded-lg w-[100px] p-2 text-center font-semibold">
                                {
                                  userOrder.orderData.selectedService
                                    .serviceData.servicePrice
                                }{" "}
                                IQD
                              </p>
                            </div>

                            <div className="flex justify-center items-center ml-0 mr-auto px-2 gap-1">
                              <img
                                src={userOrder.orderData.userData.userImage}
                                className="w-[30px] h-[30px] object-cover rounded-full"
                                alt=""
                              />
                              <p>{userOrder.orderData.userData.userName}</p>
                            </div>

                            <div className="flex justify-between items-center ml-0 mr-auto px-2 w-full">
                              <p className="">
                                Date: {userOrder.orderData.orderDate}
                              </p>
                              <span className="material-icons">schedule</span>
                            </div>

                            <div className="flex justify-between items-center ml-0 mr-auto px-2 w-full">
                              <div className="flex justify-between items-center ml-0 mr-auto px-2 w-full">
                                {userOrder.orderData.isServiceActive ===
                                true ? (
                                  <div>
                                    <p>Is Active</p>
                                    <p>check</p>
                                  </div>
                                ) : (
                                  <div className="flex justify-between items-center ml-0 mr-auto px-2 w-full">
                                    <p>Is Active</p>
                                    <input
                                      type="checkbox"
                                      checked={
                                        userOrder.isServiceActive || false
                                      }
                                      onChange={() =>
                                        hanldeIsServiceActive(
                                          userOrder.orderData.id
                                        )
                                      }
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>Loading...</>
                )}
              </div>
            </div>
          ) : (
            <>404 Not found</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default UserPage;
