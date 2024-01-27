import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SideBar from "../../components/admin/SideBar";
import { useProduct } from "../../context/ProductsContext";
import OrderCard from "../../components/admin/OrderCard";

const OrdersPage = () => {
  const { getUserData } = useAuth();
  const { fetchAllOrders } = useProduct();
  const [allOrders, setAllOrders] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, [getUserData]);

  useEffect(() => {
    getAllOrders();
  }, [fetchAllOrders]);

  const getAllOrders = async () => {
    const data = await fetchAllOrders();
    setAllOrders(data);
  }

  const fetchUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  return (
    <div className="text-white">
      {userData ? (
        <>
          {userData.isAdmin === true ? (
            <div className="flex">
              <div className="flex-1"><SideBar /></div>

              <div className="flex-1 flex justify-end items-end gap-9 flex-wrap p-7">
                {allOrders.map((allOrder, index) => (
                    <div className="" key={index}>
                        <OrderCard allOrder={allOrder} userData={userData} />
                    </div>
                ))}

              </div>

            </div>
          ) : (
            <>404 Not found</>
          )}
        </>
      ) : (
        <>Loading..</>
      )}
    </div>
  );
};

export default OrdersPage;
