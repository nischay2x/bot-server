import mongoose from "mongoose";

const schema = mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    name: String,
    image: String,
    email: String,
    contact: String,
    dob: Date,
    otp: String,
    orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: "orders" }]
}, { timestamps: true, _id: false });

const Users = mongoose.model("users", schema);

export default Users;