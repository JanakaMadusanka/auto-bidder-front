import { useSetAtom } from "jotai";
import { selectedVehicleAtom } from "../../store/VehicleAtom";

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
    minBidAmount: number,
    auctionTimeOut: number,
}
interface props {
    vehicle: Vehicle,
    showImagesButtonOnAction?: () => void,
    updateButtonOnAction?: () => void,
    removeButtonOnAction?: () => void,
    setAuctionButtonOnAction?: () => void,
    auctionEnabled?: boolean,
}

const VehicleCard = ({ vehicle, showImagesButtonOnAction, updateButtonOnAction, removeButtonOnAction, setAuctionButtonOnAction, auctionEnabled }: props) => {

    const setSelectedVehicle = useSetAtom(selectedVehicleAtom); // use setSelectedVehicleAtom in globel state

    const handleSetAuction = () => {
        setAuctionButtonOnAction?.(); // Call any passed-in action
        setSelectedVehicle(vehicle); // Set the selected vehicle globally
    };
    const handleUpdate = () => {
        updateButtonOnAction?.(); // Call any passed-in action
        setSelectedVehicle(vehicle); // Set the selected vehicle globally
    };
    const handleRemove = () => {
        removeButtonOnAction?.(); // Call any passed-in action
        setSelectedVehicle(vehicle); // Set the selected vehicle globally
    };
    const handleShowImages = () => {
        showImagesButtonOnAction?.(); // Call any passed-in action
        setSelectedVehicle(vehicle); // Set the selected vehicle globally
    };

    return (
        <div className='w-auto p-2 m-2 rounded-2xl bg-gray-50 border border-gray-300 shadow-lg'>

            <div className="h-45">
                <img
                    src={vehicle.mainImageUrl}
                    alt="vehicle-image"
                    className="h-full w-full object-cover"
                />
            </div>

            {auctionEnabled &&
                <div className="grid grid-cols-2 h-8 rounded-lg" >
                    <div className="col-span-1 flex items-center justify-center bg-gray-800 text-white">
                        <p>TimeRemain</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-center bg-gray-800 text-white">
                        <p>LastBid</p>
                    </div>
                </div>
            }

            <div>
                <div className="mb-2 flex items-center justify-between text-gray-800 text-lg mt-2">
                    <p>{`${vehicle.make}, ${vehicle.model}`}</p>
                    {auctionEnabled && <p>LKR.3800000.00</p>}
                    {!auctionEnabled && <p>{`${vehicle.regNo}`}</p>}
                </div>
                <div className="text-gray-600 text-md mt-2">
                    <p>{`${vehicle.mileage} km, ${vehicle.color}, ${vehicle.year}`}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-2">

                <div >
                    <button
                        className="w-full h-8 rounded-md bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 text-lg"
                        onClick={handleRemove}
                    >
                        Remove Vehicle
                    </button>

                </div>

                <div >
                    <button
                        className="w-full h-8 rounded-md bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 text-lg"
                        onClick={handleUpdate}
                    >
                        Update Vehicle
                    </button>

                </div>

                <div >
                    <button
                        className="w-full h-8 rounded-md bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 text-lg"
                        onClick={handleShowImages}
                    >
                        Show Images
                    </button>
                </div>
            </div>

            <div className="mt-2">
                {!auctionEnabled &&
                    <button
                        className="w-full h-8 rounded-md bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 text-lg"
                        onClick={handleSetAuction}
                    >
                        Set Auction
                    </button>
                }
            </div>
        </div>
    )
}

export default VehicleCard