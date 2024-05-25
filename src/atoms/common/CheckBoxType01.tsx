interface CheckBoxType01Props {
    label?: string;
    checked?: boolean;
    onChange?: () => void;
}

const CheckBoxType01 = ({ label,checked,onChange }: CheckBoxType01Props) => {
    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="form-checkbox h-5 w-5 text-gray-600 border-gray-300 rounded focus:ring-blue-500"
                
                //className={`flex items-center justify-center focus:outline-none text-white bg-gray-600 hover:bg-gray-800 font-bold rounded-xl text-[16px] px-6 py-2 ${buttonSize}`}
            />
            <label htmlFor={label} className="text-gray-800">{label}</label>
        </div>
        
    );
};

export default CheckBoxType01;