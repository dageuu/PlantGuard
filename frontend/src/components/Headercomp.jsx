import React from 'react';

const Header = () => {
    return (
        <header className="w-full py-6 bg-green-700 text-white shadow">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="PlantGuard Logo" className="h-10 w-10" />
                    <span className="text-2xl font-bold tracking-wide">PlantGuard</span>
                </div>
                <nav>
                    <a href="#about" className="ml-6 text-white hover:text-green-300 transition">About Us</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;