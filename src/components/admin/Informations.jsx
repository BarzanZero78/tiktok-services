import React, { useEffect, useState } from "react";

const Informations = ({ allOrders, allUsers }) => {
  const [totalMoneySpent, setTotalMoneySpent] = useState(0);
  const [totalMoneyProfit, setTotalMoneyProfit] = useState(0);

  useEffect(() => {
    // Calculate total money
    const calculateTotalMoney = () => {
      let totalMoney = 0;
      let totalProfit = 0;

      for (const order of allOrders) {
        const orderTotal = order.orderData.selectedService.serviceData.servicePrice;
        totalMoney += orderTotal;
        const orderTotalProfit = order.orderData.selectedService.serviceData.serviceProfit;
        totalProfit += orderTotalProfit;
      }

      setTotalMoneySpent(totalMoney);
      setTotalMoneyProfit(totalProfit);
    };

    calculateTotalMoney();
  }, [allOrders]);

  return (
    <>
      <div className="flex flex-col justify-start items-start p-4 w-[250px] h-[125px] bg-[#D0F468] rounded-l-lg">
        <div className="flex justify-center items-center gap-4">
          <span className="material-icons bg-[#04040A] rounded-full w-[30px] h-[30px] flex justify-center items-center text-[#BFDC67]">
            shopping_bag
          </span>
          <p className="text-[#04040A] text-base">Total sales</p>
        </div>

        <div className="flex justify-center items-center p-2">
          <h3 className="text-xl font-bold text-[#04040A]">
          {totalMoneySpent.toLocaleString()}IQD
          </h3>
        </div>

        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-1">
            <span className="material-icons text-[#04040A] text-sm">
              north_east
            </span>
            <p className="text-[#04040A]">20.9%</p>
          </div>

          <div className="flex justify-center items-center gap-1">
            <p className="text-[#04040A]">+18.4K this week</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start p-4 w-[250px] h-[125px] border-r border-r-[#C5C5C5]/15 rounded-l-lg text-white">
        <div className="flex justify-center items-center gap-4">
          <span className="material-icons bg-[#353535] rounded-full w-[30px] h-[30px] flex justify-center items-center text-[#fff]">
            people
          </span>
          <p className="text-[#fff] text-base">Users</p>
        </div>

        <div className="flex justify-center items-center p-2">

            <h3 className="text-xl font-bold ">{allUsers.length.toLocaleString()}</h3>
        </div>

        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-1">
            <span className="material-icons text-[#D0F468] text-sm">
              north_east
            </span>
            <p className="text-[#D0F468]">20.9%</p>
          </div>

          <div className="flex justify-center items-center gap-1">
            <p className="text-[#919191]">+3.5K this week</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start p-4 w-[250px] h-[125px] border-r border-r-[#C5C5C5]/15 rounded-l-lg text-white">
        <div className="flex justify-center items-center gap-4">
          <span className="material-icons bg-[#353535] rounded-full w-[30px] h-[30px] flex justify-center items-center text-[#fff]">
            star_border
          </span>
          <p className="text-[#fff] text-base">Total orders</p>
        </div>

        <div className="flex justify-center items-center p-2">
          <h3 className="text-xl font-bold ">
            {allOrders.length.toLocaleString()}
          </h3>
        </div>

        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-1">
            <span className="material-icons text-[#D0F468] text-sm">
              north_east
            </span>
            <p className="text-[#D0F468]">4.2%</p>
          </div>

          <div className="flex justify-center items-center gap-1">
            <p className="text-[#919191]">+5K this week</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start p-4 w-[250px] h-[125px] rounded-l-lg text-white">
        <div className="flex justify-center items-center gap-4">
          <span className="material-icons bg-[#353535] rounded-full w-[30px] h-[30px] flex justify-center items-center text-[#fff]">
            undo
          </span>
          <p className="text-[#fff] text-base">Profit</p>
        </div>

        <div className="flex justify-center items-center p-2">
          <h3 className="text-xl font-bold ">{totalMoneyProfit.toLocaleString()}IQD</h3>
        </div>

        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-1">
            <span className="material-icons text-[#EB532F] text-sm">
              south_east
            </span>
            <p className="text-[#EB532F]">9.1%</p>
          </div>

          <div className="flex justify-center items-center gap-1">
            <p className="text-[#919191]">+66 this week</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Informations;
