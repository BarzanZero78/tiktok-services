import React, { useEffect, useState } from "react";
import SideBar from "../../components/admin/SideBar";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductsContext";
import { Link } from "react-router-dom";

const ActiveOrdes = () => {
  const { user } = useAuth();
  const { fetchAllOrders } = useProduct();
  const [activeOrders, setActiveOrders] = useState([]);

  useEffect(() => {;
    fetchActiveOrders();
  }, [fetchAllOrders]);


  const fetchActiveOrders = async () => {
    const data = await fetchAllOrders();
    setActiveOrders(data);
  };

  const allActiveOrders = activeOrders.filter(
    (activeOrder) => activeOrder.isServiceActive === true
  );

  return (
    <div className="text-white">
      {user ? (
        <>
          {user.isAdmin === true ? (
            <div className="flex">
              <div className="flex-1">
                <SideBar />
              </div>

              <div className="flex-1 p-3">
                <div>
                  <h3 className="text-lg">
                    Active Orders ({allActiveOrders.length})
                  </h3>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-5 p-2">
                  {allActiveOrders.map((allActiveOrder) => (
                    <div className="flex flex-col justify-center items-center border border-[#C5C5C5]/15 rounded-lg w-[200px] h-[275px] hover:-translate-y-3 transition ease-in-out duration-300 cursor-pointer">
                      <div className="flex flex-col justify-center items-center gap-3 w-full">
                        <div className="flex flex-col justify-center items-center gap-3 border-b border-b-[#C5C5C5]/15 w-full py-2">
                          <div className="flex justify-center items-center gap-1">
                            <h3 className="text-lg">
                              {
                                allActiveOrder.orderData.selectedService
                                  .serviceData.serviceName
                              }
                            </h3>
                            <img
                              src={allActiveOrder.orderData.productImage}
                              className="w-5 h-5 object-cover"
                              alt=""
                            />
                          </div>

                          <img
                            src={
                              allActiveOrder.orderData.selectedService
                                .serviceData.serviceImageURL
                            }
                            className="w-[70px] h-[70px] object-cover"
                            alt=""
                          />

                          <p className="">
                            {allActiveOrder.orderData.selectedService.serviceData.servicePrice.toLocaleString()}
                            IQD
                          </p>
                        </div>

                        <div className="flex flex-col justify-start items-center gap-2 ml-0 mr-auto px-2">
                          <Link
                            to={`/home/admin/user/${allActiveOrder.orderData.user.userName}`}
                            className="flex flex-row-reverse justify-center items-center gap-0.5 active:scale-95 text-[#C5C5C5] hover:text-[#fff] transition-all"
                          >
                            <p>{allActiveOrder.orderData.user.userName}</p>
                            <img
                              src={allActiveOrder.orderData.user.userImage}
                              className="w-[25px] h-[25px] object-cover rounded-full"
                              alt=""
                            />
                          </Link>

                          <p className="font-sans">Order activated</p>

                          <p className="font-sans">
                            Date: {allActiveOrder.orderData.orderDate}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
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

export default ActiveOrdes;
