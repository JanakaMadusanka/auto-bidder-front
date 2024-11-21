import { useState } from "react";
import RegisterVehecleModal from "../organisms/sell/RegisterVehicleModal";
import SellHedder from "../organisms/sell/SellHedder";
import MyVehicle from "../organisms/sell/MyVehicleModal";
import SetAuctionModal from "../organisms/sell/SetAuctionModal";
import UpdateVehicleModal from "../organisms/sell/UpdateVehicleModal";

const Sell = () => {

  const [MyComponent, setMyComponent] = useState<JSX.Element | null>(null);
  const [MyComponentVisibility, setMyComponentVisibility] = useState(false);

  //Handle Set For Auctuon Button On clic
  function setAuctionButtonOnAction() {
    setMyComponentVisibility(true);
    setMyComponent(<SetAuctionModal
      backButtonOnAction={myVehiclesButtonOnAction} //Handle back Button of set Auction Modal
    />)
  }

  //Handle update vehicle Button On clic
  function updateButtonOnAction() {
    setMyComponentVisibility(true);
    setMyComponent(<UpdateVehicleModal
      backButtonOnAction={myVehiclesButtonOnAction} //Handle back Button of set Auction Modal
    />)
  }

  //Handle show images Button On clic
  function showImagesButtonOnAction() {
    // setMyComponentVisibility(true);
    // setMyComponent(<UpdateVehicleModal
    //   backButtonOnAction={myVehiclesButtonOnAction} //Handle back Button of set Auction Modal
    // />)
  }
  //Handle remove vehicle Button On clic
  function removeButtonOnAction() {
    // setMyComponentVisibility(true);
    // setMyComponent(<UpdateVehicleModal
    //   backButtonOnAction={myVehiclesButtonOnAction} //Handle back Button of set Auction Modal
    // />)
  }

  //Handle My Vehicle Button Click
  function myVehiclesButtonOnAction() {
    setMyComponentVisibility(true);
    setMyComponent(<MyVehicle
      setAuctionButtonOnAction={setAuctionButtonOnAction}
      updateButtonOnAction = {updateButtonOnAction}
      showImagesButtonOnAction = {showImagesButtonOnAction}
      removeButtonOnAction = {removeButtonOnAction}

    />)
  }

  //Handle Register Button Click
  function registerVehecleButtonOnAction() {
    setMyComponentVisibility(true);
    setMyComponent(<RegisterVehecleModal />)
  }

  //Close the My componenet
  function closeMyComponent() {
    setMyComponentVisibility(false);
  }

  // Close the modal if the click is on the overlay, not inside the modal content
  function handleMyComponentOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeMyComponent();
    }
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