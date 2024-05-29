interface ButtonTypeAuctionProps {
    //imageSrc?: any;
    title: string;
    click?: () => void;
    buttonSize?: string;
    imageSize?: string;
  }
  
  const ButtonTypeAuction = ({title,click,buttonSize,imageSize=""}: ButtonTypeAuctionProps) => {
    return (
        <div>
          <button
            onClick={click}
            className={`h-8 border-2 border-white flex items-center justify-center focus:outline-none text-bg-gray-600 hover:bg-gray-800 hover:text-white font-bold text-[16px] px-6 py-2 ${buttonSize}`}
          >
            <div className={`pr-2 ${imageSize}`}></div>
            {title}
          </button>
        </div>
      );
}

export default ButtonTypeAuction