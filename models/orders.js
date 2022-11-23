import mongoose from "mongoose";

const schema = mongoose.Schema({
    vehicle: { type: mongoose.SchemaTypes.ObjectId, ref: "vehicles" },
    customer: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    from: Date,
    to: Date,
    requireHelmet: { type: Boolean, default: false },
    pickupAddress: String,
    dropAddress: String
}, { timestamps: true });

const Orders = mongoose.model("orders", schema);

export default Orders;