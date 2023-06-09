import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaUsers,
  FaWallet,
  FaBook,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  //TODO: load data from the server
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

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
          <ul className="menu p-4 w-80 h-full bg-[#121827] text-white text-xl">
            {/* Sidebar content here */}

            {isAdmin ? (
              <>
                <h1>Admin</h1>
                <li>
                  <NavLink to="/">
                    <FaHome></FaHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageClasses">
                    <FaBook></FaBook> Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allusers">
                    <FaUsers></FaUsers> Manage Users
                  </NavLink>
                </li>
              </>
            ) : isInstructor ? (
              <>
                {" "}
                <h1>Instructor</h1>
                <li>
                  <NavLink to="/">
                    <FaHome></FaHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addclass">
                    <FaBook></FaBook> Add a Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/instructorClasses">
                    <FaWallet></FaWallet> My Classes
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <h1>User</h1>
                <li>
                  <NavLink to="/">
                    <FaHome></FaHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myclasses">
                    <FaShoppingCart></FaShoppingCart> My Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    <FaWallet></FaWallet> My Enrolled CLasses
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
