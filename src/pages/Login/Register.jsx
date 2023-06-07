import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);

    if (data.password !== data.confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUser(data.name, data.photoURL)
        .then(() => {
          reset();
          Swal.fire("Successfully created User");
          navigate("/");
        })
        .catch((error) => console.log(error));
    });
  };
  return (
    <>
      <Helmet>
        <title>Sporty Summer | Signup</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card md:w-1/2 max-w-lg shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="name"
                  name="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className=" text-red-600">Name field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  {...register("photoURL", { required: true })}
                  type="text"
                  placeholder="photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className=" text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className=" text-red-600">Email field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[@$!%*#?&])/,
                  })}
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <span className=" text-red-600">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className=" text-red-600">
                    Password must be 6 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className=" text-red-600">
                    Password must have one uppercase and one special character
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                  type="password"
                  placeholder="confirm password"
                  name="confirmPassword"
                  className="input input-bordered"
                />
                {errors.confirmPassword?.type === "required" && (
                  <span className="text-red-600">
                    Confirm password is required
                  </span>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <span className="text-red-600">Passwords do not match</span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Signup"
                />
              </div>
            </form>
            <p>
              <small>
                New Here? <Link to="/login">Have an account</Link>
              </small>
            </p>
          </div>
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Signup now!</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
