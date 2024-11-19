import Swal from "sweetalert2";
import InputFieldType01 from "../../atoms/common/InputFieldType01";
import ButtonType01 from "../../atoms/common/ButtonType01";
import SelectFieldType01 from "../../atoms/common/SelectFieldType01";
import { useAtom } from "jotai";
import { selectedVehicleAtom } from "../../store/VehicleAtom";

interface props {
  backButtonOnAction?: () => void;
}

const SetAuctionModal = ({ backButtonOnAction }: props) => {

  // Access the global list of vehicles and the selected vehicle
  const [selectedVehicle, setSelectedVehicle] = useAtom(selectedVehicleAtom);

  const timeOptions = [1, 2, 3, 4, 5, 6, 9, 12, 18, 24, 36, 48, 72];

  // Handle input changes and update form data state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!selectedVehicle) return; // Ensure selectedVehicle is defined
    const { name, value } = e.target;
    setSelectedVehicle((prevSelectedVehicle) =>
      prevSelectedVehicle
        ? {
          ...prevSelectedVehicle,
          [name]:
            name === "minBidAmount" || name === "auctionTimeOut"
              ? Number(value)
              : value,
          isUnderAuction: true,
        }
        : null
    );
  };

  const handleSubmit = async () => {
    if (!selectedVehicle) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No vehicle selected for auction.",
      });
      return;
    }

    try {
      // Prepare form data with the URLs from Cloudinary
      const response = await fetch(`http://localhost:8082/vehicle/update/${selectedVehicle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedVehicle),
      });

      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your vehicle is successfully set for auction",
          showConfirmButton: false,
          timer: 2500,
        });
      //should be cloesd the modal after comformation 
      } else {
        throw new Error("Failed to update the vehicle.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          (error instanceof Error && error.message) ||
          "An unexpected error occurred. Please try again later.",
      });
    }
  };

  if (!selectedVehicle) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No vehicle selected for auction.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='w-[800px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl max-h-screen overflow-y-scroll'>
        <div>
          <p className="flex justify-center text-gray-800 text-2xl mt-4 font-semibold">Set Auction</p>
          <p className="flex justify-center text-gray-800 text-md mt-4 font-semibold">{`( ${selectedVehicle.regNo} )`}</p>
        </div>

        <div className="text-sm text-gray-600 p-5">
          <div className="grid grid-cols-2">
            <InputFieldType01
              title='Minimum Bid Value (LKR)'
              inputSize="h-9"
              classNames="mt-4"
              onChange={handleChange}
              value={String(selectedVehicle.minBidAmount)}
              name="minBidAmount"
            />
            <p className="bg-gray-300 rounded-3xl p-5 ml-2 mt-2">The bid value will be started from minimum bid value</p>
          </div>
          <div className="grid grid-cols-2">
            <SelectFieldType01
              title='Time Expired (in hours)'
              options={timeOptions.map(option => option.toString())} // Pass numbers as strings for display
              classNames="mt-4"
              onChange={handleChange}
              value={selectedVehicle.auctionTimeOut.toString()}
              name="auctionTimeOut"
            />
            <p className="bg-gray-300 rounded-3xl p-5 ml-2 mt-2">The maximum bid value while expiry time will be the final bid value</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex justify-center">
            <ButtonType01 title='Set Auction' buttonSize="h-12 w-full" click={handleSubmit} />
          </div>
          <div className="flex justify-center">
            <ButtonType01 title='Go Back' buttonSize="h-12 w-full" click={backButtonOnAction} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetAuctionModal