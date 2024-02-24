import React, { useEffect, useState } from "react";
import { useProduct } from "../../context/ProductsContext";
import { useAuth } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";

const AddProduct = () => {
  const { user } = useAuth();
  const [productName, setProductName] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [showProductImage, setShowProductImage] = useState(null);
  const [productSold, setProductSold] = useState(0);
  const [productSoldMoney, setProductSoldMoney] = useState(0);
  const [productProfitMoney, setProductProfitMoney] = useState(0);
  const { addProduct } = useProduct();

  
  const hanldeProductImage = async () => {
    try {
      if (!productImage) return null;

      const storageRef = ref(storage, `productImages/${productImage.name}`);
      await uploadBytes(storageRef, productImage);
      const productImageURL = await getDownloadURL(storageRef);
      return productImageURL;
    } catch (error) {
      console.log(error.message);
    }
  };

  const hanldeAddProduct = async (e) => {
    e.preventDefault();

    try {
      if (productName != "" && productSlug && productImage) {
        let productImageURL = null;

        if (productImage.type.includes("image")) {
          productImageURL = await hanldeProductImage();
        } else {
          alert("Unsupported browser");
          return;
        }

        const productData = {
          productName,
          productSlug,
          productImageURL,
          productSold,
          productSoldMoney,
          productProfitMoney,
        };
        await addProduct(productData);

        setProductName("");
        setProductSlug("");
        setProductImage(null);
        setProductSold(0);
        setProductSoldMoney(0);
        setProductProfitMoney(0);

        alert(`${productName} product added successfully`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="text-white">
      {user ? (
        <div className="text-white">
          {user.isAdmin === true ? (
            <div className="absolute top-[50%] left-[50%] font-serif text-white transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[300px] flex flex-col justify-center items-center gap-4 border border-[#C5C5C5]/30 rounded-lg">
              <div>
                <h3 className="text-lg font-bold">Add Product</h3>
              </div>

              <form
                onSubmit={hanldeAddProduct}
                className="flex flex-col justify-center items-center gap-5"
              >
                <input
                  type="text"
                  className="w-[300px] border border-[#C5C5C5]/25 rounded-lg p-2 bg-[#24232a] focus:outline-none"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />

                <input
                  type="text"
                  className="w-[300px] border border-[#C5C5C5]/25 rounded-lg p-2 bg-[#24232a] focus:outline-none"
                  placeholder="Product Slug"
                  value={productSlug}
                  onChange={(e) => setProductSlug(e.target.value)}
                  required
                />

                <input
                  type="file"
                  onChange={(e) => setProductImage(e.target.files[0])}
                  required
                  id="product_image"
                  style={{ display: "none" }}
                />

                {showProductImage && <img src={productImage} alt="" />}

                <label
                  htmlFor="product_image"
                  className="flex gap-1 cursor-pointer text-[#C5C5C5]/70 active:scale-95 w-[300px] border border-[#C5C5C5]/25 rounded-lg p-2 bg-[#24232a] focus:outline-none"
                >
                  <span className="material-icons">image</span>
                  <p className="">Product Image</p>
                </label>

                <button className="py-3 w-[300px] bg-[#212121] rounded-lg active:scale-95">
                  Add Product
                </button>
              </form>
            </div>
          ) : (
            <>404 Not found</>
          )}
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default AddProduct;
