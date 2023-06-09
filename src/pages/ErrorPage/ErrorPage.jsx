import { Link, useRouteError } from "react-router-dom";
import img from "./error.json";
import Lottie from "lottie-react";

export default function ErrorPage() {
  const error = useRouteError();
  //   console.error(error);

  return (
    <div id="error-page">
      <div className="h-screen w-full flex flex-col justify-center items-center bg-[#F2F2F3]">
        <Lottie animationData={img}></Lottie>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              <Link to="/">Go Home</Link>
            </span>
          </a>
        </button>
      </div>
    </div>
  );
}
