import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-[#d3665f] text-white text-xl">
            {/* Sidebar content here */}
            <li>
              <NavLink>
                <FaShoppingCart></FaShoppingCart> My Selected Classes
              </NavLink>
            </li>
            <li>
              <NavLink>
                <FaWallet></FaWallet> My Enrolled CLasses
              </NavLink>
            </li>
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
