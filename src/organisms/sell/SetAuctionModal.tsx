import Swal from "sweetalert2";
import { useState } from "react";
import InputFieldType01 from "../../atoms/common/InputFieldType01";
import ButtonType01 from "../../atoms/common/ButtonType01";

interface props {
  backButtonOnAction? : ()=>void;
}

const SetAuctionModal = ({backButtonOnAction}:props) => {

  const [auctionData, setAuctionData] = useState({
    vehicleId: 0,
    minValue: 0,
    expiaryTime: 0,
  });

  // Handle input changes and update form data state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAuctionData((prevAuctionData) => ({
      ...prevAuctionData,
      [name]: name === "minValue" ? Number(value) : time,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Prepare form data with the URLs from Cloudinary
      const response = await fetch("http://localhost:8082/vehicle/set-auction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auctionData),
      });

      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your vehicle is successfully set for auction",
          showConfirmButton: false,
          timer: 2500,
        });
        clearAuctionData(); // Clear the form after successful submission
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

  // Clear auction data and reset state
  const clearAuctionData = () => {
    setAuctionData({
      vehicleId: 0,
      minValue: 0,
      expiaryTime: 0,
    });
  };

  return (
    <div>
      <div className='w-[800px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl max-h-screen overflow-y-scroll'>
        <div className="flex justify-center">
          <p className="text-gray-800 text-2xl mt-4 font-semibold">Set Auction</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1 text-sm text-gray-600 p-5">
            <InputFieldType01 title='Minimum Bid Value' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={auctionData.minValue} name="model" />
            <InputFieldType01 title='Time Expired' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={auctionData.expiaryTime} name="model" />
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonType01 title='Set Auction' buttonSize="h-12 w-full" click={handleSubmit} />
        </div>
        <div className="flex justify-center">
          <ButtonType01 title='Go Back' buttonSize="h-12 w-full" click={backButtonOnAction} />
        </div>
      </div>
    </div>
  );
}

export default SetAuctionModal