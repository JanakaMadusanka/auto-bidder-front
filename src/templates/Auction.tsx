import AuctionHedder from "../organisms/auction/AuctionHedder"
import AuctionList from "../organisms/auction/AuctionList"

const Auction = () => {
  return (
    <div className="px-10 mb-10">
      <AuctionHedder/>
      <AuctionList/>
    </div>
  )
}

export default Auction