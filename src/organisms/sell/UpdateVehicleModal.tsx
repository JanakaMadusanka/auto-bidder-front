import ButtonType01 from "../../atoms/common/ButtonType01";
import InputFieldType01 from "../../atoms/common/InputFieldType01";
import SelectFieldType01 from "../../atoms/common/SelectFieldType01";
import SelectFieldType02 from "../../atoms/common/SelectFieldType02";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAtom } from "jotai";
import { selectedVehicleAtom } from "../../store/VehicleAtom";

interface CategoryOption {
  id: number;
  name: string;
}

interface props {
  backButtonOnAction?: () => void;
}

const UpdateVehicleModal = ({ backButtonOnAction }: props) => {

  const [selectedVehicle, setSelectedVehicle] = useAtom(selectedVehicleAtom);
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

  // Handle input changes and update form data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!selectedVehicle) return; // Ensure selectedVehicle exists
    const { name, value } = e.target;
    setSelectedVehicle((prevSelectedVehicle) =>
      prevSelectedVehicle
        ? {
          ...prevSelectedVehicle,
          [name]: value,
        }
        : null
    );
  };

  // Handle form submission
  const handleSubmit = async () => {

    try {
      // Update vehicle
      const response = await fetch(`http://localhost:8082/vehicle/update/${selectedVehicle?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedVehicle),
      });

      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your vehicle is successfully Updated",
          showConfirmButton: false,
          timer: 2500,
        });
        //should be cloesd the modal after comformation 
      } else {
        throw new Error("Failed to update the vehicle.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          (error instanceof Error && error.message) ||
          "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <div>
      <div className='w-[600px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl max-h-screen overflow-y-scroll'>
        <div className="flex justify-center">
          <p className="text-gray-800 text-2xl mt-4 font-semibold">Update Your Vehicle</p>
        </div>
        <div className="text-sm text-gray-600 p-5">
          <SelectFieldType02
            title='Category'
            options={categoryOptions.map(option => ({ value: option.id, label: option.name }))}
            onChange={handleChange}
            value={selectedVehicle?.categoryId || -1}
            name="categoryId"
          />
          <SelectFieldType01 title='Make' options={makeOptions} classNames="mt-4" onChange={handleChange} value={selectedVehicle?.make || 'Select'} name="make" />
          <SelectFieldType01 title='Year' options={yearOptions} classNames="mt-4" onChange={handleChange} value={selectedVehicle?.year || 'Select'} name="year" />
          <InputFieldType01 title='Model' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={selectedVehicle?.model || ''} name="model" />
          <InputFieldType01 title='Color' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={selectedVehicle?.color || ''} name="color" />
          <InputFieldType01 title='Mileage (km)' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={selectedVehicle?.mileage || ''} name="mileage" />
          <InputFieldType01 title='Vehicle Registration Number' inputSize="h-9" classNames="mt-4" onChange={handleChange} value={selectedVehicle?.regNo || ''} name="regNo" />
        </div>
        <div className="flex justify-center gap-3">
          <ButtonType01 title='Update' buttonSize="h-12 w-full" click={handleSubmit} />
          <ButtonType01 title='Go Back' buttonSize="h-12 w-full" click={backButtonOnAction} />
        </div>
      </div>
    </div>
  );
}

export default UpdateVehicleModal