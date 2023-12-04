const {dbCenterConn} = require('../../src/database/connection')

const getEodStatus = async (branchId) => { 

  try {
    const query = `
      SELECT BRANCH_ID, EOD_DATE, EOD_STATUS
        FROM XXX 
        WHERE BRANCH_ID='${branchId}'
        AND EOD_DATE = CURDATE()
        AND (EOD_STATUS='inprogress' OR EOD_STATUS='success');
    `;

    const [results] = await dbCenterConn.query(query)

    return results;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getEodStatus,
}