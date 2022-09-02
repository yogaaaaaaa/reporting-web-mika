module.exports = {
  HOST: process.env.HOST_DB,
  USER: process.env.USER_DB,
  PASSWORD: process.env.PASSWORD_DB,
  DB: process.env.DB,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 300000,
    idle: 10000,
  },
};
