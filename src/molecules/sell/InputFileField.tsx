import Axios from 'axios';
import { useState } from 'react';
interface InputFieldProps {
  singleFileUpload?: boolean; // Optional prop for single file upload
  title: string;
  classNames?: string;
  setImages: (images: string[]) => void;
}

const InputFileField = ({ classNames, setImages, title, singleFileUpload = false }: InputFieldProps) => {
  const [fileUrls, setFileUrls] = useState<string[]>([]); // State to store file URLs

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      uploadFiles(files);
    }
  };

  const uploadFiles = (files: FileList) => {
    const uploadPromises = Array.from(files).map(uploadSingleFile); // Upload each file

    Promise.all(uploadPromises)
      .then((responses) => {
        const uploadedUrls = responses.map((res) => res.data.secure_url);

        // If single file upload, replace the entire state, otherwise append
        if (singleFileUpload) {
          setFileUrls(uploadedUrls);
          setImages(uploadedUrls);
        } else {
          const updatedUrls = [...fileUrls, ...uploadedUrls];  // Append new URLs
          setFileUrls(updatedUrls);
          setImages(updatedUrls);  // Set the final updated array directly
        }
      })
      .catch((error) => {
        console.error('Upload failed', error);
      });
  };

  const uploadSingleFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'i3rttw6d'); // Cloudinary upload preset

    return Axios.post('https://api.cloudinary.com/v1_1/dxem0e46h/image/upload', formData);
  };

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
        {fileUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} className="mt-2 max-w-full h-auto" />
        ))}
      </div>
    </div>
  );
};

export default InputFileField;