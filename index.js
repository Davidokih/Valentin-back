const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./router/userRouter");

const port = 1111;
const app = express();
const webUrl = "mongodb+srv://preshy:preshy@cluster0.e2k2p.mongodb.net/NewDB?retryWrites=true&w=majority";
const localUrl = "mongodb://localhost/loveMe";

mongoose.connect(webUrl).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "This is the server"
    });
});

app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`LIstening to port: ${port}`);
});