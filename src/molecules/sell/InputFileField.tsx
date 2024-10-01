interface InputFieldProps {
  uploadFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  classNames?: string;
  name?:string;
}
  const InputFileField=({title,classNames,uploadFile,name}: InputFieldProps) => {
  return (
    <div className={`mb-4 ${classNames}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">{title}</label>
      <div className="relative">
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={uploadFile} 
          name={name}/>                        
          {/* id={id}
          multiple={!singleFileUpload} */}
                                    
        <div className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
          Click to upload
        </div>
      </div>
    </div>
  );
};

export default InputFileField