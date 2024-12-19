const VehicleApi = {

    searchByOwner: async (ownerId: string) => {
        const response = await fetch(`http://localhost:8082/vehicle/search-by-owner/${ownerId}`);
        let vehicles = await response.json();

        return vehicles;
    },

    deleteById: async (id: number) => {
        const response = await fetch(`http://localhost:8082/vehicle/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response;
    }
}

export default VehicleApi

