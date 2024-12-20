interface InputFieldType01Props {
    title: string;
    inputType?: string;
    classNames?: string;
    inputSize?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name: string;
    readOnly?:boolean;
}
const InputFieldType01 = ({ title, inputType, classNames, inputSize, onChange, onBlur, value, name,readOnly }: InputFieldType01Props) => {


    return (
        <div className={` w-full ${classNames}`}>
            <div className="font-semibold"><p >{`${title} :`}</p></div >
            <input
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                className={`mt-1 w-full px-3 rounded-lg border-1 border-gray-400 items-center h-12 bg-gray-200 text-gray-800 ${inputSize}`}
                type={inputType}
                readOnly={readOnly}
                id=""
            />
        </div>
    )
}
export default InputFieldType01

