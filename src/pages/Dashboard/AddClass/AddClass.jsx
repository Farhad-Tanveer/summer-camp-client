import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddClass = () => {
  const { user } = useAuth();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.classImage[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            className,
            instructorName,
            instructorEmail,
            availableSeats,
            price,
          } = data;
          const newClass = {
            className,
            instructorName,
            instructorEmail,
            availableSeats: parseFloat(availableSeats),
            price: parseFloat(price),
            classImage: imgURL,
            status: "pending",
            enrolled: 0,
          };
          // console.log(newClass);

          fetch("http://localhost:3000/class", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newClass),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your class has been added",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };
  // console.log(img_hosting_url);

  return (
    <>
      <Helmet>
        <title>Sporty Summer|Add a Class</title>
      </Helmet>
      <div className=" w-3/4 px-20  border-2 mx-auto">
        <div className=" text-center my-20">
          <h1 className=" text-5xl font-extrabold tracking-wider py-3 uppercase">
            ADD A Class
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-2 gap-5">
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-semibold">Class Name*</span>
              </label>
              <input
                type="text"
                placeholder="Class Name"
                {...register("className", { required: true, maxLength: 120 })}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Name*
                </span>
              </label>
              <input
                type="text"
                placeholder="Instructor Name"
                {...register("instructorName", {
                  required: true,
                  maxLength: 120,
                })}
                defaultValue={user.displayName}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Email*
                </span>
              </label>
              <input
                type="text"
                placeholder="Instructor Email"
                {...register("instructorEmail", {
                  required: true,
                  maxLength: 120,
                })}
                defaultValue={user.email}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Available Seats*
                </span>
              </label>
              <input
                type="text"
                placeholder="Available Seats"
                {...register("availableSeats", {
                  required: true,
                  maxLength: 120,
                })}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-semibold">Price*</span>
              </label>
              <input
                type="text"
                placeholder="Price"
                {...register("price", { required: true, maxLength: 120 })}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Class Image*</span>
              </label>
              <input
                type="file"
                {...register("classImage", { required: true })}
                className="file-input file-input-bordered w-full "
              />
            </div>
          </div>
          <input className="btn btn-sm my-5" type="submit" value="Add Class" />
        </form>
      </div>
    </>
  );
};

export default AddClass;
