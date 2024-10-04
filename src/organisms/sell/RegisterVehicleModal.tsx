import ButtonType01 from "../../atoms/common/ButtonType01"
import InputFieldType01 from "../../atoms/common/InputFieldType01"
import SelectFieldType01 from "../../atoms/common/SelectFieldType01"
import InputFileField from "../../molecules/sell/InputFileField"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import image from "../../assets/home/audi-homepage.png"

const RegisterVehicleModal = () => {

  const [categoryOptions, setCategoryOptions] = useState<string[]>(['Select']);
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
        const categories = result.map((item: any) => item.category);
        setCategoryOptions(['Select', ...categories]);
        console.log(result);
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

  const [imagePreviews, setImagePreviews] = useState({
    mainImage: image,
  });

  const [formData, setFormData] = useState(
    {
      ownerId: '',
      category: '',
      make: '',
      year: '',
      model: '',
      color: '',
      milage: '',
      regNo: '',
      mainImage: imagePreviews.mainImage as string | File,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file from the input
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviews((prevPreviews) => ({
          ...prevPreviews,
          mainImage: reader.result as string, // Update image preview with base64 string
        }));
      };
      reader.readAsDataURL(file); // Read the file as a data URL for preview purposes

      // Update formData with the actual file for form submission
      setFormData((prevFormData) => ({
        ...prevFormData,
        mainImage: file, // Save the actual file for submission
      }));
    }
  };

  const handleSubmit = () => {

    if (!formData.category || !formData.make || !formData.year || !formData.model || !formData.color || !formData.milage || !formData.regNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Data',
        text: 'Please fill in all the required fields.',
      });
      return;
    }
    if (formData.category === 'Select' || formData.make === 'Select' || formData.year === 'Select') {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Selection',
        text: 'Please select valid options for category, make, and year.',
      });
      return;
    }
    console.log(formData);

    // form submission


    const formDataToSend = new FormData();

    // Assert that key is of type keyof typeof formData
    (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    fetch('http://localhost:8081/vehicle/register', {
      method: 'POST',
      body: formDataToSend,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Logs the response data in the console
        Swal.close();
        if (data.success) {
          console.log(data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your vehicle is successfully registered",
            showConfirmButton: false,
            timer: 2500
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Vehicle Already Registered',
            text: 'Please register a different vehicle',
          });
        }
      })
      .catch((error) => {
        Swal.close();
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
            <SelectFieldType01 title='Category' options={categoryOptions} onChange={handleChange} value={formData.category} name="category" />
            <SelectFieldType01 title='Make' options={makeOptions} classNames="mt-4" onChange={handleChange} value={formData.make} name="make" />
            <SelectFieldType01 title='Year' options={yearOptions} classNames="mt-4" onChange={handleChange} value={formData.year} name="year" />
            <InputFieldType01 title='Model' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={formData.model} name="model" />
            <InputFieldType01 title='Color' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={formData.color} name="color" />
            <InputFieldType01 title='Milage (km)' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={formData.milage} name="milage" />
            <InputFieldType01 title='Vehicle Registration Number' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={formData.regNo} name="regNo" />
          </div>
          <div className="col-span-1 text-sm text-gray-600 p-5">
            <div className="grid gap-6 font-semibold">
              <div className=" border-2 p-2 h-fit">
                <InputFileField title='Add main image' uploadFile={handleFileUpload} name="mainImage" />
                {imagePreviews.mainImage && <img src={imagePreviews.mainImage} alt="Main Vehicle" className="mt-2 max-w-full h-auto" />}
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