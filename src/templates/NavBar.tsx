import React from 'react';
import logo from '../assets/common/Logo2.png'

const NavBar: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="size-20"><img src={logo} alt="" /></div>
                <div className="text-[40px] font-bold">Auto Bidder</div>
                <div className="hidden md:flex space-x-10">
                    <a href="#" className="hover:text-gray-400">Home</a>
                    <a href="#" className="hover:text-gray-400">About</a>
                    <a href="#" className="hover:text-gray-400">Services</a>
                    <a href="#" className="hover:text-gray-400">Contact</a>
                    <a href="#" className="hover:text-gray-400">Sign Up</a>
                    <a href="#" className="hover:text-gray-400">Sign In</a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;