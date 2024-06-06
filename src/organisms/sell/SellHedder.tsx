import SellNavigation from "../../molecules/sell/SellNavigation";
import { TbHexagonNumber1Filled, TbHexagonNumber2Filled, TbHexagonNumber3Filled,TbHexagonNumber4Filled } from "react-icons/tb";

interface props {
    clickNavigation1?:()=>void;
    clickNavigation2?:()=>void;
    clickNavigation3?:()=>void;
    clickNavigation4?:()=>void;
}

const SellHedder = ({clickNavigation1,clickNavigation2,clickNavigation3,clickNavigation4 }: props) => {
    return (
        <div className="mb-5">
            <div className="flex justify-center items-center py-4 text-bg-gray-800">
                <p className="text-3xl font-bold">Sell My Vehicle</p>
            </div>
            <div className="grid grid-cols-4 gap-4 px-4">
                <div className="col-span-1">
                    <SellNavigation numberIcon={<TbHexagonNumber1Filled className="size-20" />} title='Register Your Vehicle' clickNavigation={clickNavigation1}/>
                </div>
                <div className="col-span-1">
                <SellNavigation numberIcon={<TbHexagonNumber2Filled className="size-20" />} title='Set for Auction' clickNavigation={clickNavigation2} />
                </div>
                <div className="col-span-1">
                <SellNavigation numberIcon={<TbHexagonNumber3Filled className="size-20" />} title='Auction Status' clickNavigation={clickNavigation3} />
                </div>
                <div className="col-span-1">
                <SellNavigation numberIcon={<TbHexagonNumber4Filled className="size-20" />} title='Sell / Transaction' clickNavigation={clickNavigation4} />
                </div>
            </div>
        </div>
    );
}

export default SellHedder
