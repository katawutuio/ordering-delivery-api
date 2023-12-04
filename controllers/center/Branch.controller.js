const {getBranchInfoByOmId} = require('../../models/center/Branch.model');

const getBranchInfo = (req, res) => {
  return res.send('hello');
}

module.exports = {
  getBranchInfo,
}