import jwt from "jsonwebtoken";
import { keys } from "../constant";
import { NoDocError } from "../errors";

import Admins from "../models/admins";

export async function login (req, res) {
    try {
        const { mobile, password } = req.body;

        const admin = await Admins.findById(mobile);
        if(!admin) throw new NoDocError("No Such Admin");

        if(admin.password !== password) return res.status(200).json({
            status: false,
            msg: "Wrong Password"
        })

        const tokenPayload = {
            id: admin._id,
            type: admin.type
        }

        const token = jwt.sign(tokenPayload, keys.ADMIN_TOKEN);

        return res.status(200).json({
            status: true,
            accessToken: token,
            data: {
                name: admin.name,
                email: admin.email,
                contact: admin.contact
            }
        });
    } catch (error) { errorHandler(error, res) }
}

export async function changePassword (req, res) {
    try {
        const { id } = req.user;
        const { oldPassword, newPassword } = req.body;

        const admin = await Admins.findById(id);
        if(admin.password !== oldPassword) return res.status(200).json({
            status: false,
            msg: "Wrong Password"
        })

        await Admins.findByIdAndUpdate(id, {
            $set: {
                password: newPassword
            }
        });

        return res.status(200).json({
            status: true,
            msg: "Password Changed"
        });
    } catch (error) { errorHandler(error, res) }
}

export async function createExecutiveAdmin (req, res) {
    try {
        const { email, mobile, password, name } = req.body;

        await Admins.create({
            _id: mobile,
            contact: `+91${mobile}`,
            name, password, email
        });

        return res.status(200).json({
            status: true,
            msg: "Executive Admin Created"
        })
    } catch (error) { errorHandler(error, res) }
}

export async function deleteAdmin (req, res) {
    try {
        const { id } = req.params;
        await Admins.findByIdAndDelete(id);

        return res.status(200).json({
            status: true,
            msg: "Executive Admin Deleted"
        })
    } catch (error) { errorHandler(error, res) }
}