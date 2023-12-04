const moment = require('moment');
const {dbBranchConn} = require('../../src/database/connection');
const EjDeliPrintSlipModel = require('./EJDeliPrintSlip.model');
const {lpad} = require('../../src/utils/format');

const createOrder = async (branch, orderInfo) => {
  
  const {slipNo, termId, userId} = orderInfo;
  
  const db = dbBranchConn(branch);
  const t = await db.transaction();

  try {

    const query1 = `
      SELECT T1.SLIPNO ,T2.TERM_ID,T1.GTERM_ID 
      FROM XXX T1 
      JOIN XXX T2 ON T1.GTERM_ID=T2.GTERM_ID
      WHERE T2.TERM_ID='${termId}';
    `;
    const [results] = await db.query(query1, {transaction: t})

    // Running slip NO
    const gTermSlipNo = results[0].SLIPNO;
    const gTermId = results[0].GTERM_ID;

    const nextGTermSlipNo = gTermSlipNo + 1;

    const query2 = `
      UPDATE XXX
      SET SLIPNO='${nextGTermSlipNo}' 
      WHERE GTERM_ID='${gTermId}';
    `;
    await db.query(query2, {transaction: t});

    let updateResult, metadata;

    // Update XXX data
    const query3 = `
      UPDATE XXX t1 
      JOIN XXX t2 ON 1=1 
      SET CF='1', 
        GSLIP_NO='${gTermSlipNo}',
        USER_ID='${userId}',
        SYS_BATCH=t2.BATCH,
        SYS_BATCHDATE=t2.BATCHDATE 
      WHERE TERM_ID='${termId}' 
        AND SLIP_NO='${slipNo}';
    `;
    [updateResult, metadata] = await db.query(query3, {transaction: t});
    
    if (updateResult.affectedRows < 1) {
      throw new Error('No order to update or duplicate order')
    }

    const query3_1 = `
    UPDATE XXX T1 
    JOIN XXX T2 ON 1=1  
    SET SYS_BATCH=T2.BATCH,
      SYS_BATCHDATE=T2.BATCHDATE 
    WHERE TERM_ID='${termId}' 
      AND SLIP_NO='${slipNo}';
    `;
    await db.query(query3_1, {transaction: t});

    // Create order transaction in XXX
    const query4 = `
      INSERT INTO XXX 
        SELECT * FROM XXX 
        WHERE SLIP_NO='${slipNo}'
          AND TERM_ID='${termId}';
    `;
    await db.query(query4, {transaction: t});

    // Create order transaction in sale_payment_item_daily
    const query5 = `
      INSERT INTO XXX 
        SELECT * FROM XXX 
        WHERE SLIP_NO='${slipNo}'
          AND TERM_ID='${termId}';
    `;
    await db.query(query5, {transaction: t});

    // Backup XXX and XXX data
    const query6 = `
    UPDATE XXX 
    SET CF='1' 
    WHERE SLIP_NO='${slipNo}'
      AND TERM_ID='${termId}';
    `
    await db.query(query6, {transaction: t});

    const query6_1 = `
      INSERT INTO XXX 
        SELECT * FROM XXX 
        WHERE SLIP_NO='${slipNo}'
          AND TERM_ID='${termId}';
    `;
    await db.query(query6_1, {transaction: t});

    const query6_2 = `
      INSERT INTO XXX 
        SELECT * FROM XXX 
        WHERE SLIP_NO='${slipNo}'
          AND TERM_ID='${termId}';
    `;
    await db.query(query6_2, {transaction: t});

    // Remove transaction from XXX and XXX
    const query6_3 = `
      DELETE FROM XXX 
      WHERE SLIP_NO='${slipNo}'
        AND TERM_ID='${termId}';
    `;
    await db.query(query6_3, {transaction: t});

    const query6_4 = `
      DELETE FROM XXX 
      WHERE SLIP_NO='${slipNo}'
        AND TERM_ID='${termId}';
    `;
    await db.query(query6_4, {transaction: t});

    // Create temporary slip
    const slipInfo = {
      printType: 'delivery',
      termid: termId, 
      slip_no: slipNo 
    }
    
    // Generate slip text
    const textSlip = await EjDeliPrintSlipModel.generatePrintSlip(branch, slipInfo, db, t);
    const tSLipNo = lpad(slipNo.toString(), '0', 6);

    const query7 = `
      UPDATE XXX 
      SET GSLIP_NO='${gTermSlipNo}', TEXT_SLIP='${textSlip}'
      WHERE TERM_ID='${termId}' 
        AND TSLIP_NO='${tSLipNo}';
    `;
    [updateResult, metadata] = await db.query(query7, {transaction: t});
    if (updateResult.affectedRows < 1) {
      throw new Error(`Can't update EJ_DELI_SLIP`)
    }

    // Create slip in ej_slip
    const query8 = `
      INSERT INTO XXX 
        SELECT * FROM XXX 
        WHERE TERM_ID='${termId}'
          AND TSLIP_NO='${tSLipNo}';
    `;
    await db.query(query8, {transaction: t});

    // Delete temporary slip
    const query9 = `
      DELETE FROM XXX 
      WHERE GSLIP_NO='${gTermSlipNo}'
        AND TERM_ID='${termId}'
        AND TSLIP_NO='${tSLipNo}';
    `;
    await db.query(query9, {transaction: t});

    await t.commit();
    return;

  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
}

const cancelOrder = async (branch, orders) => {
  const {slipNo, termId} = orders;

  const db = dbBranchConn(branch);
  const t = await db.transaction();

  try {

    const query1 = `
      UPDATE XXX
      SET VOID_FLAG='1'
      WHERE TERM_ID='${termId}'
        AND SLIP_NO='${slipNo}';
    `;
    await db.query(query1, {transaction: t});

    const query2 = `
      UPDATE XXX
      SET VOID_FLAG='1'
      WHERE TERM_ID='${termId}'
        AND SLIP_NO='${slipNo}';
    `;
    await db.query(query2, {transaction: t});      

    const query3 = `
      INSERT INTO XXX 
        SELECT * FROM XXX 
        WHERE SLIP_NO='${slipNo}'
          AND TERM_ID='${termId}';
    `;
    await db.query(query3, {transaction: t});

    const query4 = `
      INSERT INTO XXX 
        SELECT * FROM XXX 
        WHERE SLIP_NO='${slipNo}'
          AND TERM_ID='${termId}';
    `;
    await db.query(query4, {transaction: t});

    const deleteSaleDeliDailyQuery = `
      DELETE FROM XXX 
      WHERE TERM_ID='${termId}'
        AND SLIP_NO='${slipNo}';
    `;
    await db.query(deleteSaleDeliDailyQuery, {transaction: t});

    const deleteSaleDeliItemDailyQuery = `
      DELETE FROM XXX 
      WHERE TERM_ID='${termId}'
        AND SLIP_NO='${slipNo}';
    `;
    await db.query(deleteSaleDeliItemDailyQuery, {transaction: t});

    const tSLipNo = lpad(slipNo.toString(), '0', 6);

    const query5 = `
      DELETE FROM XXX 
      WHERE TERM_ID='${termId}'
        AND TSLIP_NO='${tSLipNo}';
    `;
    await db.query(query5, {transaction: t});

    await t.commit();
    return;
  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }

}

module.exports = {
  createOrder,
  cancelOrder
}