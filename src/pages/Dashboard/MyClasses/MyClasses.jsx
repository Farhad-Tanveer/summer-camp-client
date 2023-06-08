import React from "react";
import { Helmet } from "react-helmet";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";

const MyClasses = () => {
  const [cart, refetch] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className=" w-full">
      <Helmet>
        <title>Sporty Summer | My Classes</title>
      </Helmet>
      <div>
        <div className=" uppercase font-semibold h-[60px] flex justify-evenly">
          <h3 className=" text-3xl">Total Items: {cart.length} </h3>
          <h3 className=" text-3xl">Total Price: {total}</h3>
          <Link to="/dashboard/payment">
            <button className=" btn btn-warning btn-sm">Pay</button>
          </Link>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Instructor Name</th>
                <th>Available Seats</th>
                <th>Price</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.instructorName}
                    <br />
                  </td>
                  <td>
                    {item.availableSeats}
                    <br />
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-square btn-sm bg-red-700 text-white hover:text-black"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
