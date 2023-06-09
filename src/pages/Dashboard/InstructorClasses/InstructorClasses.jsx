import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import useAuth from "../../../hooks/useAuth";

const InstructorClasses = () => {
  const { user } = useAuth();
  const { data: allClasses = [], refetch } = useQuery(
    ["allClasses"],
    async () => {
      const res = await fetch(
        `http://localhost:3000/classes?email=${user?.email}`
      );
      return res.json();
    }
  );

  return (
    <div className=" w-full">
      <Helmet>
        <title>Sporty Summer | My Classes</title>
      </Helmet>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Status</th>
                <th>Available Seats</th>
                <th>Price</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allClasses.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.classImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  {item.status === "approved" ? (
                    <>
                      <td>{item.status}</td>
                    </>
                  ) : item.status === "pending" ? (
                    <>
                      <td>{item.status}</td>
                    </>
                  ) : (
                    <>
                      <td>
                        <p className=" text-red-500">Feedback</p>
                        {item.feedback}
                      </td>
                    </>
                  )}
                  <td>
                    {item.availableSeats}
                    <br />
                  </td>
                  <td>
                    <span className="mr-1">&#8364;</span>
                    {item.price}
                  </td>
                  <td>
                    <button className="btn btn-xs bg-yellow-300 text-black hover:text-black">
                      Update
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

export default InstructorClasses;
