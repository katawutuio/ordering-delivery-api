const {param, query} = require('express-validator');

const cartValidator = [
  param('deliveryType').not().isEmpty().isNumeric(),
  query('branchId').not().isEmpty().isNumeric()
]

const errorMessages = {
    invalidRequest: {
      th: 'ข้อมูลไม่ถูกต้อง',
      en: ''
    },
    notFound: {
      th: 'ไม่พบข้อมูล',
      en: ''
    },
    invalidEOD: {
      th: 'ไม่สามารถใช้งานสาขาที่ปิดการขายแล้ว',
      en: ''
    }
}

module.exports = {
  cartValidator,
  errorMessages
}