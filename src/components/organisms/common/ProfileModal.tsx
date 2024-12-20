import { useEffect, useState } from "react";
import ButtonType01 from "../../atoms/common/ButtonType01";
import InputFieldType01 from "../../atoms/common/InputFieldType01";
import { useAuth } from "../../../context/AuthContext"; //Import the custom hook 

const ProfileModal = () => {

  const { loggedUserId} = useAuth(); // Use the context to set logged user

  const [profile, setProfile] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    userRole: new Set<Short>(),
  });

  useEffect(() => {

    // fetch data to get Profile details from server
    fetch(`http://localhost:8081/user/search-by-id/${loggedUserId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const userRoleSet = new Set(result.userRole);
        setProfile({
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          mobile: result.mobile,
          userRole: userRoleSet,
        });
      })
      .catch((error) => console.error(error));

  }, [loggedUserId])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  }

  function handleEditProfile() {
  }

  return (
    <div>
      <div className='w-[500px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl'>
        <div className="flex justify-center h">
          <p className="text-gray-800 text-2xl font-semibold">User Profile</p>
        </div>
        <p className="flex justify-center text-gray-800 font-semibold">({profile.email})</p>
        <div className="text-sm text-gray-600">
          <InputFieldType01 title='First Name' classNames="mt-3" inputSize="h-9" value={profile.email} onChange={handleChange} name="firstName" readOnly={true} />
          <InputFieldType01 title='Last Name' classNames="mt-3" inputSize="h-9" value={profile.lastName} onChange={handleChange} name="lastName" readOnly={true} />
          <InputFieldType01 title='Mobile Number' classNames="mt-3" inputSize="h-9" value={profile.mobile} onChange={handleChange} name="mobile" readOnly={true} />
          <div className="mt-3">
            <p className="font-semibold">User Roles:</p>
            <ul className="ml-3">
              {Array.from(profile.userRole).map((roleId) => (
                <li key={roleId}>{roleId}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center w-full mt-3">
            <ButtonType01 title='EditProfile' buttonSize="h-10 w-full" click={handleEditProfile} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal