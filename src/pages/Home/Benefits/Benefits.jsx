import React from "react";
import img from "../../../assets/benefits.jpeg";
import icon1 from "../../../assets/icon1.png";
import icon2 from "../../../assets/icon2.jpeg";
import icon3 from "../../../assets/icon3.png";

const Benefits = () => {
  return (
    <div className=" my-20">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className=" w-1/2">
          <img
            className=" object-cover w-full h-[500px] rounded-3xl"
            src={img}
            alt="Album"
          />
        </figure>
        <div className="card-body w-1/2">
          <h2 className="card-title text-red-500 text-2xl italic font-serif">
            our benefits
          </h2>
          <h2 className="text-4xl font-extrabold py-3">WHY CHOOSE US!</h2>
          <p className=" text-gray-500">
            Join our sport summer camp to enjoy a fun-filled adventure, make new
            friends, and develop your skills in a supportive and energetic
            environment.
          </p>
          <div className="card-actions justify-start">
            <div className=" flex justify-evenly gap-14">
              <div className=" bg-[#FFF8EF] rounded-lg p-4">
                <img className=" w-28 h-28" src={icon1} alt="" />
                <p className=" pt-5 text-center font-bold text-[#422C18]">
                  Fun &amp; Fitness
                </p>
              </div>
              <div className=" bg-[#FFF8EF] rounded-lg p-4">
                <img className=" w-28 h-28" src={icon2} alt="" />
                <p className=" pt-5 text-center font-bold text-[#422C18]">
                  Expert Coaching
                </p>
              </div>
              <div className=" bg-[#FFF8EF] rounded-lg p-4">
                <img className=" w-28 h-28" src={icon3} alt="" />
                <p className=" pt-5 text-center font-bold text-[#422C18]">
                  Memorable Moments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
