import { icon } from "@material-tailwind/react/types/components/accordion";

interface props {
    numberIcon?: icon;
}


const SellNavigation = ({ numberIcon }: props) => {
  return (
    <div className="rounded-3xl w-auto h-40 bg-gray-50 border border-gray-300 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        {numberIcon}
    </div>
  )
}

export default SellNavigation