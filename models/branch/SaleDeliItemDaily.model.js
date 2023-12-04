const {dbBranchConn} = require('../../src/database/connection');

const getOrdersAmount = async (branch) => { 

  try {
    const query = `
      SELECT COUNT(*) as Qty, DELIVERYTYPE 
      FROM XXX t1 
        JOIN XXX t2 ON t1.SLIP_NO=t2.SLIP_NO AND 
        t1.TERM_ID=t2.TERM_ID
      WHERE t2.CF='0' 
        AND t2.VOID_FLAG='0'
      GROUP BY DELIVERYTYPE
    `;

    const [results] = await dbBranchConn(branch).query(query)

    return results;
  } catch (err) {
    throw new Error(err);
  }
}

const getOrdersByDeliveryType = async (branch, deliveryType) => {
  try {
    const query = `
      SELECT t1.SLIP_NO,t1.TERM_ID,t1.TERM_NAME,t3.ITEMCODE, t3.ITEM_NAME_TH,t2.PRICEUNIT,t2.QUANTITY,t4.DELIVERY_NAME
      FROM XXX t1 
      JOIN XXX t2 
        ON t1.TERM_ID=t2.TERM_ID AND t1.SLIP_NO=t2.SLIP_NO
      JOIN XXX t3 
        ON t2.itemcode=t3.ITEMCODE 
      JOIN XXX.XXX t4 ON t1.XXX=t4.XXX
      WHERE t4.DELIVERY_TYPE=${deliveryType}
        AND t1.CF='0' AND t1.void_flag='0'
      ORDER BY t1.TERM_ID, t1.SLIP_NO;
    `;

    const [results] = await dbBranchConn(branch).query(query)

    return results;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getOrdersAmount,
  getOrdersByDeliveryType
}