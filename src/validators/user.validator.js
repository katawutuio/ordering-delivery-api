const {body} = require('express-validator');

const userValidator = [
  body('om_id').not().isEmpty(),
  body('user_info').isObject().not().isEmpty(),
  body('user_info.user_id').not().isEmpty(),
]

const errorMessages = {
    invalidRequest: {
      th: 'ข้อมูลไม่ถูกต้อง',
      en: ''
    },
    invalidBranch: {
      th: 'ไม่พบสาขาหรือไม่สามารถใช้งานสาขาที่ปิดไปแล้ว',
      en: ''
    },
    invalidEOD: {
      th: 'ไม่สามารถใช้งานสาขาที่ปิดการขายแล้ว',
      en: ''
    }
}

module.exports = {
  userValidator,
  errorMessages
}