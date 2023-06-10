import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch(
      "https://summer-camp-server-seven.vercel.app/users"
    );
    return res.json();
  });

  const handleMakeAdmin = (user) => {
    fetch(
      `https://summer-camp-server-seven.vercel.app/users/admin/${user._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire(`${user.name} is admin now!`);
        }
      });
  };

  const handleMakeInstructor = (user) => {
    fetch(
      `https://summer-camp-server-seven.vercel.app/users/instructor/${user._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire(`${user.name} is instructor now!`);
        }
      });
  };

  return (
    <div className=" w-full ms-10">
      <div>
        <Helmet>
          <title>Sporty Summer | All Users</title>
        </Helmet>
        <h3 className=" text-3xl font-semibold my-4">
          Total Users: {users.length}
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm bg-orange-600"
                      >
                        <span className=" text-white font-normal">Admin</span>
                      </button>
                    )}
                  </td>
                  <td>
                    {user.role === "instructor" ? (
                      "instructor"
                    ) : (
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-sm bg-orange-600"
                      >
                        <span className=" text-white font-normal">
                          Instructor
                        </span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
