import Orders from "../models/orders";

import { errorHandler, NoDocError } from "../errors";
import Users from "../models/users";
import Vehicles from "../models/vehicles";

export async function createOrder (req, res) {
    try {
        const { id } = req.user;
        const { vehicleId, helmet, from, to, pickup, drop } = req.body;

        const vehicle = await Vehicles.findById(vehicleId);
        if(!vehicle.isAvailable) return res.status(200).json({
            status: false,
            msg: `Crap! someone just booked this vehicle. 
            It'll be availble by ${new Date(vehicle.bookedTill).toISOString()}`
        })

        const newOrder = await Orders.create({
            customer: id,
            vehicle: vehicleId,
            from, to,
            requireHelmet: helmet,
            pickupAddress: pickup,
            dropAddress: drop
        });

        await Users.findByIdAndUpdate(id, {
            $push: {
                orders: newOrder._id
            }
        });

        return res.status(200).json({
            status: true,
            msg: "Order Sent! We'll contact you soon."
        });
    } catch (error) { errorHandler(error, res); }
}

export async function confirmOrder (req, res) {
    try {
        const { id } = req.params;

        const order = Orders.findById(id);
        if(!order) throw new NoDocError("No Such Order");

        await Vehicles.findByIdAndUpdate(order.vehicle, {
            $set: { 
                isAvailable: false,
                bookedTill: order.to 
            }
        });

        return res.status(200).json({
            status: true,
            msg: "Order Confirmed"
        });
    } catch (error) { errorHandler(error, res); }
}

export async function getOrders (req, res) {
    try {
        const { 
            vehicleId, customerId, orderedOn, bookedTill  
        } = req.query;

        let query = {};
        if(vehicleId) query.vehicle = vehicleId;
        if(customerId) query.customer = customerId;
        if(orderedOn) query.createdAt = orderedOn;
        if(bookedTill) query.to = bookedTill;

        const orders = await Orders.find(query).populate('vehicle').sort({ "createdAt": 1 });

        return res.status(200).json({
            status: true,
            vehicleId, customerId, orderedOn, bookedTill,
            data: orders
        })
    } catch (error) { errorHandler(error, res); }
}

export async function getOrderById (req, res) {
    try {
        const { id } = req.params;

        const order = await Orders.findById(id).populate('vehicle').populate('customer');

        return res.status(200).json({
            status: true,
            data: order
        })
    } catch (error) { errorHandler(error, res); }
}

export async function cancelOrder (req, res) {
    try {
        const { id } = req.params;

        const order = await Orders.findById(id);
        if(!order) throw new NoDocError("No Such Order");
        
        await Vehicles.findByIdAndUpdate(order.vehicle, {
            $set: {
                isAvailable: true
            }
        });

        return res.status(200).json({
            status: true,
            msg: "Order Cancelled"
        });
    } catch (error) { errorHandler(error, res); }
}