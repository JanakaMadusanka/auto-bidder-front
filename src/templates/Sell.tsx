import { useState } from "react";
import RegisterVehecleModal from "../organisms/sell/RegisterVehicleModal";
import SellHedder from "../organisms/sell/SellHedder";
import MyVehicle from "../organisms/sell/MyVehicleModal";
import SetAuctionModal from "../organisms/sell/SetAuctionModal";
import UpdateVehicleModal from "../organisms/sell/UpdateVehicleModal";
import UpdateImagesModal from "../organisms/sell/UpdateImagesModal";
import Swal from "sweetalert2";
import { useAtom } from "jotai";
import { selectedVehicleAtom } from "../store/VehicleAtom";

const Sell = () => {

  const [MyComponent, setMyComponent] = useState<JSX.Element | null>(null);
  const [MyComponentVisibility, setMyComponentVisibility] = useState(false);
  const [selectedVehicle] = useAtom(selectedVehicleAtom);

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
    setMyComponentVisibility(true);
    setMyComponent(<UpdateImagesModal
      backButtonOnAction={myVehiclesButtonOnAction} //Handle back Button of set Auction Modal
    />)
  }
  
  //Handle remove vehicle Button On clic
  function removeButtonOnAction() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`http://localhost:8082/vehicle/delete/${selectedVehicle?.id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json", 
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to delete the vehicle.");
            }
            return response.text();
          })

          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            myVehiclesButtonOnAction(); // Refresh or update state after successful deletion
          })
      }
    });

  }

  //Handle My Vehicle Button Click
  function myVehiclesButtonOnAction() {
    setMyComponentVisibility(true);
    setMyComponent(<MyVehicle
      setAuctionButtonOnAction={setAuctionButtonOnAction}
      updateButtonOnAction={updateButtonOnAction}
      showImagesButtonOnAction={showImagesButtonOnAction}
      removeButtonOnAction={removeButtonOnAction}

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