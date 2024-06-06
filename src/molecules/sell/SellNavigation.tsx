import { icon } from "@material-tailwind/react/types/components/accordion";

interface props {
    numberIcon?: icon;
    title:string;
    clickNavigation:()=>void;
}

const SellNavigation = ({ numberIcon,title,clickNavigation }: props) => {
  return (
    <div className="grid grid-cols-4 rounded-3xl w-auto h-40 bg-gray-50 border border-gray-300 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={clickNavigation}
    >
        <div className="col-span-1">
        {numberIcon}
        </div>
        <div className="col-span-3 text-gray-600 font-extrabold text-2xl mt-2">
        <h2>{title}</h2>
        </div>
    </div>
  )
}

export default SellNavigation