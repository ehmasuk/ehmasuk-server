require("dotenv").config();

const express = require("express");

const app = express();

const cors = require("cors");

const cloudinary = require("./cloudinary")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const projectModel = require("./projectModel");

const connnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "portfolio" });
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database");
    }
};

connnectDb();

app.get("/projects", (req, res) => {
    return res.send("All projects");
});

app.post("/projects", async (req, res) => {
    const { title, subTitle, liveLink, image } = req.body;

    if (!title || !subTitle || !liveLink || !image) {
        return res.status(400).send("Please fill all the fields");
    }

    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "portfolio",
        });

        if (!result) {
            return res.status(400).send("Cannot upload image to cloudinary");
        }

        await projectModel.create({ title, subTitle, liveLink, image: result.secure_url });

        return res.send("Project created successfully");
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

app.listen(8080, () => {
    console.log("Server running at http://localhost:8080");
});
