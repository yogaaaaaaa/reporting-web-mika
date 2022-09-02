const express = require("express");
const app = express();
const cors = require("cors")
var corsOptions = {
    origin : "http://localhost:5000"
}

//parse request of content-type - application/json
app.use(cors(corsOptions))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server run on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("helo");
})