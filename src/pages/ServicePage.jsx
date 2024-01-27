import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductsContext";
import OrderForm from "../components/OrderForm";
import { Helmet } from "react-helmet";

const ServicePage = () => {
  const { productSlug } = useParams();
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const { products, fetchProductWithServices, services } = useProduct();
  const [productDetails, setProductDetails] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [getUserData]);

  const fetchUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(
        (product) => product.productSlug === productSlug
      );
      setProductDetails(foundProduct);
    }
  }, [products, productSlug]);

  useEffect(() => {
    if (productDetails) {
      fetchProductWithServices(productDetails.id);
    }
  }, [fetchProductWithServices, productDetails]);

  const hanldeServiceClick = (service) => {
    setSelectedService(service);
    setShowOrderForm(true);
  };

  return (
    <div className="">
      <Helmet>
        <title>TikTok Services | خزمەتگوزاری {productDetails ? productDetails.productName : ''}</title>
      </Helmet>

      {userData ? (
        <div className="text-white flex flex-col justify-center items-center gap-10">
          <header className="fixed top-0 left-0 w-full h-12 bg-[#212121] flex justify-between items-center px-2">
            <div>
              <Link to="/" className="active:scale-95 hover:text-gray-300">
                <span className="material-icons">arrow_back</span>
              </Link>
            </div>

            {productDetails ? (
              <div className="flex flex-row-reverse justify-center items-center gap-1">
                <h3 className="text-lg">{productDetails.productName}</h3>
                <img
                  src={productDetails.productImageURL}
                  className="w-[25px] h-[25px] object-cover"
                  alt=""
                />
              </div>
            ) : (
              <>Loading...</>
            )}

            <span></span>
          </header>

          <div className="pt-[80px] flex flex-wrap justify-center items-center gap-6">
            {services.map((service, index) => (
              <button
                className="flex flex-col justify-between items-center p-1 w-[170px] h-[180px] border border-[#969696] rounded-lg active:scale-95"
                key={index}
                onClick={() => hanldeServiceClick(service)}
              >
                <h3 className="text-lg font-semibold">
                  {service.serviceData.serviceName}
                </h3>
                <img
                  src={service.serviceData.serviceImageURL}
                  className="w-[70px] h-[70px] object-cover"
                  alt=""
                />
                <p className="text-base">
                  {service.serviceData.servicePrice} IQD
                </p>
              </button>
            ))}
          </div>

          {selectedService && showOrderForm && (
            <div
              className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen backdrop-blur-sm"
              onClick={() => setShowOrderForm(!showOrderForm)}
            >
              <OrderForm
                selectedService={selectedService}
                showOrderForm={showOrderForm}
                setShowOrderForm={setShowOrderForm}
                userData={userData}
                productDetails={productDetails}
              />
            </div>
          )}
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default ServicePage;
