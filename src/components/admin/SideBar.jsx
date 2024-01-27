import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProduct } from "../../context/ProductsContext";
import { useAuth } from "../../context/AuthContext";

const SideBar = () => {
  const [showProduct, setShowProduct] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const { products } = useProduct();
  const location = useLocation();
  const { getUsers } = useAuth();
  const { fetchAllOrders } = useProduct();
  const [allOrders, setAllOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchUserEmail, setSearchUserEmail] = useState("");

  useEffect(() => {
    getAllOrders();
    fetchUsers();
  }, [fetchAllOrders, getUsers]);

  const getAllOrders = async () => {
    const data = await fetchAllOrders();
    setAllOrders(data);
  };

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const newOrders = allOrders.filter(
    (allOrder) => allOrder.isServiceActive == false
  );

  const activeOrders = allOrders.filter(
    (allOrder) => allOrder.isServiceActive === true
  );

  const isNavActive = (pathname) => {
    const url = location.pathname === pathname;
    return url;
  };

  const handleSearch = (e) => {
    setSearchUserEmail(e.target.value);
  };

  const searchUserEmails = users.filter((user) =>
    user.userEmail.toLowerCase().includes(searchUserEmail.toLowerCase())
  );

  return (
    <div
      className={`flex flex-col justify-start font-sans items-start p-3 max-w-[300px] bg-[#24232a] ${
        location.pathname === "/home/admin/orders" || "/home/admin/user"
          ? "fixed"
          : ""
      }`}
    >
      <div className="border-r border-r-[#C5C5C5]/30 border-b border-b-[#C5C5C5]/30 rounded-e-3xl w-[200px] h-[70px] p-4">
        <a href='/home/admin' className="text-lg font-bold px-2 text-[#C5C5C5]">
          TikTok Services
        </a>
      </div>

      <div className="flex flex-col justify-start items-start list-none p-6 gap-6 w-[200px] h-[400px] border-b border-b-[#C5C5C5]/30 rounded-e-3xl border-t border-t-[#C5C5C5]/30 border-r border-r-[#C5C5C5]/30">
        <Link to="/home/admin" className="active:scale-95">
          <li
            className={`flex flex-row-reverse justify-center items-center gap-2 ${
              isNavActive("/home/admin") ? "text-[#F1FE79]" : "text-[#c5c5c5]"
            }`}
          >
            <span>Overview</span>
            <div>
              <span className={`material-icons`}>leaderboard</span>
            </div>
          </li>
        </Link>

        <button
          className="active:scale-95 flex justify-between items-center w-full transition duration-100 ease-in-out"
          onClick={() => setShowProduct(!showProduct)}
        >
          <li className="flex flex-row justify-between w-full items-center">
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-row-reverse justify-center items-center gap-2">
                <span className="text-[#c5c5c5] hover:text-[#fff] ease-in-out transition duration-100">
                  Product
                </span>
                <div>
                  <box-icon
                    name="shopping-bag"
                    style={{ fill: "#c5c5c5" }}
                  ></box-icon>
                </div>
              </div>

              <div>
                <box-icon
                  name="chevron-down"
                  style={{ fill: "#C5C5C5" }}
                ></box-icon>
              </div>
            </div>
          </li>
        </button>

        {showProduct && (
          <div className="flex flex-col justify-start items-start gap-3 h-[100px] overflow-y-auto w-full">
            <a
              href="/home/admin/add_product"
              className="flex flex-row-reverse justify-center items-center text-[#C5C5C5] hover:text-[#FFF] ease-in-out duration-100 active:scale-95 p-1 gap-1 border-b border-b-[#C5C5C5]/15 w-full"
            >
              <p className="">Add Product</p>
              <span className="">+</span>
            </a>

            {products.map((product, index) => (
              <Link
                to={`/home/admin/product/${product.productSlug}/services`}
                className="flex flex-row-reverse justify-center items-center text-[#C5C5C5] hover:text-[#FFF] ease-in-out duration-100 active:scale-95 p-1 gap-1 border-b border-b-[#C5C5C5]/15 w-full"
                key={index}
              >
                <p>{product.productName}</p>
                <img
                  src={product.productImageURL}
                  className="w-[25px] h-[25px] object-cover"
                  alt=""
                />
              </Link>
            ))}
          </div>
        )}

        <button
          className="active:scale-95 flex justify-between items-center w-full transition duration-100 ease-in-out"
          onClick={() => setShowCustomers(!showCustomers)}
        >
          <li className="flex flex-row justify-between w-full items-center">
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-row-reverse justify-center items-center gap-2">
                <span className="text-[#c5c5c5] hover:text-[#fff] ease-in-out transition duration-100">
                  Customers
                </span>
                <div>
                  <box-icon name="user" style={{ fill: "#c5c5c5" }}></box-icon>
                </div>
              </div>

              <div>
                <box-icon
                  name="chevron-down"
                  style={{ fill: "#C5C5C5" }}
                ></box-icon>
              </div>
            </div>
          </li>
        </button>

        {showCustomers && (
          <div className="flex flex-col justify-start items-start gap-3 h-[100px] overflow-y-auto w-full">
            <input
              type="email"
              className="bg-[#24232a] focus:outline-none border border-[#C5C5C5]/15 rounded-lg p-1 w-full"
              placeholder="Search User Email"
              value={searchUserEmail}
              onChange={handleSearch}
            />

            {searchUserEmails.map((user, index) => (
              <a
                href={`/home/admin/user/${user.userName}`}
                className="flex flex-row-reverse justify-end items-center text-[#C5C5C5] hover:text-[#FFF] ease-in-out duration-100 active:scale-95 p-1 gap-1 border-b border-b-[#C5C5C5]/15 w-full"
                key={index}
              >
                <p>{user.userName}</p>
                <img
                  src={user.userImageURL}
                  className="w-[25px] h-[25px] object-cover rounded-full"
                  alt=""
                />
              </a>
            ))}
          </div>
        )}

        <Link
          to="/home/admin/orders"
          className={`active:scale-95 flex justify-between items-center w-full  ${
            isNavActive("/home/admin/orders") ? "text-[#fff]" : "text-[#c5c5c5]"
          } hover:text-[#fff] text-[#C5C5C5] ease-in-out transition duration-100`}
          title={`You have ${newOrders.length} new orders`}
        >
          <li className={`flex flex-row-reverse justify-center items-center`}>
            <span>Orders</span>
            <div>
              <box-icon name="book-alt" style={{ fill: "#C5C5C5" }}></box-icon>
            </div>
          </li>

          <div className="">
            {newOrders.length > 0 ? (
              <span className="bg-[#EA512D] rounded-md w-[20px] h-[20px] p-1 flex justify-center items-center">
                {newOrders.length}
              </span>
            ) : (
              <></>
            )}
          </div>
        </Link>

        <Link
          to="/home/admin/active_orders"
          className={`active:scale-95 flex justify-between items-center w-full  ${
            isNavActive("/home/admin/active_orders")
              ? "text-[#fff]"
              : "text-[#c5c5c5]"
          } hover:text-[#fff] text-[#C5C5C5] ease-in-out transition duration-100`}
        >
          <li className="flex flex-row-reverse justify-center items-center">
            <span>Active Orders</span>
            <div>
              <box-icon name="cart" style={{ fill: "#c5c5c5" }}></box-icon>
            </div>
          </li>

          <div className="">
            {activeOrders.length > 0 ? (
              <span className="bg-[#EA512D] rounded-md w-[20px] h-[20px] p-1 flex justify-center items-center">
                {activeOrders.length}
              </span>
            ) : (
              <></>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
