const express = require('express');
const {version, updateDate} = require('./package.json');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOption = require('./src/docs/swagger');
const morganMiddleware = require("./src/middlewares/morgan.middleware");
const logger = require("./src/utils/logger");
const cors = require('cors');

require('dotenv').config();

// App routes
const userRoutes = require('./routes/user.route');
const mainRoutes = require('./routes/main.route');
const cartRoutes = require('./routes/cart.route');
const historyRoutes = require('./routes/history.route');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: '*'
  }));
}

// handle post json data
app.use(express.json()); 

// logging client request 
app.use(morganMiddleware);

const serverInfo = `(${process.env.NODE_ENV}) API Ordering Delivery -- App version ${version}, update date: ${updateDate}, Listen on port ${process.env.PORT}`;

app.get(`${process.env.APPPATH}/version`, async (req, res) => {
  res.send(serverInfo);
});

// API Docs with swagger
const specs = swaggerJsdoc(swaggerOption);

if (process.env.NODE_ENV === 'development') {
  app.use(
    `${process.env.APPPATH}/docs`,  
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
}

// API path
app.use(`${process.env.APPPATH}/user/`, userRoutes);
app.use(`${process.env.APPPATH}/main/`, mainRoutes);
app.use(`${process.env.APPPATH}/cart/`, cartRoutes);
app.use(`${process.env.APPPATH}/history/`, historyRoutes);

app.listen(process.env.PORT, () => {
  logger.info(serverInfo);
});
