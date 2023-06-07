import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGofore } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  //   const state = location.state?.from?.state || null;

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        // navigate(from, { replace: true });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          alert("Invalid email or password.");
        } else {
          alert(errorMessage);
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Helmet>
        <title>Sporty Summer | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">login</button>
              </div>
            </form>
            <Link to="/register">
              <button className="btn btn-link">
                New to this site? Please Register
              </button>
            </Link>
            <h4 className="mt-2 mb-2 text-center">Login With</h4>
            <div className="form-control">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline mb-3 mx-7 "
                variant="outline-primary"
              >
                <FaGofore className="mr-2 " />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
