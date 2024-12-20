import ButtonTypeAuction from "../../atoms/auction/ButtonTypeAuction";

const AuctionHedder = () => {
    return (
        <div className="mb-5">
            <div className="flex justify-center items-center py-4 text-bg-gray-800">
                <p className="text-3xl font-bold">Auto Auctions</p>
            </div>
            <div className="flex rounded bg-gray-200">
                <ButtonTypeAuction title="All Category" />
                <ButtonTypeAuction title="Car" />
                <ButtonTypeAuction title="Lorry" />
                <ButtonTypeAuction title="Jeep" />
            </div>
        </div>
    );
}

export default AuctionHedder
