import ButtonType01 from "../../atoms/common/ButtonType01";
import InputFieldType01 from "../../atoms/common/InputFieldType01";
import SelectFieldType01 from "../../atoms/common/SelectFieldType01";
import SelectFieldType02 from "../../atoms/common/SelectFieldType02";
import InputFileField from "../../molecules/sell/InputFileField";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext"; //Import the custom hook 

interface CategoryOption {
  id: number;
  name: string;
}

const RegisterVehicleModal = () => {

  const { loggedUserId } = useAuth(); // Use the context to set logged user
  const makeOptions = ['Select', 'Toyota', 'Honda', 'Nissan', 'BMW', 'Benz', 'Maruti', 'Tata', 'Leyland', 'Other'];
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  // Initialize category options state with a default selection
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([{ id: -1, name: 'Select' }]);

  // Fetch categories from the backend and set options for the category select field
  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch("http://localhost:8082/category/get/all");
      const result = await response.json();
      const categories = result.map((item: any) => ({
        id: item.id,         // categoryId
        name: item.category  // category name
      }));
      setCategoryOptions([{ id: -1, name: 'Select' }, ...categories]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryOptions();  // Fetch categories when component mounts

    const currentYear = new Date().getFullYear(); // get current year
    const startYear = 2000; // Define starting year for year options
    // Generate an array of years from startYear to currentYear
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => (startYear + index).toString());
    setYearOptions(['Select', ...years]); // Prepend 'Select' to the year options
  }, []);

  const [formData, setFormData] = useState({
    ownerId: 0,
    categoryId: 0,
    make: '',
    year: '',
    model: '',
    color: '',
    mileage: '',
    regNo: '',
    //mainImageUrl: '', // Store the main image URL
    //additionalImageUrls: [] as string[], // Store additional image URLs
    isUnderAuction: false,
    minBidAmount: 0,
    auctionTimeOut: 72,
  });

  // adding logged user id as a ownerId field of the form data
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ownerId: Number(loggedUserId) || 0,  // Ensure loggedUserId is a number, default to 0 if it's undefined or not a valid number
    }));
  }, [loggedUserId]);

  // Handle input changes and update form data state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "ownerId" || name === "categoryId" ? Number(value) : value,
    }));
  };

  //Import Selected Images From Input File Field
  const [mainImage, setMainImage] = useState<File | null>(null); // Store the main image file
  const [additionalImages, setAdditionalImages] = useState<File[]>([]); // Store additional image files

  // Function to handle the main image from InputFileField (passed as prop)
  const handleMainImageFromChild = (imageArray: File[]) => {
    if (imageArray.length > 0) {
      setMainImage(imageArray[0]); // Set the first file as the main image (single file upload)
    }
  };

  // Function to handle additional images from InputFileField (passed as prop)
  const handleAdditionalImageFromChild = (imageArray: File[]) => {
    setAdditionalImages(imageArray); // Set the array of additional images
  };

  //Upload an image to Cloudinary and return the URL
  const uploadImageToCloudinary = async (image: File) => {

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "i3rttw6d"); //Cloudinary upload preset
    formData.append("cloud_name", "dxem0e46h"); //Cloudinary cloud name

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dxem0e46h/image/upload`, // Cloudinary API endpoint
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url; // Return the URL of the uploaded image
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!mainImage || additionalImages.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Data",
        text: "Please fill in all the required fields and upload images.",
      });
      return;
    }

    try {
      // Upload main image and additional images & save Image URLs
      const mainImageUrl = await uploadImageToCloudinary(mainImage);

      const additionalImageUrls = await Promise.all(
        additionalImages.map(uploadImageToCloudinary)
      );

      // Prepare form data with the URLs from Cloudinary
      const response = await fetch("http://localhost:8082/vehicle/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,  // Include existing form data
          mainImageUrl,  // Include the uploaded mainImageUrl
          additionalImageUrls, // Include the uploaded additionalImageUrls
        }),
      });

      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your vehicle is successfully registered",
          showConfirmButton: false,
          timer: 2500,
        });
        clearFormData(); // Clear the form after successful submission
      } else {
        throw new Error("Something went wrong during registration.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          (error instanceof Error && error.message) ||
          "An unexpected error occurred. Please try again later.",
      });
    }
  };

  // state to pass as a prop to clear image data in child component (inputFileField)
  const [clearFilesTrigger, setClearFilesTrigger] = useState(false);

  // Clear form data and reset state
  const clearFormData = () => {
    setFormData({
      ownerId: 0,
      categoryId: 0,
      make: "",
      year: "",
      model: "",
      color: "",
      mileage: "",
      regNo: "",
      isUnderAuction: false,
      minBidAmount: 0,
      auctionTimeOut: 72,
    });

    setMainImage(null); // Clear main image file 
    setAdditionalImages([]); // Clear additional image files

    setClearFilesTrigger(true);  // Trigger the clear function in the child(Input File Field)
    setTimeout(() => setClearFilesTrigger(false), 0); // Reset the flag after clearing
  };

  return (
    <div>
      <div className='w-[800px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl max-h-screen overflow-y-scroll'>
        <div className="flex justify-center">
          <p className="text-gray-800 text-2xl mt-4 font-semibold">Register Your Vehicle</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1 text-sm text-gray-600 p-5">
            <SelectFieldType02
              title='Category'
              options={categoryOptions.map(option => ({ value: option.id, label: option.name }))}
              onChange={handleChange}
              value={formData.categoryId}
              name="categoryId"
            />
            <SelectFieldType01 title='Make' options={makeOptions} classNames="mt-4" onChange={handleChange} value={formData.make} name="make" />
            <SelectFieldType01 title='Year' options={yearOptions} classNames="mt-4" onChange={handleChange} value={formData.year} name="year" />
            <InputFieldType01 title='Model' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={formData.model} name="model" />
            <InputFieldType01 title='Color' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={formData.color} name="color" />
            <InputFieldType01 title='Mileage (km)' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={formData.mileage} name="mileage" />
            <InputFieldType01 title='Vehicle Registration Number' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={formData.regNo} name="regNo" />
          </div>
          <div className="col-span-1 text-sm text-gray-600 p-5">
            <div className="grid gap-6 font-semibold">
              <div className="border-2 p-2 h-fit">
                <InputFileField
                  title="Add main image"
                  classNames="mt-4"
                  singleFileUpload={true} // Single file upload for main image
                  clearFiles={clearFilesTrigger} // Pass the trigger to the child component
                  passArrayToParent={handleMainImageFromChild}
                />
              </div>
              <div className="border-2 p-2 h-fit mt-4">
                <InputFileField
                  title="Add additional images"
                  classNames="mt-4"
                  singleFileUpload={false} // Allow multiple file uploads for additional images
                  clearFiles={clearFilesTrigger} // Pass the trigger to the child component
                  passArrayToParent={handleAdditionalImageFromChild}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonType01 title='Register' buttonSize="h-12 w-full" click={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default RegisterVehicleModal