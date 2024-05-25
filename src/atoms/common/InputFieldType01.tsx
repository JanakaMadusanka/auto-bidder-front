interface PasswordFieldProps {
    title: string;
    inputType?: string;
    classNames?: string;
}
const InputFieldType01 = ({ title,inputType,classNames}: PasswordFieldProps) => {

    return (
        <div className={`place-items-center w-full ${classNames}`}>
            <div><p >{`${title} :`}</p></div >
            <input className="mt-2 w-full px-3 rounded-lg border-1 border-gray-400 items-center h-12 bg-gray-200 text-gray-800" type={inputType} name="" id="" />
        </div>
    )
}
export default InputFieldType01