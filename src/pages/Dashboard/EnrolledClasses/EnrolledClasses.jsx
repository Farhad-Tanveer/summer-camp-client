import React from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";

const EnrolledClasses = () => {
  const enrolledClasses = useLoaderData();

  return (
    <div className=" w-full">
      <Helmet>
        <title>Sporty Summer | My Enrolled Classes</title>
      </Helmet>
      <div>
        <div className=" uppercase font-semibold h-[60px] flex justify-evenly">
          <h3 className=" text-3xl">
            Total Enrolled Classes: {enrolledClasses.length}{" "}
          </h3>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Class Name</th>
                <th>Purchase Date</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {enrolledClasses.map((item, index) => (
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
                  <td>
                    {item.itemName}
                    <br />
                  </td>
                  <td>
                    {item.date}
                    <br />
                  </td>
                  <td>
                    <span className="mr-1">&#8364;</span>
                    {item.price}
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

export default EnrolledClasses;
