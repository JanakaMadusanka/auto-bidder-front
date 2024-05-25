import React, { useState } from 'react';
import logo from '../assets/common/Logo2.png'
import LoginModal from '../organisms/common/LoginModal';

const NavBar: React.FC = () => {

    const [visibility, setVisibility] = useState(false)


    function loginButtonOnAction() {
        setVisibility(true);
    }
    function closeLoginModal() {
        setVisibility(false);
    }
    function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        // Close the modal if the click is on the overlay, not inside the modal content
        if (e.target === e.currentTarget) {
            closeLoginModal();
        }
    }

    return (
        <div>
            {/* hedder */}
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="size-20"><img src={logo} alt="" /></div>
                    <div className="text-[40px] font-bold">Auto Bidder</div>
                    <div className="hidden md:flex space-x-10">
                        <a href="#" className="hover:text-gray-400 hover:underline-offset-2">Home</a>
                        <a href="#" className="hover:text-gray-400">About</a>
                        <a href="#" className="hover:text-gray-400">Services</a>
                        <a href="#" className="hover:text-gray-400">Contact</a>

                    </div>
                    <div>
                        <button onClick={loginButtonOnAction} className='border-2 border-white py-2 px-4 ml-4 rounded-lg hover:text-gray-400'>Login</button>
                        <button className='border-2 border-white py-2 px-4 ml-4 rounded-lg hover:text-gray-400'>Register</button>
                    </div>
                </div>
            </nav>

            {/* body */}
            {visibility && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={handleOverlayClick}
                >
                    <LoginModal />
                </div>
            )}
        </div>

    );
};

export default NavBar;