import React, { useState } from 'react';
import logo from '../assets/common/Logo2.png'
import LoginModal from '../organisms/common/LoginModal';
import RegistrationModal from '../organisms/common/RegistrationModal';

interface NavBarProps {
    homeButtonOnAction?:()=>void;
    auctionButtonOnAction?:()=>void;
    sellButtonOnAction?:()=>void;
    myAuctionButtonOnAction?:()=>void;
    aboutButtonOnAction?:()=>void;
    contactButtonOnAction?:()=>void;
}

const NavBar = ({ homeButtonOnAction, auctionButtonOnAction, sellButtonOnAction, myAuctionButtonOnAction, aboutButtonOnAction, contactButtonOnAction }: NavBarProps) => {

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
    // set navitation
    return (
        <div>
            {/* hedder */}
            <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="size-20"><img src={logo} alt="" /></div>
                    <div className="text-[40px] font-bold">Auto Bidder</div>
                    <div className="hidden md:flex space-x-10">
                        <button onClick={homeButtonOnAction} className="hover:text-gray-400 hover:underline-offset-2">Home</button>
                        <button onClick={auctionButtonOnAction} className="hover:text-gray-400">Auctions</button>
                        <button onClick={sellButtonOnAction} className="hover:text-gray-400">Sell</button>
                        <button onClick={myAuctionButtonOnAction} className="hover:text-gray-400">My Auctions</button>
                        <button onClick={aboutButtonOnAction} className="hover:text-gray-400">About</button>
                        <button onClick={contactButtonOnAction} className="hover:text-gray-400">Contact</button>
                    </div>
                    <div>
                        <button onClick={loginButtonOnAction} className='border-2 border-white py-2 px-4 ml-4 rounded-lg hover:text-gray-400'>Login</button>
                        <button onClick={registerButtonOnAction} className='border-2 border-white py-2 px-4 ml-4 rounded-lg hover:text-gray-400'>Register</button>
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