import { useAuth } from "../../context/AuthContext"; // Import the custom hook
import { useEffect, useState } from "react";
import VehicleCard from "../../molecules/sell/VehicleCard";

function MyVehicleList() {
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

  console.log('Vehicles in state:', vehicles); // Log the vehicles in the state

  return (
    <div className="grid grid-cols-1">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.regNo} vehicle={vehicle} /> // Pass each vehicle to VehicleCard
      ))}
    </div>
  );
}

export default MyVehicleList;
