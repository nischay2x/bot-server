import express from "express";
import mongoose from "mongoose";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('', (err) => {
    if(err) console.log('DB Error: ', err);
    else {
        app.listen(5000, (err) => {
            if(err) console.log("App Error: ", err);
            else console.log('Listening On Port: 5000');
        })
    }
})