import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Informations from "./Informations";
import { useProduct } from "../../context/ProductsContext";
import { useAuth } from "../../context/AuthContext";
import { Chart } from "chart.js/auto";

const AdminHeader = ({ userData }) => {
  const { products, fetchAllOrders } = useProduct();
  const [allOrders, setAllOrders] = useState([]);
  const { getUsers } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const chartRef = useRef(null);
  const [top3TotalMoneyProfit, setTop3TotalMoneyProfit] = useState(0);
  const [serviceSales, setServiceSales] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [getUsers]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setAllUsers(data);
  };

  useEffect(() => {
    getAllOrders();
  }, [fetchAllOrders]);

  const getAllOrders = async () => {
    const data = await fetchAllOrders();
    setAllOrders(data);
  };

  const newOrders = allOrders.filter(
    (allOrder) => allOrder.isServiceActive == false
  );

  const sortedProducts = [...products].sort(
    (a, b) => b.productSold - a.productSold
  );

  // Get the top 3 most sales products
  const top3Products = sortedProducts.slice(0, 3);
  const mapTop3Products = top3Products.map(
    (top3Product) => top3Product.productProfitMoney
  );

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const colors = ["#E74D2B", "#D4F570", "#55757C"];
    const data = top3Products.map((product) => product.productSold);
    const labels = top3Products.map((product) => product.productName);

    const myDoughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: colors,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
      },
    });

    // Cleanup the chart on component unmount
    return () => myDoughnutChart.destroy();
  }, [top3Products]);

  useEffect(() => {
    const calculateServiceSales = () => {
      const groupedOrders = allOrders.reduce((acc, order) => {
        const serviceName =
          order.orderData.selectedService.serviceData.serviceName;

        if (!acc[serviceName]) {
          acc[serviceName] = {
            id: order.serviceId,
            serviceName,
            count: 0,
            price: order.orderData.selectedService.serviceData.servicePrice,
            productSlug: order.orderData.productSlug,
          };
        }

        // Increment the count for the service
        acc[serviceName].count += 1;

        return acc;
      }, {});

      const serviceSalesArray = Object.values(groupedOrders);
      setServiceSales(serviceSalesArray);
    };

    calculateServiceSales();
  }, [allOrders]);

  useEffect(() => {
    const calculateTop3MostProductsProfitMoney = () => {
      let top3ProductsProfitMoney = 0;

      for (const product of top3Products) {
        let top3ProductsTotalProfit = product.productProfitMoney;
        top3ProductsProfitMoney += top3ProductsTotalProfit;
      }

      setTop3TotalMoneyProfit(top3ProductsProfitMoney);
    };

    calculateTop3MostProductsProfitMoney();
  }, [top3Products]);

  return (
    <div className="flex font-sans flex-col justify-end items-end gap-6 p-7">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col justify-start items-start gap-1">
          <h3 className="text-lg font-bold">
            Welcome back, {userData.userName}
          </h3>
          <p className="text-sm text-[#c5c5c5]/70">
            Here's what's happening with{" "}
            <span className="font-bold">TikTok Services</span> store
          </p>
        </div>

        <div className="flex justify-center items-center gap-10">
          <Link
            to="/home/admin/orders"
            className="flex justify-center items-center active:scale-95 relative"
            title="New orders"
          >
            {newOrders.length > 0 ? (
              <span className="absolute -top-2 -left-1 bg-red-400 rounded-full w-[20px] h-[20px] p-1 flex justify-center items-center">
                {newOrders.length}
              </span>
            ) : (
              <></>
            )}

            <span className="material-icons text-2xl">notifications_none</span>
          </Link>

          <div className="flex justify-center items-center gap-3">
            <img
              src={userData.userImage}
              className="w-[35px] h-[35px] rounded-full object-cover"
              alt=""
            />
            <h3 className="text-base">{userData.userName}</h3>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-start items-start gap-3 bg-[#1E1E1E] h-[125px] rounded-lg">
        <Informations
          allOrders={allOrders}
          allUsers={allUsers}
          userData={userData}
        />
      </div>

      <div className="flex justify-around items-center w-full p-3">
        <div className="flex flex-col justify-start items-start p-5 gap-3 bg-[#191919] rounded-lg w-[700px] h-[170px]">
          <div className="flex justify-between items-center gap-3 w-full sticky top-0 left-0 bg-[#191919]">
            <h3 className="text-lg font-bold">Top product</h3>

            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="w-[300px] py-1.5 px-2 rounded-md focus:outline-none bg-[#191919] border border-[#C5C5C5]/30"
              />

              <select className="w-[125px] p-1 border border-[#c5c5c5]/30 cursor-pointer rounded-md focus:outline-none bg-[#191919]">
                <option value="">This week</option>
                <option value="">Last week</option>
                <option value="">This year</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <div className="sticky top-0 left-0 flex justify-between items-center w-full">
              <div className="sticky top-0 left-0 text-[#c5c5c5]/30 font-normal flex justify-between items-center w-full">
                <p className="">Service Name</p>
                <p className="">Order ID</p>
                <p className="">Price</p>
                <p className="">Sold</p>
                <p className="">Sales</p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center w-full h-[60px] overflow-y-auto">
            {serviceSales.map((service, index) => (
                <div className="flex justify-between items-center w-full" key={index}>
                  <p className=" capitalize">{service.serviceName} {service.productSlug} </p>
                  <p className="px-3 w-[120px] truncate">{service.id}</p>
                  <p className="">
                    {service.price.toLocaleString()}IQD
                  </p>
                  <p className="">{service.count}</p>
                  <p className="">
                    {(service.price * service.count).toLocaleString()}IQD
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start gap-3 bg-[#1d1d1d] w-[250px] h-[325px] p-3 rounded-lg">
          <h3 className="text-lg font-medium">Sales by product</h3>

          <div className="mx-auto w-[150px] h-[150px] relative">
            <canvas ref={chartRef} className="cursor-pointer"></canvas>

            <p className="absolute top-[70px] right-[52px] text-sm">
              {top3TotalMoneyProfit.toLocaleString()}IQD
            </p>
          </div>

          {top3Products.map((product, index) => (
            <div
              className="flex flex-col justify-start items-start gap-3"
              key={index}
            >
              <div className="flex justify-center items-center gap-1">
                <span
                  className={`w-[8px] h-[8px] rounded-full ${
                    index === 0
                      ? "bg-[#E74D2B]"
                      : index === 1
                      ? "bg-[#D4F570]"
                      : "bg-[#55757C]"
                  }`}
                ></span>
                <p className="capitalize">{product.productSlug}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
