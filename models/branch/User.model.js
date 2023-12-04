const moment = require('moment');
const {dbBranchConn} = require('../../src/database/connection');

const getUserById = async (branch, userId) => { 

  try {
    const query = `
      SELECT USER_ID
        FROM USER_INFO 
        WHERE USER_ID = '${userId}';
    `;

    const [results] = await dbBranchConn(branch).query(query)

    return results;
  } catch (err) {
    throw new Error(err);
  }
}

const updateOneLoginUser = async (branch, userId) => {
  const db = dbBranchConn(branch);
  const t = await db.transaction()

  try {
    const query = `
      UPDATE USER_INFO
        SET USER_LSTDATE='${moment().format('YYYY-MM-DD')}'
        WHERE USER_ID='${userId}';
    `;
    await db.query(query, {transaction: t});
    await t.commit();
    return;

  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
  
}

const createOneLoginUser = async (branch, userData) => {
  const db = dbBranchConn(branch);
  const t = await db.transaction()

  try {
    const userFPermiss = '1111';
    const userBPermiss = '0000000000';
    const userFlag = 1;
    const userReq = 1;
    const currentDate = moment().format('YYYY-MM-DD');

    const query = `
      INSERT INTO USER_INFO (
        USER_ID, USER_NAME, USER_ROLE_DESC,
        USER_FPERMISS, USER_BPERMISS, USER_FLAG, USER_REQ, USER_LSTDATE
      ) VALUES (
        '${userData.user_id}', '${userData.user_name}', '${userData.user_role_desc}',
        '${userFPermiss}', '${userBPermiss}', ${userFlag}, ${userReq}, '${currentDate}'
      );
    `;
    await db.query(query, {transaction: t});
    await t.commit();
    return;

  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
  
}

module.exports = {
  getUserById,
  updateOneLoginUser,
  createOneLoginUser
}