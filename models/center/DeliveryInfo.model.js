const {dbCenterConn} = require('../../src/database/connection')

const getAll = async () => { 

  try {
    const query = `
      SELECT DELIVERY_TYPE,DELIVERY_NAME,DELIVERY_IMAGE,DELIVERY_SHOWIMG 
      FROM XXX.DELIVERY_INFO
      WHERE ACT_FLAG='Y'
    `;

    const [results] = await dbCenterConn.query(query)

    return results;
  } catch (err) {
    throw new Error(err);
  }
}

const getDeliveryNotificationTime = async () => { 

  try {
    const query = `
      SELECT TIMEALERT 
      FROM XXX.DELI_ALERT
    `;

    const [results] = await dbCenterConn.query(query)

    return results;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getAll,
  getDeliveryNotificationTime
}