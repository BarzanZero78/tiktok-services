import React, { useEffect, useState } from "react";
import { useProduct } from "../context/ProductsContext";
import { collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

const OrderForm = ({
  selectedService,
  showOrderForm,
  setShowOrderForm,
  user,
  productDetails,
}) => {
  const [orderLink, setOrderLink] = useState("");
  const [submitOrder, setSubmitOrder] = useState(false);
  const { orderService } = useProduct();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.userMoney < selectedService.serviceData.servicePrice) {
      alert("ناتواینت داواکاری بکەیت، چونکە پارەی پێویستت نییە");
      setSubmitOrder(false);
    } else {
      setSubmitOrder(true);
    }
  };

  const hanldeOrder = async () => {
    try {
      if (orderLink != "") {
        const orderDay = new Date().getDate();
        const orderMonth = new Date().getMonth();
        const orderYear = new Date().getFullYear();
        const orderDate = {
          user,
          selectedService,
          orderLink,
          productSlug: productDetails.productSlug,
          productName: productDetails.productName,
          productImage: productDetails.productImageURL,
          orderDate: orderDay + "/" + orderMonth + "/" + orderYear,
        };
        const isServiceActive = false;

        await orderService(
          selectedService.id,
          orderDate,
          user,
          productDetails,
          selectedService,
          isServiceActive
        );

        setOrderLink("");
        setSubmitOrder(false);
        setShowOrderForm(false);
        alert("داواکاریەکەت سەرکەوتووبوو");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!submitOrder && (
        <div
          className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-black/80 w-[350px] h-[250px] rounded-lg p-1 flex flex-col justify-center items-center gap-3"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-row-reverse justify-between items-center w-full p-x2">
            <button
              className="hover:text-red-500 active:scale-95"
              onClick={() => setShowOrderForm(!showOrderForm)}
            >
              <span className="material-icons">close</span>
            </button>

            <div className="flex flex-row-reverse justify-center items-center gap-1">
              <h3 className="text-lg">{productDetails.productName}</h3>
              <img
                src={productDetails.productImageURL}
                className="w-[25px] h-[25px] object-cover"
                alt=""
              />
            </div>
            <span></span>
          </div>

          <div className="flex flex-row-reverse justify-center items-center gap-0.5">
            <p className="">{user.userMoney.toLocaleString()}</p>
            <p>دینارت هەیە</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3"
          >
            <div className="flex flex-row-reverse justify-start items-center gap-1 border border-[#C5C5C5]/50 rounded-lg w-[300px] p-2">
              <p>{selectedService.serviceData.serviceName.toLocaleString()}</p>
              <p>{productDetails.productName}</p>
              <p>بە</p>
              <p className="text-[#EE1D52]">
                {selectedService.serviceData.servicePrice.toLocaleString()}
              </p>
              <p className="text-[#EE1D52]">هەزار دینار</p>
            </div>

            <div>
              <input
                type="text"
                value={orderLink}
                onChange={(e) => setOrderLink(e.target.value)}
                placeholder="لینک"
                className="w-[300px] p-2 border border-[#C5C5C5]/50 rounded-lg bg-black/80 text-right focus:outline font-mono"
                required
              />
            </div>

            <button className="w-[300px] bg-[#212121] rounded-lg p-2 active:scale-95">
              داواکردن
            </button>
          </form>
        </div>
      )}

      {submitOrder && (
        <div
          className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-black/80 w-[350px] h-[250px] rounded-lg p-1 flex flex-col justify-center items-center gap-3"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-wrap p-2 flex-row-reverse justify-start items-center gap-0.5 break-words w-full">
            <p>ئایا دڵنیای لە داواکردنی</p>
            <p>{selectedService.serviceData.serviceName}</p>
            <img
              src={productDetails.productImageURL}
              className="w-5 h-5 object-cover"
              alt=""
            />
            <p>بە بڕی</p>
            <p className="text-[#EE1D52]">
              {selectedService.serviceData.servicePrice.toLocaleString()}
            </p>
            <p className="text-[#EE1D52]">هەزار دینار</p>
            <p>بۆ</p>
            <a
              href={orderLink}
              target="_blank"
              className="font-sans text-[#1E55C0] active:scale-95 break-words w-full"
            >
              {orderLink}
            </a>
          </div>

          <div className="flex flex-row-reverse w-full py- justify-evenly items-center">
            <button
              onClick={hanldeOrder}
              className="active:scale-95 bg-[#212121] w-[150px] p-2 rounded-lg"
            >
              داواکردن
            </button>
            <button
              onClick={() => setShowOrderForm(!showOrderForm)}
              className="text-[#EE2121] active:scale-95"
            >
              هەڵوەشاندنەوە
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
