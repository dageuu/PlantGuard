import React from 'react';
import Footer from '../components/footercomp';
import Header from '../components/Headercomp';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  console.log('LandingPage is being rendered');
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url("/landingbg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center">
        <section className="flex flex-col items-start justify-center h-full pt-24">
          <h1 className="text-5xl font-extrabold text-green-700 mb-6 whitespace-nowrap pl-30 flex items-center">
            Welcome to PlantGuard
            <span className="ml-2 align-middle text-4xl animate-bounce"></span>
          </h1>
          <p className="text-gray-700 mb-8 text-xl max-w-xl pl-31">
            Your smart companion for plant health monitoring.<br />
            Upload images, get instant feedback, and help your plants thrive!
          </p>
          <button
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-200 ml-30"
            onClick={() => navigate("/dashboard")}
          >
            Get Started
          </button>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="mt-16 mb-16 flex justify-center"
        >
          <div className="max-w-4xl w-full bg-white border border-green-200 rounded-xl shadow p-8 text-center">
            <h2 className="text-4xl font-bold text-green-700 mb-3">About Us</h2>
            <p className="text-gray-1000 text-base mb-2">
              PlantGuard is dedicated to helping plant lovers and gardeners keep their plants healthy and beautiful.
              Our AI-powered platform analyzes plant images and provides instant feedback on plant health, diseases, and care tips.
            </p>
            <p className="text-gray-600 text-sm">
              Whether you’re a beginner or a pro, PlantGuard is here to support your green journey!
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}