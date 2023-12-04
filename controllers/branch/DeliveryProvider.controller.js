const logger = require("../../src/utils/logger");
const {validationResult} = require('express-validator');
const {errorMessages} = require('../../src/validators/deliveryProvider.validator');

const {getAll, getDeliveryNotificationTime} = require('../../models/center/DeliveryInfo.model');
const {getOrdersAmount} = require('../../models/branch/SaleDeliItemDaily.model');

const getAllProviders = async (req, res) => {

  const err = validationResult(req);

  if (!err.isEmpty()) {
    logger.error(err.array());
    return res.status(422).json({message: errorMessages.invalidRequest.th});
  }

  const branchId = req.params.branchId;

  try {

    const responseData = {
      providers: [],
      notificationTimes: 60
    }

    const providers = await getAll();
    const notiTimes = await getDeliveryNotficationTime();
    const ordersAmount = await getOrdersAmount(branchId);

    if (providers.length > 0) {
      providers.map(deliverer => {
        deliverer.ORDERS = 0
        const orderAmount = ordersAmount.filter((order) => order.DELIVERYTYPE === deliverer.DELIVERY_TYPE);

        if (orderAmount.length > 0) {
          deliverer.ORDERS = orderAmount[0].Qty;
        }
      });

      responseData.providers = providers;

    }

    if (notiTimes.length > 0) {
      responseData.notificationTimes = notiTimes[0].TIMEALERT;
    }

    return res.json(responseData);

    
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Error');
  }
}

const getDeliveryNotficationTime = async () => {
  try {
    const notiTimes = await getDeliveryNotificationTime();

    return notiTimes;
  } catch (error) {
    logger.error(error);
    throw new (error);
  }

}

module.exports = {
  getAllProviders
}