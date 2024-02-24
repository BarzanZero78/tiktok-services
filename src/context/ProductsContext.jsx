import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../firebase/FirebaseConfig";

const UseProductContext = createContext();

export const useProduct = () => {
  return useContext(UseProductContext);
};

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  const fetchProductsFromFirestore = async () => {
    try {
      const productsSnapshot = onSnapshot(
        collection(db, "products"),
        (snapshot) => {
          const updatedProductsSnapshot = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setProducts(updatedProductsSnapshot);
          localStorage.setItem(
            "products",
            JSON.stringify(updatedProductsSnapshot)
          );
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const storeProducts = localStorage.getItem("products");

    if (!storeProducts) {
      fetchProductsFromFirestore();
    }

    const unsubscribeProducts = onSnapshot(collection(db, "products"), () => {
      fetchProductsFromFirestore();
    });

    return () => {
      unsubscribeProducts();
    };
  }, []);

  const addProduct = async (productData) => {
    try {
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, productData);
      console.log("Product added successfully", productData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addService = async (productId, serviceData) => {
    try {
      const servicesCollection = collection(
        db,
        `products/${productId}/services`
      );
      await addDoc(servicesCollection, {
        serviceData,
        productId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProductWithServices = async (productId) => {
    try {
      const servicesCollection = collection(
        db,
        `products/${productId}/services`
      );
      const querySnapshot = await getDocs(
        query(servicesCollection),
        where("productId", "==", productId)
      );

      const services = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      localStorage.setItem("services", JSON.stringify(services));

      setServices(services);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getProductServicesFromLocalStorage = () => {
    try {
      const storedServices = localStorage.getItem("services");
      return storedServices ? JSON.parse(storedServices) : [];
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const orderService = async (
    serviceId,
    orderData,
    user,
    productDetails,
    selectedService,
    isServiceActive
  ) => {
    try {
      const ordersCollection = collection(db, "orders");
      await addDoc(ordersCollection, {
        serviceId,
        orderData,
        isServiceActive,
      });

      const updatedUserMoney =
        user.userMoney - orderData.selectedService.serviceData.servicePrice;
      const updatedUserMoneySpent =
        user.userMoneySpent +
        +orderData.selectedService.serviceData.servicePrice;

      await updateDoc(doc(db, "users", user.userPhoneNumber || user.userId), {
        userMoney: updatedUserMoney,
        userMoneySpent: updatedUserMoneySpent,
        userAllOrders: user.userAllOrders + 1,
      });

      await updateDoc(
        doc(db, `products/${productDetails.id}/services/${selectedService.id}`),
        {
          serviceCountSold: selectedService.serviceCountSold + 1,
          "serviceData.serviceCountSold":
            selectedService.serviceData.serviceCountSold + 1,
        }
      );

      await updateDoc(doc(db, "products", productDetails.id), {
        productSold: productDetails.productSold + 1,
        productSoldMoney:
          productDetails.productSoldMoney +
          +orderData.selectedService.serviceData.servicePrice,
        productProfitMoney:
          productDetails.productProfitMoney +
          +orderData.selectedService.serviceData.serviceProfit,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const ordersCollection = collection(db, "orders");
      const querySnapshot = await getDocs(ordersCollection);

      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return orders;
    } catch (error) {
      console.log(error.message);
    }
  };

  const context = {
    products,
    services,
    addProduct,
    addService,
    fetchProductWithServices,
    getProductServicesFromLocalStorage,
    orderService,
    fetchAllOrders,
  };

  return (
    <UseProductContext.Provider value={context}>
      {children}
    </UseProductContext.Provider>
  );
};

export default ProductsContextProvider;
