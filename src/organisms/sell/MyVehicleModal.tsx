import MyVehicleList from "./MyVehicleList"

const MyVehicleModal = () => {

  return (
    <div>
      <div className='w-[800px] tablet-or-mobile:w-[360px] bg-white border-2 border-blue-gray-600 shadow-2xl p-8 rounded-3xl max-h-screen overflow-y-scroll'>
        <div className="px-10 mb-10">
          <div className="flex justify-center items-center py-4 text-bg-gray-800">
            <p className="text-3xl font-bold">My Vehicles</p>
          </div>
          <MyVehicleList />
        </div>
      </div>
    </div>
  );
}

export default MyVehicleModal