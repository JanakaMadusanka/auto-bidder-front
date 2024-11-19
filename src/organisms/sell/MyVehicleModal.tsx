import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import VehicleCard from "../../molecules/sell/VehicleCard";

interface props {
  setAuctionButtonOnAction?: () => void,
}

const MyVehicleModal = ({ setAuctionButtonOnAction }: props) => {

  const { loggedUserId } = useAuth(); // Use the context to set the logged user
  const [vehicles, setVehicles] = useState<any[]>([]); // State to handle an array of vehicles

  useEffect(() => {
    const fetchVehicleData = async () => {
      if (!loggedUserId) return; // Avoid fetch if loggedUserId is not available

      try {
        const response = await fetch(`http://localhost:8082/vehicle/search-by-owner/${loggedUserId}`);
        const result = await response.json();

        // Check the structure of result to make sure it's an array of vehicles, set the vehicles state
        if (Array.isArray(result)) {
          setVehicles(result);
        } else {
          console.error('Expected an array, but got:', result);
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };
    fetchVehicleData();
  }, [loggedUserId]);

  return (
    <div>
      <div className='w-[800px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl max-h-screen overflow-y-scroll'>
        <div className="px-10 mb-10">
          <div className="flex justify-center items-center py-4 text-bg-gray-800">
            <p className="text-3xl font-bold">My Vehicles</p>
          </div>
          <div className="grid grid-cols-1">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.regNo}
                vehicle={vehicle}
                setAuctionButtonOnAction={setAuctionButtonOnAction}
              /> // Pass each vehicle to VehicleCard
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyVehicleModal