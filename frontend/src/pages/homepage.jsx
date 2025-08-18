import {useState} from 'react';
import Header from '../components/Headercomp.jsx';
import Footer from '../components/footercomp.jsx';

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
      <div className="relative min-h-screen min-w-screen flex items-center justify-center bg-[url(src/assets/brightleavesbg2.jpg)] bg-cover">
      {/*<section className="section_one border-2 border-stone-600 bg-stone-100 rounded-lg h-[500px] w-[1200px] flex flex-col justify-around items-center">
        <h1 className="relative text-4xl text-amber-950">
          Welcome to PlantGuard 🌱
        </h1>
        <button className="mt-4 px-6 py-2 bg-lime-500 text-stone-200 hover:bg-lime-600 hover:text-stone-200 rounded-md w-[200px]">
          Get Started
          </button> 
      </section>*/}
      <section className="section_one border-2 border-stone-600 bg-stone-100 rounded-lg h-[500px] w-[1200px] flex flex-col justify-around items-center">
  <h1 className="relative text-4xl text-amber-950">
    Welcome to PlantGuard 🌱
  </h1>

  {/* Upload Box */}
  <div className="border-2 border-dashed border-lime-500 rounded-lg p-10 w-[400px] h-[200px] flex flex-col items-center justify-center bg-white hover:bg-stone-50 cursor-pointer">
    <label htmlFor="plant-upload" className="cursor-pointer flex flex-col items-center">
      <svg xmlns="http://www.w3.org/2000/svg" 
           className="h-12 w-12 text-lime-500 mb-2" 
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l-4-4m4 4l4-4" />
      </svg>
      <span className="text-stone-600">Click or drag photo here</span>
    </label>
    <input type="file" accept="image/*" onChange={handleFileChange} />
  </div>

  {/* Button */}
  <button
    onClick={handleUpload} 
    className="mt-4 px-6 py-2 bg-lime-500 text-stone-200 hover:bg-lime-600 hover:text-stone-200 rounded-md w-[200px]">
    Get Started
  </button> 
</section>

      </div>
      <Footer />
      </>
    );
  }
