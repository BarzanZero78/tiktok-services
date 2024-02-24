import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductsContext";
import { useAuth } from "../../context/AuthContext";

const ProductPage = () => {
  const { productSlug } = useParams();
  const { user } = useAuth();
  const {
    products,
    fetchProductWithServices,
    getProductServicesFromLocalStorage,
    services,
  } = useProduct();
  const [productDetails, setProductDetails] = useState(null);


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

  return (
    <div className="text-white">
      {user ? (
        <>
          {user.isAdmin === true ? (
            <>
              {productDetails ? (
                <div className="font-serif flex flex-col justify-center items-center gap-5 text-white">
                  <header className="fixed top-0 left-0 w-full h-14 bg-[#212121] flex flex-row-reverse justify-between items-center px-2">
                    <a
                      href={`/home/admin/product/${productDetails.productSlug}/add_service`}
                      className="hover:bg-[#C5C5C5]/10 p-1 rounded-lg active:scale-95"
                    >
                      Add Service
                    </a>

                    <div className="font-[speda] flex justify-center items-center gap-1">
                      <img
                        src={productDetails.productImageURL}
                        alt=""
                        className="w-[25px] h-[25px] object-cover"
                      />
                      <h3 className="text-lg font-semibold">
                        {productDetails.productName}
                      </h3>
                    </div>

                    <div>
                      <a
                        href="/home/admin"
                        className="active:scale-95 hover:text-gray-300"
                      >
                        <span className="material-icons">arrow_back</span>
                      </a>
                    </div>
                  </header>

                  {/* Product Services */}
                  <div className="pt-[70px] flex flex-col p-1 justify-center items-center gap-4">
                    <div className="ml-0 mr-auto">
                      <h3 className="text-lg font-bold">Product services</h3>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-6">
                      {services.map((service, index) => (
                        <div
                          className="flex flex-col justify-between items-center p-1 w-[170px] h-[180px] border border-[#969696] rounded-lg"
                          key={index}
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
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>Loading...</>
              )}
            </>
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

export default ProductPage;
