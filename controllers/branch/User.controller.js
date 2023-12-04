const {getBranchInfoByOmId} = require('../../models/center/Branch.model');
const {getEodStatus} = require('../../models/center/EOD.model');
const {getUserById, updateOneLoginUser, createOneLoginUser} = require('../../models/branch/User.model');
const logger = require("../../src/utils/logger");
const {validationResult} = require('express-validator');
const {errorMessages} = require('../../src/validators/user.validator');

const oneLoginAuthen = async (req, res) => {
  try {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      logger.error(err.array());
      return res.status(422).json({message: errorMessages.invalidRequest.th});
    }

    const userId = req.body.user_info.user_id;
    const omId = req.body.om_id;
    
    const branchInfo = await getBranchInfoByOmId(omId);

    if (branchInfo.length < 1) {
      return res.status(404).json({message: errorMessages.invalidBranch.th});
    }

    const branchId = branchInfo[0].LEGACY_STORE;
    const eodStatus = await getEodStatus(branchId);

    if (eodStatus.length > 0) {
      return res.status(404).json({message: errorMessages.invalidEOD.th});
    }

    const userInfo = await getUserById(branchId, userId);

    if (userInfo.length > 0) {
      // TODO update user
      await updateOneLoginUser(branchId, userId);
    } else {
      await createOneLoginUser(branchId, req.body.user_info);
    }

    return res.send('success');
  } catch (error) {
    logger.error(error);
    return res.status(500).send('Internal Error');
  }
}

module.exports = {
  oneLoginAuthen,
}