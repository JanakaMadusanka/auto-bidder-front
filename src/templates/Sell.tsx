import { useState } from "react";
import RegisterVehecleModal from "../organisms/sell/RegisterVehicleModal";
import SellHedder from "../organisms/sell/SellHedder";

const Sell = () => {

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

  return (
    <div>
      <SellHedder clickNavigation1={registerVehecleButtonOnAction} />

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
      
    </div>
  )
}

export default Sell