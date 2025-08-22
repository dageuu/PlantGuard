import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">🌱 PlantGuard</h2>
          <p className="mt-3 text-sm text-green-100">
            Empowering plant lovers with AI-driven disease detection and care recommendations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-green-100">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact / Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect with Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-200"><Facebook /></a>
            <a href="#" className="hover:text-green-200"><Twitter /></a>
            <a href="#" className="hover:text-green-200"><Instagram /></a>
            <a href="mailto:plantguard@gmail.com" className="hover:text-green-200"><Mail /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-400 text-center py-4 text-sm text-green-100">
        &copy; 2025 PlantGuard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
