import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import Classes from "../pages/Classes/Classes";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import EnrolledClasses from "../pages/Dashboard/enrolledClasses/enrolledClasses";
import InstructorClasses from "../pages/Dashboard/InstructorClasses/InstructorClasses";
import Feedback from "../pages/Dashboard/ManageClasses/Feedback";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import MyClass from "../pages/Dashboard/MyClass/MyClass";
import AllUsers from "../pages/Dashboard/MyClasses/AllUsers/AllUsers";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import InstructorPage from "../pages/InstructorsPage/InstructorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "myEnrolledClasses",
        element: <EnrolledClasses></EnrolledClasses>,
        loader: () => fetch("http://localhost:3000/payments"),
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
        loader: () => fetch("http://localhost:3000/payments"),
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "feedback/:id",
        element: (
          <AdminRoute>
            <Feedback></Feedback>
          </AdminRoute>
        ),
      },
      {
        path: "addclass",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "myclass",
        element: <MyClass></MyClass>,
      },
      {
        path: "instructorClasses",
        element: (
          <InstructorRoute>
            <InstructorClasses></InstructorClasses>
          </InstructorRoute>
        ),
      },
    ],
  },
]);
