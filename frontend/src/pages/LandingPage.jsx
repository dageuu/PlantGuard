import React from 'react';
import Footer from '../components/footercomp';
import Header from '../components/Headercomp';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  console.log('LandingPage is being rendered');
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <section className="bg-white rounded-2xl shadow-xl p-10 mt-[30px] max-w-xl w-full text-center border border-green-300">
          <h1 className="text-4xl font-extrabold text-green-700 mb-4">Welcome to PlantGuard 🌱</h1>
          <p className="text-gray-700 mb-8 text-lg">
            Your smart companion for plant health monitoring.<br />
            Upload images, get instant feedback, and help your plants thrive!
          </p>
          <button
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-200"
            onClick= {() => navigate("/dashboard") /* Assuming you want to navigate to the dashboard */}
          >
            Get Started
          </button>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="mt-[40px] mb-[40px] max-w-2xl w-full bg-green-50 border border-green-200 rounded-xl shadow p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-green-700 mb-3">About Us</h2>
          <p className="text-gray-700 text-base mb-2">
            PlantGuard is dedicated to helping plant lovers and gardeners keep their plants healthy and beautiful.
            Our AI-powered platform analyzes plant images and provides instant feedback on plant health, diseases, and care tips.
          </p>
          <p className="text-gray-600 text-sm">
            Whether you’re a beginner or a pro, PlantGuard is here to support your green journey!
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}