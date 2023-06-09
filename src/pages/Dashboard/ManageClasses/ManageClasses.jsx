import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const { data: allClasses = [], refetch } = useQuery(
    ["allClasses"],
    async () => {
      const res = await fetch("http://localhost:3000/class");
      return res.json();
    }
  );
  //   console.log(allClasses);
  const handleApprove = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You make it Approve!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/class/approve/${item._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Approved!",
                "Your class has been Approved.",
                "success"
              );
            }
          });
      }
    });
  };
  const handleDeny = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Deny!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deny it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/class/deny/${item._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Denied!", "Your class has been Denied.", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Sporty Summer | Manage Classes</title>
      </Helmet>
      <h2 className=" text-center text-3xl font-bold mt-10">
        Manage All Classes
      </h2>
      <div className="overflow-x-auto w-full mt-20">
        <h1 className=" text-xl font-bold">Total Class: {allClasses.length}</h1>
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Class Image</th>
              <th>Instructor Name/Email</th>
              <th>Class Name</th>
              <th>Available seats</th>
              <th>Price</th>
              <th className=" text-center">Actions</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allClasses.map((classItem) => (
              <>
                <tr>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded">
                        <img src={classItem.classImage} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{classItem.instructorName}</div>
                    <div>{classItem.instructorEmail}</div>
                  </td>
                  <td>{classItem.className}</td>
                  <td>{classItem.availableSeats}</td>
                  <td>
                    <span>&euro;</span> {classItem.price}
                  </td>
                  <td>
                    <>
                      <button
                        className="btn btn-xs mx-1 bg-green-300"
                        onClick={() => handleApprove(classItem)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn bg-red-300 btn-xs mx-1"
                        onClick={() => handleDeny(classItem)}
                      >
                        Deny
                      </button>
                      {/* Open the modal using ID.showModal() method */}
                      <button
                        className="btn btn-xs bg-yellow-300"
                        onClick={() => window.my_modal_5.showModal()}
                      >
                        FeedBack
                      </button>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <form method="dialog" className="modal-box">
                          <textarea
                            className="border border-gray-300 rounded p-2 mb-4"
                            placeholder="Enter your feedback"
                            // value={feedback}
                            // onChange={handleInputChange}
                          ></textarea>
                          <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                          </div>
                        </form>
                      </dialog>
                    </>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
