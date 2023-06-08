import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const AddClass = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className=" w-3/4 px-20  border-2 mx-auto">
      <div className=" text-center my-20">
        <h1 className=" text-5xl font-extrabold tracking-wider py-3">
          Add A CLASS
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
              <span className="label-text font-semibold">Instructor Name*</span>
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
              <span className="label-text font-semibold">Available Seats*</span>
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
  );
};

export default AddClass;
