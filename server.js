const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:5000",
};
const db = require("./models");
const { sequelize } = require("./models");
const Role = db.role;

// db.sequelize.authenticate().then(()=>{
//   console.log('connection has been estabilished successfully');
// }).catch(err =>{
//   console.log('unabel to connect db', err)
// });

//resync database
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial();
// });

// // 
db.sequelize.sync();

// db.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

//parse request of content-type - application/json
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded

// app.use(function(req, res, next) {
//   res.setHeader("Content-Type", "application/json");
//   next();
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server run on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("helo");
});
