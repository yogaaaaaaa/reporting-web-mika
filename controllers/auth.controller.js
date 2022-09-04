const db = require("./models");
const config = require("../app/config/auth.config");
const User = db.User;
const Role = db.Role;
const Op = db.Sequelize.Op;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  //save to db
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          name: {
            [Op.or]: req.body.roles,
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User is successfully registered!" });
          });
        });
      } else {
        //user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User is successfully registered" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "user npt found" });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "invalid password!",
        });
      }
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 864000,
      });
      let authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.topUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
