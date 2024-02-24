import React, { useEffect, useState } from "react";
import Banner from "../assets/images/banner.png";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductsContext";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const { user } = useAuth();
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const { products } = useProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const hanldeProductClick = (product) => {
    setSelectedProduct(product);
    setShowSignInDialog(true);
  };

  return (
    <div className="">
      <Helmet>
        <title>TikTok Services</title>
      </Helmet>

      <div>
        <img src={Banner} className="w-full h-[350px] object-cover" alt="" />
      </div>

      {/* Products */}
      <div className="flex flex-col justify-center items-center p-4 text-white gap-3">
        <div className="flex flex-row-reverse justify-center items-center gap-1 mr-0 ml-auto">
          <span className="material-icons">design_services</span>
          <h3 className="text-lg">خزمەتگوزاریەکان</h3>
        </div>

        <div className="flex flex-row-reverse flex-wrap justify-center items-center gap-7">
          {products.map((product, index) => (
            <div className="" key={index}>
              {user ? (
                <div className="">
                  <Link
                    to={`/service/${product.productSlug}`}
                    className="flex flex-col justify-between items-center w-[160px] h-[150px] border border-gray-300 rounded-lg active:scale-95 hover:drop-shadow-2xl hover:shadow-2xl"
                  >
                    <img
                      src={product.productImageURL}
                      className="w-[125px] h-[110px] object-cover"
                      alt=""
                    />
                    <p>{product.productName}</p>
                  </Link>
                </div>
              ) : (
                <div className="">
                  <button
                    className="flex flex-col justify-between items-center w-[160px] h-[150px] border border-gray-300 rounded-lg active:scale-95 hover:drop-shadow-2xl hover:shadow-2xl"
                    onClick={() => hanldeProductClick(product)}
                  >
                    <img
                      src={product.productImageURL}
                      className="w-[125px] h-[110px] object-cover"
                      alt=""
                    />
                    <p>{product.productName}</p>
                  </button>

                  {selectedProduct && showSignInDialog && (
                    <div
                      onClick={() => setShowSignInDialog(!showSignInDialog)}
                      className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-screen backdrop-blur-sm"
                    >
                      <div
                        onClick={(event) => event.stopPropagation()}
                        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-black/60 w-[300px] h-[150px] rounded-lg flex flex-col justify-center items-center gap-7"
                      >
                        <div className="flex flex-row-reverse justify-center items-center gap-0.5">
                          <p>بۆ کڕینی</p>
                          <span className="text-[#EE1D52]">
                            {selectedProduct.productName}
                          </span>
                          <p>تکایە بچۆژوورەوە</p>
                        </div>

                        <Link
                          to="/login"
                          className="text-[#4562c4] active:scale-95"
                        >
                          چوونەژوورەوە
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
