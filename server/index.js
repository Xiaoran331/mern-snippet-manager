const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

//setup express server

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

app.use(cookieParser());

app.listen(3333, () => console.log("server started on port 3333"));

/*
app.get("/test", (req, res) => {
    res.send("Some more data");
    //console.log("Test");
});
*/

//set up routers
app.use("/snippet", require("./routers/snippetRouter"));
app.use("/auth", require("./routers/userRouter"));

//connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) return console.error(err);
    console.log("Connected to MongoDB");
});

//VT0taEnZG7d4z1sh
// mongodb+srv://devistry:<password>@snippet-manager.l8gkk8q.mongodb.net/?retryWrites=true&w=majority