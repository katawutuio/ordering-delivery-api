const logger = require("../../src/utils/logger");
const {validationResult} = require('express-validator');
const {errorMessages} = require('../../src/validators/cart.validator');

const {getOrdersByDeliveryType} = require('../../models/branch/SaleDeliItemDaily.model');
const {createOrder, cancelOrder} = require('../../models/branch/Cart.model');
const {getEodStatus} = require('../../models/center/EOD.model');

const getOrdersByProvider = async (req, res) => {

  const err = validationResult(req);

  if (!err.isEmpty()) {
    logger.error(err.array());
    return res.status(422).json({message: errorMessages.invalidRequest.th});
  }

  const deliveryType = req.params.deliveryType;
  const branchId = req.query.branchId;

  try {

    const responseData = {
      orders: [],
    }

    const ordersData = await getOrdersByDeliveryType(branchId, deliveryType);

    if (ordersData.length < 1) {
      return res.status(404).json({message: errorMessages.notFound.th});
    }

    responseData.orders = ordersData;

    return res.json(responseData);
   
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Error');
  }
}

const create = async (req, res) => {

  const branchId = req.query.branchId
  const ordersData = req.body.orders;

  try {
    // Check EOD
    const eodStatus = await getEodStatus(branchId);
    if (eodStatus.length > 0) {
      return res.status(404).json({message: errorMessages.invalidEOD.th});
    }
    
    // Create order transaction
    for (order in ordersData) {
      await createOrder(branchId, ordersData[order]);
    }
    
    return res.status(201).send('success');
    
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Error');
  }
}

const cancel = async (req, res) => {

  const branchId = req.query.branchId
  const ordersData = req.body.orders;

  // Check EOD
  const eodStatus = await getEodStatus(branchId);
  if (eodStatus.length > 0) {
    return res.status(404).json({message: errorMessages.invalidEOD.th});
  }
  
  // Create order transaction
  for (order in ordersData) {
    await cancelOrder(branchId, ordersData[order]);
  }

  return res.status(201).send('success');
}

module.exports = {
  getOrdersByProvider, 
  create,
  cancel
}