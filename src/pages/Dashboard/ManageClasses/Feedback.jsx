import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const Feedback = () => {
  const { id } = useParams();
  console.log(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch(`http://localhost:3000/class/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className=" w-full">
      <Helmet>
        <title>Sporty Summer | Manage Classes</title>
      </Helmet>
      <h2 className=" text-center text-3xl font-bold mt-10">Send Feedback</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Feedback</span>
          </label>
          <textarea
            {...register("feedback", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="write your feedback"
          ></textarea>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default Feedback;
