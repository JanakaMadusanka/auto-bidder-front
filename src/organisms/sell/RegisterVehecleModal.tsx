import ButtonType01 from "../../atoms/common/ButtonType01"
import InputFieldType01 from "../../atoms/common/InputFieldType01"
import image from '../../assets/home/carosul2.png'
import SelectFieldType01 from "../../atoms/common/SelectFieldType01"

const RegisterVehecleModal = () => {

  const categoryOptions = ['Select', 'Car-Sedan', 'Car-HatchBack', 'Car-Mini', 'Double Cab', 'Single Cab', 'Jeep', 'Van', 'Truck', 'Heavy Vehicle', 'Other'];
  const makeOptions = ['Select', 'Toyota', 'Honda', 'Nisan', 'BMW', 'Benz', 'Maruthi', 'Tata', 'Laylend', 'Other']
  const yearOptions = ['Select', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2007']

  return (
    <div>
      <div className='w-[800px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl'>
        <div className="flex justify-center">
          <p className="text-gray-800 text-2xl mt-4 font-semibold">Register Your Vehicle</p>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1 text-sm text-gray-600 p-5">
            <SelectFieldType01 title='Category' options={categoryOptions} />
            <SelectFieldType01 title='Make' options={makeOptions} classNames="mt-4" />
            <SelectFieldType01 title='Year' options={yearOptions} classNames="mt-4" />
            <InputFieldType01 title='Model' inputSize="h-9" classNames="mt-4" />
            <InputFieldType01 title='Color' inputSize="h-9" classNames="mt-4" />
            <InputFieldType01 title='Milage (km)' inputSize="h-9" classNames="mt-4" />
            <InputFieldType01 title='Vehicle Registration Number' inputSize="h-9" classNames="mt-4" />
          </div>
          <div className="col-span-1 text-sm text-gray-600 p-5">
            <div className="grid grid-rows-2 font-semibold">
              <p>Add main image</p>
              <div className="row-span-1">
                <img src={image} alt="" />
              </div>
              <p>Add additional images</p>
              <div className="row-span-1">
                <img src={image} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonType01 title='Register' buttonSize="h-12 w-full" />
        </div>
      </div>
    </div>
  )
}

export default RegisterVehecleModal