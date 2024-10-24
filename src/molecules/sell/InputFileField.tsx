import { useEffect, useState } from 'react';
interface InputFieldProps {
  singleFileUpload?: boolean; // Optional prop for single file upload
  title: string;
  classNames?: string;
  clearFiles?: boolean;
  passArrayToParent: (images: File[]) => void;
}

const InputFileField = ({ classNames, title, singleFileUpload = false, clearFiles, passArrayToParent }: InputFieldProps) => {

  const [files, setFiles] = useState<File[]>([]); // State to store files

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      if (singleFileUpload) {
        setFiles([selectedFiles[0]]); //Replace new file if single file upload is enabled
      } else {
        const newFilesArray = Array.from(selectedFiles); // For multiple file upload, append new files
        setFiles(prevFiles => [...prevFiles, ...newFilesArray]);
      }
    }
    e.target.value = ''; // Reset file input so the same file can be selected again
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index)); // Remove the file at the specified index
  };

  // Passing Files array to the parent whenever files array changes
  useEffect(() => {
    passArrayToParent(files); // Pass the current array of files to the parent
  }, [files, passArrayToParent]);

  // Use useEffect to clear files when the `clearFiles` prop is set to true
  useEffect(() => {
    if (clearFiles) {
      setFiles([]); // Clear the files array when clearFiles is true
    }
  }, [clearFiles]);

  return (
    <div className={`mb-4 ${classNames}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">{title}</label>
      <div className="relative">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          multiple={!singleFileUpload} // Allow multiple file uploads unless singleFileUpload is true
        />
        <div className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
          Click to upload
        </div>
      </div>
      <div className="border-2 p-2 h-fit">
        {files.map((file, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(file)} // Use URL.createObjectURL to preview the image
              alt={`Preview ${index}`}
              className="mt-2 max-w-full h-auto"
            />
            <button
              onClick={() => handleRemoveFile(index)} // Call the delete handler
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 w-full"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputFileField;