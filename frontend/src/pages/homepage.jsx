import {useState} from 'react';
import Header from '../components/Headercomp.jsx';
import Footer from '../components/footercomp.jsx';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Homepage() {
    console.log('Homepage is being rendered');

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
  
    const handleUpload = async () => {
      if (!selectedFile) return alert("Please select a file first!");
  
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      try {
        const res = await fetch("http://127.0.0.1:8000/upload/", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        console.log("Response:", data);
        alert("Uploaded: " + data.filename);
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    };
    return (
      <>
      <Header />
      {/*<div className="min-h-screen min-w-screen flex items-center justify-center bg gradient-to-tl from-green-200 from-20% via-green-300 to-green-865">*/}
      <div className="relative min-h-screen min-w-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center ">
      <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center border border-green-300">
      {/* Left Column - Upload & Button */}
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <p className="mt-2 text-stone-600 text-lg">
            Upload your plant photo and let AI help diagnose its health.
          </p>
        </div>

        {/* Upload Box */}
        <div className="w-full max-w-md">
          <label
            htmlFor="plant-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-lime-500 rounded-xl p-10 bg-white cursor-pointer hover:bg-lime-50 transition transform hover:scale-105 hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-lime-600 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            <span className="text-stone-600 font-medium">
              Click or drag photo here
            </span>
            <span className="text-sm text-stone-400 mt-1">
              Supports: JPG, PNG
            </span>
          </label>
          <input
            id="plant-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleUpload}
          className="px-8 py-3 bg-gradient-to-r from-lime-600 to-green-700 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition w-[220px] text-lg font-semibold"
        >
          Start Scan
        </button>
      </div>

      {/* Right Column - Carousel */}
      <div className="w-full">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          loop={true}
          autoplay={{ delay: 2500 }}
        >
          {[
            "/carouselbg1.jpg",
            "/carouselbg2.jpg",
            "/carouselbg3.jpg",
            "/carouselbg4.jpg"
          ].map((src, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                <img
                  src={src}
                  alt={`Plant ${i + 1}`}
                  className="w-full h-56 object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>


      </div>
      <Footer />
      </>
    );
  }
