import {atom} from 'jotai';

// Define the Vehicle interface
export interface Vehicle {
    id: number,
    ownerId: number,
    categoryId: number,
    make: string,
    year: string,
    model: string,
    color: string,
    mileage: string,
    regNo: string,
    mainImageUrl: string,
    additionalImageUrls: string[],
    isUnderAuction: boolean,
    minBidAmount:number,
    auctionTimeOut:number,
}

// Atom to store vehicles
export const myVehiclesAtom = atom<Vehicle[]>([]);

// Example atom for updating a specific vehicle
export const selectedVehicleAtom = atom<Vehicle | null>(null);