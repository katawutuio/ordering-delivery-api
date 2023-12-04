const logger = require("../../src/utils/logger");
const {validationResult} = require('express-validator');
const {errorMessages} = require('../../src/validators/history.validator');

const {getAllConfirmedOrders, getAllCanceledOrders} = require('../../models/branch/History.model')

const getAll = async (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    logger.error(err.array());
    return res.status(422).json({message: errorMessages.invalidRequest.th});
  }

  const status = req.params.status;
  const branchId = req.query.branchId;

  try {
    const responseData = {
      orders: []
    }

    if (status === 'confirmed') {
      const orders = await getAllConfirmedOrders(branchId);
      if (orders.length > 0) {
        responseData.orders = orders;
      }
    } else if (status === 'canceled') {
      const orders = await getAllCanceledOrders(branchId);
      if (orders.length > 0) {
        responseData.orders = orders;
      }
    } else {
      return res.status(422).json({message: errorMessages.invalidRequest.th});
    }

    return res.json(responseData);
    
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Error');
  }

}

module.exports = {
  getAll
}