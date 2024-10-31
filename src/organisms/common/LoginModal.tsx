import { useState } from "react";
import ButtonType01 from "../../atoms/common/ButtonType01";
import CheckBoxType01 from "../../atoms/common/CheckBoxType01";
import InputFieldType01 from "../../atoms/common/InputFieldType01";
import InputFieldTypePassword from "../../atoms/common/InputFieldTypePassword";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext"; // Import the custom hook

const LoginModal = () => {

  const { setIsLogged, setLoggedUserId } = useAuth(); // Use the context to set login state and logged user

  const [loginData, setLoginData] = useState({
    "email": "",
    "password": ""
  });
  const [isValidEmail, setIsValidEmail] = useState(true); // State to validate email
  const [isMatch, setIsMatch] = useState(true); // State to check if credentials match

  // Handle input changes for email and password fields
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  // Validate email format on blur (when the input field loses focus)
  const handleBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Regex for email
    const isValidEmails = emailRegex.test(loginData.email);// Validate emails
    if (isValidEmails) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }

  // Handle login when the "Log in" button is clicked
  const loginClick = () => {

    if (isValidEmail) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(loginData);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect,
      };

      fetch("http://localhost:8081/login/request", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (result == "true") { // If login is successful
            setIsMatch(true);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "You are Logged in",
              showConfirmButton: false,
              timer: 2500
            });
            setIsLogged(true);  // Set user as logged in
          } else { // If login is not successful
            setIsMatch(false);
          }
        })
        .catch((error) => console.error(error));
    }
  }

  //get logged user Id
  fetch(`http://localhost:8081/user/search-by-email/${loginData.email}`)
    .then((response) => response.json())
    .then((result) => {
      setLoggedUserId(result.id); // Store the email of the logged-in user
    })
    .catch((error) => console.error(error));

  return (
    <div>
      <div className='w-[500px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl'>

        <div className="flex justify-center">
          <p className="text-gray-800 text-2xl mt-4 font-semibold">Log in</p>
        </div>

        {/* email input field */}
        <div className="text-gray-600 text-sm">
          <InputFieldType01 title='e-mail' classNames="mt-6" name="email" value={loginData.email} onChange={handleChange} onBlur={handleBlur} />

          {/* alert for invalid email */}
          {!isValidEmail &&
            <label className="text-red-600" htmlFor="">
              Please Enter Valid e-mail address
            </label>}

          {/* password input field */}
          <InputFieldTypePassword title='Password' classNames="mt-6" name="password" value={loginData.password} onChange={handleChange} />
          <div className="mt-6">
            <CheckBoxType01 label="Remember me?" />
          </div>

        </div>
        {!isMatch &&
          <div className="rounded-xl p-2 bg-red-200 mt-6">
            <label className="text-red-600" htmlFor="">
              The email or password you enterd doesnt match
            </label>
          </div>


        }
        <div className="flex justify-center w-full mt-6">
          <ButtonType01 click={loginClick} title='Log in' buttonSize="h-12 w-full" />
        </div>
        <div className="mt-6 text-gray-600 text-sm hover:text-gray-800 hover:text-">
          <button className="hover:underline-offset-1">Forgot your password ?</button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal