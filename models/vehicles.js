import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    image: String,
    number: String,
    hourPrice: Number,
    dayPrice: Number,
    isAvailable: { type: Boolean, default: true },
    bookedTill: Date
}, { timestamps: true });

const Vehicles = mongoose.model("vehicles", schema);

export default Vehicles;