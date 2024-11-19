import { useState } from "react";
import RegisterVehecleModal from "../organisms/sell/RegisterVehicleModal";
import SellHedder from "../organisms/sell/SellHedder";
import MyVehicle from "../organisms/sell/MyVehicleModal";
import SetAuctionModal from "../organisms/sell/SetAuctionModal";

const Sell = () => {

  const [MyComponent, setMyComponent] = useState<JSX.Element | null>(null);
  const [MyComponentVisibility, setMyComponentVisibility] = useState(false);

  //Handle Set For Auctuon Button On clic
  function setAuctionButtonOnAction() { // get reg No as a prop 
    setMyComponentVisibility(true);
    setMyComponent(<SetAuctionModal
      backButtonOnAction={myVehiclesButtonOnAction} //Handle back Button of set Auction Modal
    />)
  }

  //Handle Register Button Click
  function registerVehecleButtonOnAction() {
    setMyComponentVisibility(true);
    setMyComponent(<RegisterVehecleModal />)
  }

  //Handle Register Button Click
  function closeMyComponent() {
    setMyComponentVisibility(false);
  }

  // Close the modal if the click is on the overlay, not inside the modal content
  function handleMyComponentOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeMyComponent();
    }
  }

  //Handle My Vehicle Button Click
  function myVehiclesButtonOnAction() {
    setMyComponentVisibility(true);
    setMyComponent(<MyVehicle setAuctionButtonOnAction={setAuctionButtonOnAction} />)
  }

  return (
    <div>
      <SellHedder clickNavigation1={registerVehecleButtonOnAction} clickNavigation2={myVehiclesButtonOnAction} />
      {
        MyComponentVisibility &&
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleMyComponentOverlayClick}
        >
          {MyComponent}
        </div>
      }
    </div>
  )
}

export default Sell