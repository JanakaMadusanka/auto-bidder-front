import { useState } from "react";
import RegisterVehecleModal from "../organisms/sell/RegisterVehicleModal";
import SellHedder from "../organisms/sell/SellHedder";
import MyVehicle from "../organisms/sell/MyVehicleModal";

const Sell = () => {

  //Handle Register Button Click
  const [registerVisibility, setRegisterVisibility] = useState(false)

  function registerVehecleButtonOnAction() {
    setRegisterVisibility(true);
  }
  function closeRegisterVehecleModal() {
    setRegisterVisibility(false);
  }
  function handleRegisterOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    // Close the modal if the click is on the overlay, not inside the modal content
    if (e.target === e.currentTarget) {
      closeRegisterVehecleModal();
    }
  }

  //Handle Set for Auction Button Click
  const [myVehicleVisibility, setMyVehicleVisibility] = useState(false)

  function setAuctionButtonOnAction() {
    setMyVehicleVisibility(true);
  }
  function closeMyVehecleModal() {
    setMyVehicleVisibility(false);
  }
  function handleMyVehicleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    // Close the modal if the click is on the overlay, not inside the modal content
    if (e.target === e.currentTarget) {
      closeMyVehecleModal();
    }
  }

  return (
    <div>
      <SellHedder clickNavigation1={registerVehecleButtonOnAction} clickNavigation2={setAuctionButtonOnAction} />

      {
        registerVisibility && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleRegisterOverlayClick}
          >
            <RegisterVehecleModal />
          </div>
        )
      }

      {
        myVehicleVisibility && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleMyVehicleOverlayClick}
          >
            <MyVehicle />
          </div>
        )
      }

    </div>
  )
}

export default Sell