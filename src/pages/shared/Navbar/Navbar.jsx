import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import logo from "../../../assets/logo.png";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link>Instructors</Link>
      </li>
      <li>
        <Link to="/classes">Classes</Link>
      </li>
      <li>
        <Link
          to={
            isAdmin
              ? "/dashboard/allusers"
              : isInstructor
              ? "/dashboard/myclass"
              : "/dashboard/myclasses"
          }
        >
          Dashboard
        </Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar max-w-screen-2xl bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/">
            <a className="btn btn-ghost normal-case text-xl">
              <img className=" w-16" src={logo} alt="" />
              <span className=" text-3xl hidden lg:block font-bold text-[#422C18]">
                Sporty Summer
              </span>
            </a>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl font-serif font-light text-gray-600">
            {navOptions}
          </ul>
        </div>
        <div className="navbar-end">
          {user && (
            <div className="tooltip tooltip-left" data-tip={user.displayName}>
              <img
                src={user.photoURL}
                className="w-10 h-10 rounded-full border border-black "
              ></img>
            </div>
          )}

          {user ? (
            <button
              onClick={handleLogOut}
              className="btn  bg-[#848c2f] hover:bg-[#606622] text-white ml-5"
              variant="dark"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button
                className="btn text-white bg-[#848c2f] hover:bg-[#606622] "
                variant="dark"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
