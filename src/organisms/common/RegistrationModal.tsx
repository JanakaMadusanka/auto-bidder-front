import ButtonType01 from "../../atoms/common/ButtonType01";
import CheckBoxType01 from "../../atoms/common/CheckBoxType01";
import InputFieldType01 from "../../atoms/common/InputFieldType01";

const RegistrationModal = () => {

  return (
    <div>
      <div className='w-[500px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl'>
        <div className="flex justify-center h">
          <p className="text-gray-800 text-2xl mt-4 font-semibold">Registration</p>
        </div>
        <div className="text-sm text-gray-600">
          <InputFieldType01 title='First Name' classNames="mt-4" />
          <InputFieldType01 title='Last Name' classNames="mt-4" />
          <InputFieldType01 title='e-mail' classNames="mt-4" />
          <InputFieldType01 title='Password' inputType="password" classNames="mt-4" />
          <InputFieldType01 title='Confirm Password' inputType="password" classNames="mt-4" />
          <div className="mt-4">
            <label htmlFor="">Select User Role/Roles :</label>
            <div className="grid grid-cols-2 mt-1">
              <CheckBoxType01 label="Buyer" classes="col-span-1" />
              <CheckBoxType01 label="Seller" classes="col-span-1" />
            </div>
          </div>
          <div className="flex justify-center w-full mt-4">
            <ButtonType01 title='Register' buttonSize="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationModal