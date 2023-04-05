import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Pagination, FreeMode } from "swiper";

export default function Slider({ children }) {

    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}

                pagination={{
                    clickable: true,
                }}
                freeMode={true}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
            >
                {children}
            </Swiper>
        </>
    );
}
