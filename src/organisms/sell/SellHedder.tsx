import SellNavigation from "../../molecules/sell/SellNavigation";
import { TbHexagonNumber1Filled,TbHexagonNumber2Filled,TbHexagonNumber3Filled } from "react-icons/tb";


const SellHedder = () => {
    return (
        <div className="mb-5">
            <div className="flex justify-center items-center py-4 text-bg-gray-800">
                <p className="text-3xl font-bold">Sell My Vehicle</p>
            </div>
            <div className="grid grid-cols-3 gap-4 px-4">
                <div className="col-span-1">
                    <SellNavigation numberIcon={<TbHexagonNumber1Filled className="size-20"/>}/>
                </div>
                <div className="col-span-1">
                <SellNavigation numberIcon={<TbHexagonNumber2Filled className="size-20"/>}/>
                </div>
                <div className="col-span-1">
                <SellNavigation numberIcon={<TbHexagonNumber3Filled className="size-20"/>}/>
                </div>
                
            </div>
        </div>
    );
}

export default SellHedder
