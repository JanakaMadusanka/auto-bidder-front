import React, { useState } from 'react';
import logo from '../assets/common/Logo2.png'
import LoginModal from '../organisms/common/LoginModal';
import RegistrationModal from '../organisms/common/RegistrationModal';

const NavBar: React.FC = () => {

    const [loginVisibility, setLoginVisibility] = useState(false)
    const [registerVisibility, setRegisterVisibility] = useState(false)

    function loginButtonOnAction() {
        setLoginVisibility(true);
    }
    function closeLoginModal() {
        setLoginVisibility(false);
    }
    function handleLoginOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        // Close the modal if the click is on the overlay, not inside the modal content
        if (e.target === e.currentTarget) {
            closeLoginModal();
        }
    }

    function registerButtonOnAction() {
        setRegisterVisibility(true);
    }
    function closeRegisterModal() {
        setRegisterVisibility(false);
    }
    function handleRegisterOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        // Close the modal if the click is on the overlay, not inside the modal content
        if (e.target === e.currentTarget) {
            closeRegisterModal();
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
                        <button onClick={registerButtonOnAction}  className='border-2 border-white py-2 px-4 ml-4 rounded-lg hover:text-gray-400'>Register</button>
                    </div>
                </div>
            </nav>

            {/* body */}
            {loginVisibility && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={handleLoginOverlayClick}
                >
                    <LoginModal />
                </div>
            )}

            {registerVisibility && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={handleRegisterOverlayClick}
                >
                    <RegistrationModal />
                </div>
            )}
        </div>

    );
};

export default NavBar;