import cardImage from "../../assets/home/carosul1.png"

function AuctionCard() {
    return (
        <div className='w-auto p-2 m-2 rounded-2xl bg-gray-50 border border-gray-300 shadow-lg transition-transform duration-300 hover:scale-125 hover:shadow-2xl'>

            <div className="h-45">
                <img
                    src={cardImage}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="grid grid-cols-2 h-8 rounded-lg" >
                <div className="col-span-1 flex items-center justify-center bg-gray-800 text-white">
                    <p>TimeRemain</p>
                </div>
                <div className="col-span-1 flex items-center justify-center bg-gray-800 text-white">
                    <p>LastBid</p>
                </div>
            </div>

            <div>
                <div className="mb-2 flex items-center justify-between text-gray-800 text-sm mt-2">
                    <p>Honda Fit Aria, 2007</p>
                    <p>LKR.3800000.00</p>
                </div>
                <div className="text-gray-600 text-[10px] mt-2">
                    <p>
                        GD8, 1500CC, 140000 km
                    </p>
                </div>
            </div>

            <div className="mt-2">
                <button className="w-full h-8 rounded-md bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 text-sm">
                    Bid Now
                </button>
            </div>
        </div>
    )
}

export default AuctionCard