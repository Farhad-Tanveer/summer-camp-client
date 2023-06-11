import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import { AuthContext } from "../../providers/AuthProvider";

const Classes = () => {
  const classes = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddToCart = (item) => {
    // console.log(item);
    if (!selectedItems.includes(item._id)) {
      if (user && user.email) {
        const addItem = {
          classItemId: item._id,
          image: item.classImage,
          instructorName: item.instructorName,
          availableSeats: item.availableSeats,
          price: item.price,
          email: user?.email,
          className: item.className,
          classImage: item.classImage,
        };
        fetch("https://summer-camp-server-seven.vercel.app/carts", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(addItem),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              setSelectedItems((prevSelectedItems) => [
                ...prevSelectedItems,
                item._id,
              ]);
              Swal.fire("class added on the cart");
            }
          });
      } else {
        Swal.fire({
          title: "Please login to add the class",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login Now!",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", { state: { from: location } });
          }
        });
      }
    }
  };

  // sort the classes
  const approvedClasses = classes.filter((item) => item.status === "approved");

  return (
    <div>
      <Helmet>
        <title>Sporty Summer | Classes</title>
      </Helmet>
      <div>
        <div className=" text-center my-20">
          <p className=" text-red-600 text-2xl italic font-serif">
            Welcome to our
          </p>
          <h1 className=" text-5xl font-extrabold tracking-wider py-3">
            All CLASSES
          </h1>
        </div>
      </div>
      <div className=" grid lg:grid-cols-3 gap-5 max-w-screen-xl mx-auto my-20">
        {approvedClasses.map((item) => (
          <div
            className={`card card-compact w-96 bg-base-100 shadow-xl ${
              item.availableSeats === 0 ? "bg-red-400 text-white" : ""
            }`}
            key={item._id}
          >
            <figure>
              <img className=" w-full h-80" src={item.classImage} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.className}</h2>
              <p>{item.instructorName}</p>
              <div className="card-actions justify-between items-center">
                <div className="badge badge-outline">
                  Availaible Seats: {item.availableSeats}
                </div>
                <div className="badge badge-outline">Price: {item.price}</div>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={
                    selectedItems.includes(item._id) ||
                    item.availableSeats === 0 ||
                    (user && (isAdmin || isInstructor))
                  }
                  className={`btn btn-sm ${
                    selectedItems.includes(item._id) ||
                    item.availableSeats === 0 ||
                    (user && (isAdmin || isInstructor))
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#848c2f] hover:bg-[#606622]"
                  } text-white`}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
