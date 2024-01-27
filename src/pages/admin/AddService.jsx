import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";
import { useProduct } from "../../context/ProductsContext";
import { useParams } from "react-router-dom";

const AddService = () => {
  const { getUserData } = useAuth();
  const { productSlug } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [userData, setUserData] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [serviceImage, setServiceImage] = useState(null);
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceProfit, setServiceProfit] = useState(0);
  const [serviceCountSold, setServiceCountSold] = useState(0);
  const { products, addService } = useProduct();

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

  const hanldeAddServiceImage = async () => {
    try {
      if (!serviceImage) return null;

      const storageRef = ref(
        storage,
        `${serviceName}_images/${serviceImage.name}`
      );
      await uploadBytes(storageRef, serviceImage);
      const serviceImageURL = await getDownloadURL(storageRef);
      return serviceImageURL;
    } catch (error) {
      console.log(error.message);
    }
  };

  const hanldeAddService = async (e) => {
    e.preventDefault();

    try {
      if (serviceName !== "" && serviceImage && servicePrice !== null && serviceProfit !== null) {
        let serviceImageURL = null;

        if (serviceImage.type.includes("image")) {
          serviceImageURL = await hanldeAddServiceImage();
        } else {
          alert("Unsupported browser");
          return;
        }

        const serviceData = {
          serviceName,
          serviceImageURL,
          servicePrice,
          serviceCountSold,
          serviceProfit,
        };

        await addService(productDetails.id, serviceData);

        setServiceName("");
        setServiceImage(null);
        setServicePrice(0);
        setServiceCountSold(0);
        setServiceProfit(0);

        alert(
          `${serviceName} ${productDetails.productName} added successfully`
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {userData ? (
        <>
          {userData.isAdmin === true ? (
            <div className="font-serif text-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-[#C5C5C5]/50 rounded-lg flex flex-col justify-center items-center gap-5">
              <div>
                <h3 className="text-lg font-semibold">
                  Add service for {productDetails?.productName}
                </h3>
              </div>

              <form
                onSubmit={hanldeAddService}
                className="flex flex-col justify-center items-center gap-4"
              >
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="Service Name"
                  className="w-[300px] p-2 rounded-lg border border-[#969696] bg-[#24232a] focus:outline-none"
                />

                <input
                  type="file"
                  onChange={(e) => setServiceImage(e.target.files[0])}
                  id="service_image"
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="service_image"
                  className="flex cursor-pointer active:scale-95 w-[300px] p-2 rounded-lg border border-[#969696] bg-[#24232a] focus:outline-none"
                >
                  <span className="material-icons">image</span>
                  Service Image
                </label>

                <input
                  type="number"
                  value={servicePrice}
                  onChange={(e) => setServicePrice(parseInt(e.target.value, 10))}
                  placeholder="Service Price"
                  title="Service Price"
                  className="w-[300px] p-2 rounded-lg border border-[#969696] bg-[#24232a] focus:outline-none"
                />

                <input
                  type="number"
                  value={serviceProfit}
                  onChange={(e) => setServiceProfit(parseInt(e.target.value, 10))}
                  placeholder="Service Profit"
                  title="Service Profit"
                  className="w-[300px] p-2 rounded-lg border border-[#969696] bg-[#24232a] focus:outline-none"
                />

                <button className="w-[300px] p-2 rounded-lg bg-[#212121] active:scale-95">
                  Add Service
                </button>
              </form>
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

export default AddService;
