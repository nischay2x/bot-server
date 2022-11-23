import jwt from "jsonwebtoken";

import Users from "../models/users";

import { errorHandler, NoDocError, ValidationError } from "../errors";
import { keys } from "../constant";

export async function sendOtp (req, res) {
    try {
        const { mobile } = req.body;
        const otp = generateOtp().toString();

        await Users.findByIdAndUpdate(mobile, {
            "otp": otp
        }, { upsert: true });

        return res.status(200).json({
            status: true,
            msg: `OTP sent to +91${mobile}`,
            dev: { otp }
        });
    } catch (error) { errorHandler(error, res) }
}

export async function verifyOtp (req, res) {
    try {
        const { mobile, otp } = req.body;

        const user = await Users.findById(mobile);
        if(!user) throw new NoDocError("No Such User");

        if(otp !== user.otp) return res.status(200).json({
            status: false,
            msg: "Wrong OTP"
        });

        if(user.name) {
            const tokenPayload = {
                id: user._id,
                email: user.email,
                contact: user.contact
            };

            const accessToken = jwt.sign(tokenPayload, keys.ACCESS_SECRET);
            const refreshToken = jwt.sign(tokenPayload, keys.REFRESH_SECRET, { expiresIn: "3d" });

            return res.status(200).json({
                status: true,
                newAccount: false,
                accessToken, refreshToken,
                data: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                    dob: user.dob,
                    image: user.image
                }
            });
        }

        return res.status(200).json({
            status: true,
            newAccount: true,
            creationToken: jwt.sign({ id: mobile }, keys.CREATION_TOKEN),
            data: {
                contact: `+91${mobile}`
            }
        });
    
    } catch (error) { errorHandler(error, res); }
}

export async function refreshAccessToken (req, res) {
    try {
        const refreshToken = req.headers['x-refresh-token'];

        jwt.verify(refreshToken, keys.REFRESH_SECRET, async (err, payload) => {
            if(err) throw new ValidationError(err.message);

            const newAccessToken = jwt.sign(payload, keys.ACCESS_SECRET);
            const newRefreshToken = jwt.sign(payload, keys.REFRESH_SECRET, { expiresIn: "3d" });

            const user = await Users.findById(payload.id);
            return res.status(200).json({
                status: true,
                newAccessToken, newRefreshToken,
                data: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                    dob: user.dob,
                    image: user.image
                }
            });
        })
    } catch (error) { errorHandler(error, res); }
}

// utility
function generateOtp(){
    return Math.floor(Math.random() * 900000) + 100000;
}