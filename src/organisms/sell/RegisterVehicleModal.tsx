import ButtonType01 from "../../atoms/common/ButtonType01"
import InputFieldType01 from "../../atoms/common/InputFieldType01"
import SelectFieldType01 from "../../atoms/common/SelectFieldType01"
import SelectFieldType02 from "../../atoms/common/SelectFieldType02"
import InputFileField from "../../molecules/sell/InputFileField"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

type Short = number;
interface CategoryOption {
  id: Short;
  name: string;
}

const RegisterVehicleModal = () => {

  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([{ id: -1, name: 'Select' }]);
  const makeOptions = ['Select', 'Toyota', 'Honda', 'Nisan', 'BMW', 'Benz', 'Maruthi', 'Tata', 'Laylend', 'Other']
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  const fetchCategoryOptions = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    fetch("http://localhost:8082/category/get/all", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const categories = result.map((item: any) => ({
          id: item.id,         // categoryId
          name: item.category  // category name
        }));
        setCategoryOptions([{ id: -1, name: 'Select' }, ...categories]); // Prepend 'Select' to the array
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchCategoryOptions();  // Fetch categories when component mounts

    const currentYear = new Date().getFullYear(); // get current year
    const startYear = 2000; // Define starting year
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => (startYear + index).toString());
    setYearOptions(['Select', ...years]); // Prepend 'Select' to the array
  }, []);

  const [formData, setFormData] = useState(
    {
      ownerId: 0,
      categoryId: 0,
      make: '',
      year: '',
      model: '',
      color: '',
      mileage: '',
      regNo: '',
      mainImageUrl: '', // Store the main image URL
      additionalImageUrls: [] as string[], // Store additional image URLs
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'ownerId' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  const handleMainImageUpload = (images: string[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      mainImageUrl: images[0], // Replace the main image
    }));
  };

  const handleAdditionalImagesUpload = (images: string[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      additionalImageUrls: [...prevFormData.additionalImageUrls, ...images], // Append additional images
    }));
  };

  const handleSubmit = () => {

    if (!formData.categoryId || !formData.make || !formData.year || !formData.model || !formData.color || !formData.mileage || !formData.regNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Data',
        text: 'Please fill in all the required fields.',
      });
      return;
    }

    if (formData.categoryId === 0 || formData.make === 'Select' || formData.year === 'Select') {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Selection',
        text: 'Please select valid options for category, make, and year.',
      });
      return;
    }

    // Send form data as JSON
    fetch('http://localhost:8082/vehicle/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Send as JSON
    })
      .then(response => {
        if (response.status === 201) { // 201 Created, success
          return response.text(); // Get response text (message from backend)
        } else if (response.status === 409) { // 409 Conflict, vehicle already exists
          throw new Error('Vehicle already registered.');
        } else if (!response.ok) { // Other errors
          throw new Error('Something went wrong.');
        }
        return response.text(); // Handle other success cases
      })
      .then(message => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: message || "Your vehicle is successfully registered",
          showConfirmButton: false,
          timer: 2500
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message || 'An error occurred during registration. Please try again later.',
        });
      });
  };

  return (
    <div>
      <div className='w-[800px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl max-h-screen  overflow-y-scroll'>
        <div className="flex justify-center">
          <p className="text-gray-800 text-2xl mt-4 font-semibold">Register Your Vehicle</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1 text-sm text-gray-600 p-5">

            <SelectFieldType02
              title='Category'
              options={categoryOptions.map(option => ({ value: option.id, label: option.name }))} // Keep value as number
              onChange={handleChange}
              value={formData.categoryId} // Ensure this is a number
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

              <div className=" border-2 p-2 h-fit">
                <InputFileField
                  title="Add main image"
                  classNames="mt-4"
                  setImages={handleMainImageUpload}
                  singleFileUpload={true} // Single file upload for main image
                />
              </div>

              <div className="border-2 p-2 h-fit mt-4">
                <InputFileField
                  title="Add additional images"
                  classNames="mt-4"
                  setImages={handleAdditionalImagesUpload}
                />
                <div className="grid grid-cols-2 gap-2 mt-2">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonType01 title='Register' buttonSize="h-12 w-full" click={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default RegisterVehicleModal