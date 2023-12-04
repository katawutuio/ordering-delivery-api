const {dbBranchConn} = require('../../src/database/connection');

const getAllConfirmedOrders = async (branch) => {

  const db = dbBranchConn(branch);

  try {
    const query = ``;

    const [results] = await db.query(query)

    return results;
  } catch (err) {
    throw new Error(err);
  }
}

const getAllCanceledOrders = async (branch) => {
  const db = dbBranchConn(branch);

  try {
    const query = ``;

    const [results] = await db.query(query)

    return results;
  } catch (err) {
    throw new Error(err);
  }

}

module.exports = {
  getAllConfirmedOrders,
  getAllCanceledOrders
}