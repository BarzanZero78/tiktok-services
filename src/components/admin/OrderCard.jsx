import {
  collection,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import React from "react";
import { db } from "../../firebase/FirebaseConfig";

const OrderCard = ({ allOrder, userData }) => {
  const hanldeIsServiceActive = async () => {
    if (allOrder) {
      try {
        const ordersCollection = doc(db, "orders", allOrder.id);

        await updateDoc(ordersCollection, {
          isServiceActive: !allOrder.isServiceActive
        });

        // Update the user's active orders count
        await updateDoc(doc(db, "users", userData.userId), {
          userActiveOrders: userData.userActiveOrders + 1,
        });

        alert(
          `${allOrder.orderData.selectedService.serviceData.serviceName} ${allOrder.orderData.productSlug} order activated successfully.`
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="flex font-sans">
      <div className="flex flex-col justify-center items-center gap-3 border border-[#C5C5C5]/50 rounded-lg w-[300px] h-[350px] hover:shadow-2xl cursor-pointer">
        <div className="flex flex-col justify-center items-center gap-3 border-b border-b-[#C5C5C5]/30 w-full p-1">
          <h3 className="text-lg font-bold">
            {allOrder.orderData.selectedService.serviceData.serviceName}
          </h3>
          <img
            src={allOrder.orderData.selectedService.serviceData.serviceImageURL}
            className="w-[70px] h-[70px] object-cover"
            alt=""
          />
          <p className="bg-[#212121] rounded-lg w-[100px] p-2 text-center font-semibold">
            {allOrder.orderData.selectedService.serviceData.servicePrice} IQD
          </p>
        </div>

        <div className="flex justify-center items-center ml-0 mr-auto px-2 gap-1">
          <img
            src={allOrder.orderData.userData.userImage}
            className="w-[30px] h-[30px] object-cover rounded-full"
            alt=""
          />
          <p>{allOrder.orderData.userData.userName}</p>
        </div>

        <div className="ml-0 mr-auto px-2">
          <p className="truncate w-full">Order Link: {allOrder.orderData.orderLink}</p>
        </div>

        <div className="flex justify-between items-center ml-0 mr-auto px-2 w-full">
          <p className="">Date: {allOrder.orderData.orderDate}</p>
          <span className="material-icons">schedule</span>
        </div>

        <div className="ml-0 mr-auto px-2 w-full">
          <div className="flex justify-between items-center w-full">
            {allOrder.orderData.isServiceActive === true ? (
              <div>
                <p>Is Active</p>
                <p>check</p>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <p>Is Active</p>
                <input
                  type="checkbox"
                  checked={allOrder.isServiceActive || false}
                  onChange={hanldeIsServiceActive}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
