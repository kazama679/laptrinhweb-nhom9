<template>
  <div>
    <!-- Swiper component -->
    <swiper
  :spaceBetween="30"
  :centeredSlides="true"
  :autoplay="{
    delay: 4500,
    disableOnInteraction: false,
  }"
  :pagination="{
    clickable: true,
  }"
  :navigation="true"
  :loop="true"
  :modules="modules"
  @slideChange="onSlideChange"
  class="mySwiper"
>
  <!-- Swiper slide với hình ảnh và chữ có hiệu ứng di chuyển -->
  <swiper-slide>
    <img :src="anh1" alt="Slide 1" class="w-full h-auto object-cover" />
    <div class="banner-text">
      <h2 class="slide-in-right">35% OFF</h2>
      <h1 class="slide-in-left">SALE</h1>
    </div>
  </swiper-slide>

  <swiper-slide>
    <img :src="anh2" alt="Slide 2" class="w-full h-auto object-cover" />
    <div class="banner-text">
      <h2 class="slide-in-right">35% OFF</h2>
      <h1 class="slide-in-left">EXTRA</h1>
    </div>
  </swiper-slide>

  <swiper-slide>
    <img :src="anh3" alt="Slide 3" class="w-full h-auto object-cover" />
    <div class="banner-text">
      <h2 class="slide-in-right">UPTO</h2>
      <h1 class="slide-in-left">9% OFF</h1>
    </div>
  </swiper-slide>
</swiper>


    <div class="myBox flex justify-center">
      <div
        class="bg-red-400 mt-12 p-16 px-32 text-white flex flex-col justify-center items-center self-end"
      >
        <h3 class="font-bold text-xl">BUY 1 ITEMS GET 1</h3>
        <h1 class="text-6xl font-bold my-4">FREE</h1>
        <!-- Đường kẻ và text "LEARN MORE" -->
        <div class="divider"></div>
        <a href="#" class="mt-4 learn-more">LEARN MORE</a>
      </div>
      <!-- Right Card -->
      <div
        class="bg-yellow-500 mb-12 p-16 px-32 text-white flex flex-col justify-center items-center"
      >
        <h3 class="font-bold text-xl">EVENING HEADPHONE</h3>
        <h1 class="text-6xl font-bold my-4">2024</h1>
        <!-- Đường kẻ và text "LEARN MORE" -->
        <div class="divider"></div>
        <a href="#" class="mt-4 learn-more">LEARN MORE</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import anh1 from "@/assets/images/banner1.jpeg";
import anh2 from "@/assets/images/banner2.avif";
import anh3 from "@/assets/images/banner3.avif";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper modules
const modules = [Autoplay, Pagination, Navigation];

// Hàm xử lý sự kiện khi chuyển slide
const onSlideChange = () => {
  const leftTextElements = document.querySelectorAll(".slide-in-left");
  const rightTextElements = document.querySelectorAll(".slide-in-right");

  // Loại bỏ animation cũ cho các phần tử bên trái
  leftTextElements.forEach((el) => {
    el.style.animation = "none";
  });

  // Loại bỏ animation cũ cho các phần tử bên phải
  rightTextElements.forEach((el) => {
    el.style.animation = "none";
  });

  // Sau một khoảng thời gian ngắn, thêm lại animation để khởi động lại cho cả hai hướng
  setTimeout(() => {
    leftTextElements.forEach((el) => {
      el.style.animation = "";
      el.classList.add("slide-in-left");
    });
    rightTextElements.forEach((el) => {
      el.style.animation = "";
      el.classList.add("slide-in-right");
    });
  }, 50);
};
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: 700px;
  position: relative;
  z-index: 1;
}

.mySwiper img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Styling cho phần chữ trong banner */
.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-family: Arial, sans-serif;
}

/* Hiệu ứng di chuyển chữ từ trái sang phải */
@keyframes slideInLeft {
  0% {
    transform: translateX(-100%);
    /* opacity: 0; */
  }

  100% {
    transform: translateX(0);
  }
}

/* Hiệu ứng di chuyển chữ từ phải sang trái */
@keyframes slideInRight {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

.slide-in-left {
  animation: slideInLeft 1.5s ease-out forwards;
}

.slide-in-right {
  animation: slideInRight 1.5s ease-out forwards;
}
.banner-text h1 {
  font-size: 150px;
  font-weight: bold;
  position: relative;
  z-index: 1;
  color: rgb(255, 255, 255); 
}

.banner-text h2 {
  font-size: 50px;
  margin-top: 10px;
  margin-bottom: -90px;
  margin-right: -300px;
  color: red;
  position: relative;
  z-index: 2;
  font-weight: 700;
}
.myBox {
  margin-top: -210px;
  margin-bottom: -150px;
  position: relative;
  z-index: 2;
  background-color: transparent;
}
.divider {
  width: 140%; /* Độ dài của đường kẻ */
  border-top: 1px solid #ffffff; /* Đường kẻ với màu trắng */
  margin-top: 10px;
  margin-bottom: 10px;
}

.learn-more {
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  color: white; /* Màu chữ */
  text-decoration: none;
}

.learn-more:hover {
  text-decoration: underline; /* Hiệu ứng khi hover */
}
</style>
