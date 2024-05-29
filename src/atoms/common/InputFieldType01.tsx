interface PasswordFieldProps {
    title: string;
    inputType?: string;
    classNames?: string;
    inputSize?: string;
}
const InputFieldType01 = ({ title,inputType,classNames,inputSize}: PasswordFieldProps) => {


    return (
        <div className={`place-items-center w-full ${classNames}`}>
            <div className="font-semibold"><p >{`${title} :`}</p></div >
            <input className={`mt-1 w-full px-3 rounded-lg border-1 border-gray-400 items-center h-12 bg-gray-200 text-gray-800 ${inputSize}`} type={inputType} name="" id="" />
        </div>
    )
}
export default InputFieldType01

