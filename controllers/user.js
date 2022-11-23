import jwt from "jsonwebtoken";

import Users from "../models/users";

import { errorHandler } from "../errors";
import { keys } from "../constant";

export async function createUser (req, res) {
    try {
        const { email, name, dob } = req.body;
        const { id } = req.create;

        await Users.findByIdAndUpdate(id, {
            name, email, dob,
            contact: `+91${id}`
        });

        const tokenPayload = {
            id: id,
            email: email,
            contact: `+91${id}`
        };

        const accessToken = jwt.sign(tokenPayload, keys.ACCESS_SECRET);
        const refreshToken = jwt.sign(tokenPayload, keys.REFRESH_SECRET);

        return res.status(200).json({
            status: true,
            newAccount: false,
            accessToken, refreshToken,
            data: {
                name: name,
                email: email,
                contact: `+91${id}`,
                dob: dob,
                image: ""
            }
        })
        
    } catch (error) { errorHandler(error, res); }
}
