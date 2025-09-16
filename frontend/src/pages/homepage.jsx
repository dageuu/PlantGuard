import {useState} from 'react';
import Header from '../components/Headercomp.jsx';
import Footer from '../components/Footercomp.jsx';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Homepage() {
    console.log('Homepage is being rendered');

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [scanResult, setScanResult] = useState(null);

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
      setUploaded(true); // Show "Photo uploaded!" as soon as a file is selected
      console.log("File selected:", e.target.files[0]);
    };
  
    const handleUpload = async () => {
      console.log("Upload button clicked");
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
        setScanResult({
          prediction: data.prediction,
          confidence: data.confidence,
          filename: data.filename,
          file: selectedFile
        });
        setUploaded(true); // Mark as uploaded
      } catch (err) {
        console.error("Error uploading file:", err);
        alert("Error uploading image: " + err.message);
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
            className={`flex flex-col items-center justify-center border-2 border-dashed border-lime-500 rounded-xl p-10 bg-white cursor-pointer hover:bg-lime-50 transition transform hover:scale-105 hover:shadow-md ${uploaded ? "border-green-500 bg-green-50" : ""}`}
            tabIndex={0}
            onClick={() => {
              if (!uploaded) {
                document.getElementById('plant-upload').click();
              }
            }}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !uploaded) {
                e.preventDefault();
                document.getElementById('plant-upload').click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              const files = e.dataTransfer.files;
              if (files.length > 0) {
                setSelectedFile(files[0]);
                setUploaded(true); // <-- Fix: show "Photo uploaded!" after drop
                console.log("File dropped:", files[0]);
              }
            }}
          >
            {uploaded ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-green-600 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-green-700 font-semibold">
                  Photo uploaded!
                </span>
              </>
            ) : (
              <>
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
              </>
            )}
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
          disabled={!selectedFile}
          className={`px-8 py-3 bg-gradient-to-r from-lime-600 to-green-700 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition w-[220px] text-lg font-semibold ${!selectedFile ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Start Scan
        </button>
        {scanResult && (
          <div className="mt-8 p-6 border border-green-300 rounded-lg bg-green-50 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Scan Result</h2>
            <img
              src={URL.createObjectURL(scanResult.file)}
              alt={scanResult.filename}
              className="mx-auto mb-4 rounded-lg max-h-48 object-contain"
            />
            <p className="text-lg font-medium text-green-900">
              Prediction: <span className="font-bold">{scanResult.prediction}</span>
            </p>
            <p className="text-lg font-medium text-green-900">
              Confidence: <span className="font-bold">{(scanResult.confidence * 100).toFixed(2)}%</span>
            </p>
            <button
              onClick={() => {
                setScanResult(null);
                setSelectedFile(null);
                setUploaded(false);
              }}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              Scan Another Image
            </button>
          </div>
        )}
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
