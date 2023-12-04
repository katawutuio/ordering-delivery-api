const {version, updateDate, name, description} = require('../../package.json');
require('dotenv').config();

module.exports = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: `${description}`,
      version: `${version}`,
      description:
        `${description}`,
      contact: {
        name: "",
        url: "",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: `${process.env.API_ENDPOINT}${process.env.APPPATH}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};