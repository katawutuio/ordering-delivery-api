const {query, param} = require('express-validator');

const historyValidator = [
  query('branchId').not().isEmpty().isNumeric(),
  param('status').custom(value => {
    let validValue = false;
    switch (value) {
      case 'confirmed':
        validValue = true;
        break;
      case 'canceled':
        validValue = true;
        break;
      default:
        return false;
    }
    
    return validValue;
  })
]

const errorMessages = {
    invalidRequest: {
      th: 'ข้อมูลไม่ถูกต้อง',
      en: ''
    },
    notFound: {
      th: 'ไม่พบข้อมูล',
      en: ''
    }
}

module.exports = {
  historyValidator,
  errorMessages
}