import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SideBar from "../../components/admin/SideBar";
import { useProduct } from "../../context/ProductsContext";
import OrderCard from "../../components/admin/OrderCard";

const OrdersPage = () => {
  const { user } = useAuth();
  const { fetchAllOrders } = useProduct();
  const [allOrders, setAllOrders] = useState([]);

  
  useEffect(() => {
    getAllOrders();
  }, [fetchAllOrders]);

  const getAllOrders = async () => {
    const data = await fetchAllOrders();
    setAllOrders(data);
  }

  
  return (
    <div className="text-white">
      {user ? (
        <>
          {user.isAdmin === true ? (
            <div className="flex">
              <div className="flex-1"><SideBar /></div>

              <div className="flex-1 flex justify-end items-end gap-9 flex-wrap p-7">
                {allOrders.map((allOrder, index) => (
                    <div className="" key={index}>
                        <OrderCard allOrder={allOrder} user={user} />
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
