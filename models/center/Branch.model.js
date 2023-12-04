const {dbCenterConn} = require('../../src/database/connection')

const getBranchInfoByOmId = async (omId) => { 

  try {
    const query = `
      SELECT BRANCH_ID AS LEGACY_STORE, OM_ID, BRANCH_NAME
        FROM BRANCH_INFO 
        WHERE OM_ID='${omId}'
        AND ACTIVE_STATUS='1';
    `;

    const [results] = await dbCenterConn.query(query)

    return results;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getBranchInfoByOmId,
}