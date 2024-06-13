import { useState } from "react";
import ButtonType01 from "../../atoms/common/ButtonType01";
import CheckBoxType01 from "../../atoms/common/CheckBoxType01";
import InputFieldType01 from "../../atoms/common/InputFieldType01";
import InputFieldTypePassword from "../../atoms/common/InputFieldTypePassword";
import Swal from 'sweetalert2'

const RegistrationModal = () => {

  // Reed input data
  const [formData, setFormData] = useState(
    {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
      userRole: []
    });

  const [isSellerChecked, setIsSellerChecked] = useState(false)
  const [isBuyerChecked, setIsBuyerChecked] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //  Set seller User Role 
  const handleSellerChecked = () => {
    setIsSellerChecked(!isSellerChecked);
    setFormData((prevFormData) => {
      const updatedRoles = [...prevFormData.userRole];
      if (!isSellerChecked) {
        updatedRoles.push(2); // Assuming seller role is represented by 2
      } else {
        const index = updatedRoles.indexOf(2);
        if (index > -1) {
          updatedRoles.splice(index, 1);
        }
      }
      return {
        ...prevFormData,
        userRole: updatedRoles,
      };
    });
  };

  //  Set buyer User Role
  const handleBuyerChecked = () => {
    setIsBuyerChecked(!isBuyerChecked);
    setFormData((prevFormData) => {
      const updatedRoles = [...prevFormData.userRole];
      if (!isBuyerChecked) {
        updatedRoles.push(3); // Assuming buyer role is represented by 3
      } else {
        const index = updatedRoles.indexOf(3);
        if (index > -1) {
          updatedRoles.splice(index, 1);
        }
      }
      return {
        ...prevFormData,
        userRole: updatedRoles,
      };
    });
  };

  const handleSubmit = () => {
    // Check for empty required fields
    const { firstName, lastName, mobile, email, password, confirmPassword, userRole } = formData;

    if (!firstName || !lastName || !mobile || !email || !password || !confirmPassword || userRole.length === 0) {
      alert("Please fill out all required fields and select at least one role.");
      return;
    }
    // Check for confirm password
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { confirmPassword: confirmPwd, ...payload } = formData; // Exclude confirmPassword from the payload

    console.log("Form Data:", payload); // Log the form 

    // Show loading indicator
    Swal.fire({
      title: "Registering...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    fetch('http://localhost:8081/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
      })
      .then(data => {
        console.log('Success:', data);
        Swal.close(); // Close loading indicator
        // show success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You are successfully Registered",
          showConfirmButton: false,
          timer: 2500
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.close(); // Close loading indicator
        // show error message
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message || 'An error occurred during registration. Please try again later.',
        });
      });
  };

  return (
    <div>
      <div className='w-[500px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl'>
        <div className="flex justify-center h">
          <p className="text-gray-800 text-2xl font-semibold">User Registration</p>
        </div>
        <div className="text-sm text-gray-600">
          <InputFieldType01 title='First Name' classNames="mt-3" inputSize="h-9" onChange={handleChange} value={formData.firstName} name="firstName" />
          <InputFieldType01 title='Last Name' classNames="mt-3" inputSize="h-9" onChange={handleChange} value={formData.lastName} name="lastName" />
          <InputFieldType01 title='Mobile Number' classNames="mt-4" inputSize="h-9" onChange={handleChange} value={formData.mobile} name="mobile" />
          <InputFieldType01 title='e-mail' classNames="mt-3" inputSize="h-9" onChange={handleChange} value={formData.email} name="email" />
          <InputFieldTypePassword title='Password' classNames="mt-3" inputSize="h-9" onChange={handleChange} value={formData.password} name="password" />
          <InputFieldTypePassword title='Confirm Password' classNames="mt-3" inputSize="h-9" onChange={handleChange} value={formData.confirmPassword} name="confirmPassword" />
          <div className="mt-3">
            <label htmlFor="" className=" font-semibold">Select User Role/Roles :</label>
            <div className="grid grid-cols-2 mt-1">
              <CheckBoxType01 label="Buyer" classes="col-span-1" onChange={handleSellerChecked} checked={isSellerChecked} />
              <CheckBoxType01 label="Seller" classes="col-span-1" onChange={handleBuyerChecked} checked={isBuyerChecked} />
            </div>
          </div>
          <div className="flex justify-center w-full mt-3">
            <ButtonType01 title='Register' buttonSize="h-10 w-full" click={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationModal