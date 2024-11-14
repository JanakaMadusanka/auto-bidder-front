import Swal from "sweetalert2";
import {useState} from "react";
import InputFieldType01 from "../../atoms/common/InputFieldType01";
import ButtonType01 from "../../atoms/common/ButtonType01";
import SelectFieldType01 from "../../atoms/common/SelectFieldType01";

interface Vehicle {
  id: number,
  ownerId: number,
  categoryId: number,
  make: string,
  year: string,
  model: string,
  color: string,
  mileage: string,
  regNo: string,
  mainImageUrl: string,
  additionalImageUrls: string[],
  isUnderAuction: boolean,
  minBidAmount:number,
  auctionTimeOut:number,
}
interface props {
  backButtonOnAction?: () => void;
  vehicle: Vehicle;
}

const SetAuctionModal = ({ backButtonOnAction, vehicle }: props) => {

  const timeOptions = [1, 2, 3, 4, 5, 6, 9, 12, 18, 24, 36, 48, 72];

  const [newVehicle, setNewVehicle] = useState(vehicle);

  // Handle input changes and update form data state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewVehicle((prevNewVehicle) => ({
      ...prevNewVehicle,
      [name]: name === "minBidAmount" || name === "auctionTimeOut" ? Number(value) : value,
      isUnderAuction: true,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Prepare form data with the URLs from Cloudinary
      console.log(newVehicle);
      const response = await fetch(`http://localhost:8082/vehicle/update/${vehicle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVehicle),
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
        throw new Error("Something went wrong.");
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

  return (
    <div>
      <div className='w-[800px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl max-h-screen overflow-y-scroll'>
        <div>
          <p className="flex justify-center text-gray-800 text-2xl mt-4 font-semibold">Set Auction</p>
          <p className="flex justify-center text-gray-800 text-md mt-4 font-semibold">{`( ${vehicle.regNo} )`}</p>
        </div>


        <div className="text-sm text-gray-600 p-5">
          <div className="flex">
            <InputFieldType01
              title='Minimum Bid Value (LKR)'
              inputSize="h-9"
              classNames="mt-4"
              onChange={handleChange}
              value={String(newVehicle.minBidAmount)}
              name="minBidAmount"
            />
            <p className="bg-gray-300 rounded-3xl p-5 ml-2 mt-2">The bid value will be started from minimum bid value</p>
          </div>
          <div>
            <SelectFieldType01
              title='Time Expired (in hours)'
              options={timeOptions.map(option => option.toString())} // Pass numbers as strings for display
              classNames="mt-4"
              onChange={handleChange}
              value={newVehicle.auctionTimeOut.toString()}
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