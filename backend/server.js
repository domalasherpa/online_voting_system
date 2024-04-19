const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const path = require("path");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

//calling Database function
require("./config/database").connect();

//route importing and mounting
const user = require("./routes/user");

app.use("/api/v1", user);

const userModel = require("./models/user");

app.get("/getUser/:id", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: new ObjectId(req.params.id) });
    res.render("index", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
