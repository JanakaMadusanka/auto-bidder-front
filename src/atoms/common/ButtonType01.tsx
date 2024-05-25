interface ButtonType01Props {
  //imageSrc?: any;
  title: string;
  click?: () => void;
  buttonSize?: string;
  imageSize?: string;
}

const ButtonType01 = ({title,click,buttonSize,imageSize=""}: ButtonType01Props) => {
  return (
    <div className="w-full">
      <button
        onClick={click}
        className={`flex items-center justify-center focus:outline-none text-white bg-gray-600 hover:bg-gray-800 font-bold rounded-xl text-[16px] px-6 py-2 ${buttonSize}`}
      >
        <div className={`pr-2 ${imageSize}`}></div>
        {title}
      </button>
    </div>
  );
};

export default ButtonType01;
