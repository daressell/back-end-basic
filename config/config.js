require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
