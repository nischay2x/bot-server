import Vehicles from "../models/vehicles";

import { errorHandler } from "../errors";

export async function createVehicle (req, res) {
    try {
        const { name, brand, hourPrice, dayPrice, number } = req.body;
        const image = req.image;

        await Vehicles.create({
            name, brand, hourPrice, 
            dayPrice, image, number
        });

        return res.status(200).json({
            status: true,
            msg: "Vehicle Added to Fleet"
        });
    } catch (error) { errorHandler(error, res); }
}

export async function updateVehicleData (req, res) {
    try {
        const { 
            name, brand, hourPrice, dayPrice, 
            number, bookedTill, isAvailable 
        } = req.body;
        const { id } = req.params;

        await Vehicles.findByIdAndUpdate(id, {
            $set: {
                name, brand, hourPrice, 
                dayPrice, image, number,
                bookedTill, isAvailable
            }
        });

        return res.status(200).json({
            status: true,
            msg: "Vehicle Data Updated"
        });
    } catch (error) { errorHandler(error, res); }
}

export async function updateVehicleImage (req, res) {
    try {
        const image = req.image;
        const { id } = req.params;

        await Vehicles.findByIdAndUpdate(id, {
            $set: { image }
        });

        return res.status(200).json({
            status: true,
            msg: "Vehicle Image Updated",
            data: { image }
        });
    } catch (error) { errorHandler(error, res); }
}

export async function deleteVehicle (req, res) {
    try {
        const { id } = req.params;

        await Vehicles.findByIdAndDelete(id);
        
        return res.status(200).json({
            status: true,
            msg: "Vehicle Removed From Fleet"
        });
    } catch (error) { errorHandler(error, res); }
}

export async function getVehicles (req, res) {
    try {
        const { 
            brand, sort = "createdAt", name, number,
            isAvailable, limit, offset = 0 
        } = req.query;

        let query = {};
        if(brand) query.brand = { $regex: brand };
        if(name) query.name = { $regex: name };
        if(number) query.number = number;
        if(isAvailable) query.isAvailable = isAvailable;

        const vehicles = await Vehicles.find(query)
            .sort({ [sort]: 1 })
            .skip(offset)
            .limit(limit);

        return res.status(200).json({
            status: true,
            brand, sort, isAvailable, limit, offset,
            data: vehicles
        })

    } catch (error) { errorHandler(error, res); }
}