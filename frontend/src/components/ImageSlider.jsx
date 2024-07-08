import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ImageSlider({ images }) {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop showIndicators={false}>
      {images.map((image) => (
        <div key={image}>
          <img
            className="w-full h-[250px] max-h-[250px]"
            alt={image}
            src={`${process.env.REACT_APP_SERVER_URL}/${image}`}
          ></img>
          {/* <p className="legend">Legend 1 </p> */}
        </div>
      ))}
    </Carousel>
  );
}
