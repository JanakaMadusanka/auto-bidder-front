interface CheckBoxType01Props {
    label?: string;
    classes?:string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?:boolean;
}

const CheckBoxType01 = ({ label,checked,onChange,classes }: CheckBoxType01Props) => {
    return (
        <div className={`flex items-center space-x-2 ${classes}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="form-checkbox h-5 w-5 text-gray-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={label} className="text-gray-800">{label}</label>
        </div>
    );
};

export default CheckBoxType01;