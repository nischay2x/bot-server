import mongoose from "mongoose";

const schema = mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    name: String,
    email: String,
    contact: String,
    password: String,
    type: { type: String, default: "EXECUTIVE" } // "SUPER-ADMIN"
}, { timestamps: true, _id: false });

const Admins = mongoose.model("admins", schema);

export default Admins;