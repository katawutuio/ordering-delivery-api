const {param} = require('express-validator');

const deliveryProviderValidator = [
  param('branchId').not().isEmpty().isNumeric(),
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
  deliveryProviderValidator,
  errorMessages
}