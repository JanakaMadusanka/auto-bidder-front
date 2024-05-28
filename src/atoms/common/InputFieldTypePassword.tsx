import { useState } from "react";
import { IoEye,IoEyeOff } from "react-icons/io5";

interface props {
    title: string;
    classNames?: string;
    inputSize?: string;
}
const InputFieldTypePassword = ({ title, classNames, inputSize }: props) => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={`place-items-center w-full ${classNames}`}>
            <div><p >{`${title} :`}</p></div >
            <div className="relative">
                <input
                    type={passwordVisible ? 'text' : 'password'}
                    name=""
                    id=""
                    className={`mt-1 w-full pl-3 pr-10 rounded-lg border-1 border-gray-400 items-center h-12 bg-gray-200 text-gray-800 ${inputSize}`}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? <IoEye /> : <IoEyeOff />}
                </button>
            </div>
        </div>
    )
}
export default InputFieldTypePassword

