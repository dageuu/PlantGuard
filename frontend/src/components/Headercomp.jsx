import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="w-full bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-3 cursor-pointer group"
          onClick = {() => navigate("/landingpage")}
          >
          <img
            src="/logo.png"
            alt="PlantGuard Logo"
            className="h-10 w-10 transform group-hover:scale-110 transition duration-300"
          />
          <span className="text-2xl font-extrabold tracking-wide group-hover:text-green-200 transition">
            PlantGuard
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
          <a
            href="#about"
            className="hover:text-green-200 transition duration-200"
          >
            About Us
          </a>
          <a
            href="#features"
            className="hover:text-green-200 transition duration-200"
          >
            Features
          </a>
          <a
            href="#contact"
            className="px-4 py-2 bg-white text-green-700 rounded-full shadow hover:bg-green-100 transition duration-200"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
