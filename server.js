
const express = require("express");
const app = express();
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
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

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

//parse request of content-type - application/json
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server run on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("helo");
});
