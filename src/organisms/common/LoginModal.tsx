import ButtonType01 from "../../atoms/common/ButtonType01";
import CheckBoxType01 from "../../atoms/common/CheckBoxType01";
import InputFieldType01 from "../../atoms/common/InputFieldType01";

const LoginModal = () => {

  return (
    <div>
      <div className='w-[500px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl'>

        <div className="flex justify-center">
          <p className="text-gray-800 text-3xl mt-4 font-semibold">Log in</p>
        </div>
        <InputFieldType01 title='e-mail' classNames="mt-6"  />
        <InputFieldType01 title='Password' inputType="password" classNames="mt-6" />

        <div className="mt-6">
          <CheckBoxType01 label="Remember me?"/>
        </div>

        <div className="flex justify-center w-full mt-6">
          <ButtonType01 title='Log in' buttonSize="h-12 w-full" />
        </div>
        <div className="mt-6">
          <label htmlFor="">Forgot your password ?</label>
        </div>
      </div>
    </div>
  )
}

export default LoginModal