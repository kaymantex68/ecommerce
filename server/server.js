const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const {readdirSync} = require("fs");
require("dotenv").config();
// app
const app = express();
// mongoose
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected OK"))
  .catch((error) => console.log(`DB error connect ${error}`));
// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
// route
// read and add all files from routes directory in app.use (method fs.readdirSync)
readdirSync('./routes').map((r) => app.use("/api", require("./routes/" + r)));
//port
const port = process.env.PORT || 8000;
// start listen port 
app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
