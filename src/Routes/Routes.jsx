import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import Classes from "../pages/Classes/Classes";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClass from "../pages/Dashboard/MyClass/MyClass";
import AllUsers from "../pages/Dashboard/MyClasses/AllUsers/AllUsers";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import Payment from "../pages/Dashboard/Payment/Payment";
import Home from "../pages/Home/Home/Home";
import InstructorPage from "../pages/InstructorsPage/InstructorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
        loader: () => fetch("http://localhost:3000/class"),
      },
      {
        path: "/instructors",
        element: <InstructorPage></InstructorPage>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myclasses",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "allusers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "addclass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myclass",
        element: <MyClass></MyClass>,
      },
    ],
  },
]);
