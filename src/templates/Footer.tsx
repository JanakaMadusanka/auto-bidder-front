import { useState } from 'react';
import logo from '../assets/common/Logo1.png'
import LoginModal from '../organisms/common/LoginModal';
import RegistrationModal from '../organisms/common/RegistrationModal';

interface FooterProps {
    homeButtonOnAction?: () => void;
    auctionButtonOnAction?: () => void;
    sellButtonOnAction?: () => void;
    myAuctionButtonOnAction?: () => void;
    aboutButtonOnAction?: () => void;
    contactButtonOnAction?: () => void;
}

const Footer = ({ homeButtonOnAction, auctionButtonOnAction, sellButtonOnAction, myAuctionButtonOnAction, aboutButtonOnAction, contactButtonOnAction}: FooterProps) => {

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
        <div className='grid grid-cols-4 w-full bg-gray-800 p-10'>
            <div className='col-span-1 flex px-10'>
                <img className='h-36' src={logo} alt="" />
            </div>
            <div className="col-span-3 bg-gray-800 text-white hover:text-gray-400 flex justify-between px-20">
                <ul>
                    <li className='text-xl'>Quick Links</li>
                    <hr />
                    <br />
                    <li><button onClick={homeButtonOnAction}>Home</button></li>
                    <li><button onClick={auctionButtonOnAction}>Auctions</button></li>
                    <li><button onClick={sellButtonOnAction}>Sell</button></li>
                    <li><button onClick={myAuctionButtonOnAction}>My Auctions</button></li>
                </ul>
                <ul>
                    <li className='text-xl'>Stay with us</li>
                    <hr />
                    <br />
                    <li><button onClick={loginButtonOnAction}>Login</button></li>
                    <li><button onClick={registerButtonOnAction}>Register</button></li>
                </ul>
                <ul className=''>
                    <li className='text-xl'>Information</li>
                    <hr />
                    <br />
                    <li><button onClick={aboutButtonOnAction}>About</button></li>
                    <li><button onClick={contactButtonOnAction}>Contact</button></li>
                </ul>

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
        </div>
    );
};

export default Footer