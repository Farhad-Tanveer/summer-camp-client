import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "../../../assets/images/banner/banner1.jpeg";
import img2 from "../../../assets/images/banner/banner2.jpeg";
import img3 from "../../../assets/images/banner/banner3.jpeg";
import img4 from "../../../assets/images/banner/banner4.jpeg";

const Banner = () => {
  return (
    <div className=" text-center ">
      <Carousel>
        <div className="relative w-full h-full">
          <img
            src={img1}
            className="object-cover w-full h-full"
            alt="Banner 1"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-2xl text-yellow-400 italic font-serif">
                Sports, fun, and friends
              </h2>
              <p className=" text-8xl font-extrabold tracking-wide w-[700px] py-7">
                Summer Camp starts here!
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full">
          <img
            src={img2}
            className="object-cover w-full h-full"
            alt="Banner 1"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-2xl text-yellow-400 italic font-serif">
                Calling all athletes
              </h2>
              <p className=" text-8xl font-extrabold tracking-wide w-[700px] py-7">
                Your ultimate summer camp experience!
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full">
          <img
            src={img3}
            className="object-cover w-full h-full"
            alt="Banner 1"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-2xl text-yellow-400 italic font-serif">
                Summer Camp
              </h2>
              <p className=" text-8xl font-extrabold tracking-wide w-[700px] py-7">
                Where champions are made!
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full">
          <img
            src={img4}
            className="object-cover w-full h-full"
            alt="Banner 1"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <h2 className="text-2xl text-yellow-400 italic font-serif">
                thrill of summer sports
              </h2>
              <p className=" text-8xl font-extrabold tracking-wide w-[700px] py-7">
                Discover the joy of sports!
              </p>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
