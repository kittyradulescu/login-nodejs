require("dotenv").config();
const express = require("express");
const userModel = require("./models/user");

const app = express();
app.use(express.json());

app.get("/user", async (req, res) => {
    try {
        const users = await userModel.findAll();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.post("/user", async (req, res) => {
    try {
        const {username, password} = req.body;
        await userModel.create(username, password);
        res.status(200).json({message: "user created"});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.listen(process.env.NODE_DOCKER_PORT, () => {
    console.log(`application running on port ${process.env.NODE_DOCKER_PORT}`)
});