import React from "react";
import Slider from "react-slick";
import Slide from "../components/Slide";
import banner1 from '../assets/banners/banner-1.webp';
import banner2 from '../assets/banners/banner-2.webp';
import banner3 from '../assets/banners/banner-3.webp';
import banner4 from '../assets/banners/banner-4.jpg';
const Hero:React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
  };
  const slideData =[
    {
        id:0,
        title:"Trending Item",
        mainTitle:"WOMEN'S LATEST FASION SALE",
        img:banner1,
        price:"200"
    },
    {
        id:1,
        title:"Trending Accessories",
        mainTitle:"WOMEN'S SUNGLASSES",
        img:banner2,
        price:"150"
    },
    {
        id:2,
        title:"Sale Offer",
        mainTitle:"NEW FASION SUMMER SALE",
        img:banner3,
        price:"200"
    },
    {
      id:2,
      title:"Winter Collection",
      mainTitle:"NEW FASION WINTER SALE",
      img:banner4,
      price:"200"
  }
    ]
  return (
    <div className="w-[99.20%] flex justify-center items-center">
      <div className="container pt-6  lg:pt-0">
        <Slider {...settings}>
          {slideData.map((item) => (
            <Slide
              key={item.id}
              title={item.title}
              mainTitle={item.mainTitle}
              img={item.img}
              price={item.price}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
