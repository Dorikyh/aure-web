import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    axios.get("https://api.dorikyh.pw/bot/popular_servers?sfw=true")
      .then(response => {
        setServers(response.data);
      })
      .catch(error => {
        console.error("Error fetching the servers data:", error);
      });
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoPlay: true,
    autoSlide: true,
  
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {servers.map((server, index) => (
          <div key={index}>
            <div className="mx-2 bg-gray-300 dark:bg-gray-800 rounded-xl">
              <div className="flex flex-col items-center justify-center p-4">
                <img src={server.icon} alt={server.name} className="rounded-full w-20 h-20" />
                <h3 className="dark:text-white text-lg font-semibold mt-2">{server.name.slice(0, 18)}</h3>
                <p className="dark:text-gray-400 text-lg mt-1">{server.member_count.toLocaleString()} members</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
