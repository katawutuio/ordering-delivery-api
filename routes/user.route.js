const express = require('express');
const router = express.Router();
const UserController = require('../controllers/branch/User.controller');
const {userValidator} = require('../src/validators/user.validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     OneLoginAuthen:
 *       type: object
 *       properties:
 *        om_id:
 *         description: om_id from login API
 *         type: string
 *        user_info:
 *         type: object
 *         properties:
 *          user_id:
 *            description: employeeNumber from login API
 *            type: string
 *          user_name:
 *            description: displayName from login API
 *            type: string
 *          user_role:
 *            description: groups string from login API
 *            type: string
 *       example:
 *         om_id: "001"
 *         user_info:
 *           user_id: "123"
 *           user_name: "John Doe"
 *           user_role_desc: "User-Role1:User-Role2:User-Role3"
 */

/**
 * @swagger
 * /user/oneLoginAuthen:
 *   post:
 *     summary: บันทึกข้อมูล user ที่ได้จาก Login ลงในระบบ
 *     tags:
 *      - OneLogin
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OneLoginAuthen'
 *     responses:
 *       200:
 *         description: login success
 *         content:
 *           text/plain:
 *             type: string
 *             example: success
 *       422:
 *         description:  Invalid request
 *         content:
 *           application/json:
 *              example:
 *                message: ข้อมูลไม่ถูกต้อง
 *       404:
 *         description:  Some system information not found
 *         content:
 *           application/json:
 *              example:
 *                message: ไม่สามารถใช้งานสาขาที่ปิดไปแล้ว
 *       500:
 *         description: Internal Error
 *         content:
 *           text/plain:
 *              example: Internal Error
 *
 */

router.post('/oneLoginAuthen', userValidator, UserController.oneLoginAuthen);


module.exports = router