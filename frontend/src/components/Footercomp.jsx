import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand */}
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <img
              src="/logo.png"
              alt="PlantGuard Logo"
              className="h-10 w-10 hover:scale-110 transition duration-300"
            />
            <h2 className="text-2xl font-bold">PlantGuard</h2>
          </div>
          <p className="mt-3 text-sm text-green-50 text-center md:text-left">
            Empowering plant lovers with AI-driven disease detection and care recommendations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-green-50">
            <li><a href="#home" className="hover:text-white transition">Home</a></li>
            <li><a href={location.pathname === '/' || location.pathname === '/landingpage' ? '#about' : '/landingpage#about'} className="hover:text-white transition">About Us</a></li>
            <li><a href="#features" className="hover:text-white transition">Features</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact / Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-green-200 transition transform hover:scale-110"><Facebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-green-200 transition transform hover:scale-110"><Twitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-green-200 transition transform hover:scale-110"><Instagram /></a>
            <a href="mailto:plantguard@gmail.com" aria-label="Email" className="hover:text-green-200 transition transform hover:scale-110"><Mail /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-400 text-center py-4 text-sm text-green-50">
        &copy; {new Date().getFullYear()} PlantGuard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
