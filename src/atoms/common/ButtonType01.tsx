interface ButtonType01Props {
  title: string;
  click?: () => void;
  buttonSize?: string;
}

const ButtonType01 = ({title,click,buttonSize}: ButtonType01Props) => {
  return (
    <div className="w-full">
      <button
        onClick={click}
        className={`flex items-center justify-center focus:outline-none text-white bg-gray-600 hover:bg-gray-800 font-bold rounded-xl text-[16px] px-6 py-2 ${buttonSize}`}
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonType01;
