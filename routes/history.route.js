const express = require('express');
const { historyValidator } = require('../src/validators/history.validator');
const router = express.Router();

const historyController = require('../controllers/branch/History.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *   OrdersHistory:
 *    type: object
 *    properties:
 *     orders:
 *      type: array
 *      items:
 *       anyOf:
 *        - $ref: "#/components/schemas/OrderHistory1"
 *        - $ref: "#/components/schemas/OrderHistory2"
 * 
 *   OrderHistory1:
 *    type: object
 *    properties:
 *     DELIVERY_NAME:
 *      type: string
 *      example: 'Robinhood'
 *     TERM_NAME:
 *      type: string
 *      example: ''
 *     SLIP_NO:
 *      type: integer
 *      example: 3123
 *     ITEM_NAME:
 *      type: string
 *      example: 'ข้าวผัด'
 *     QUANTITY:
 *      type: integer
 *      example: 1.00
 *     TOTAL:
 *      type: integer
 *      example: 25.00
 * 
 *   OrderHistory2:
 *    type: object
 *    properties:
 *     DELIVERY_NAME:
 *      type: string
 *      example: 'Robinhood'
 *     TERM_NAME:
 *      type: string
 *      example: ''
 *     SLIP_NO:
 *      type: integer
 *      example: 1533
 *     ITEM_NAME:
 *      type: string
 *      example: 'บะหมี่'
 *     QUANTITY:
 *      type: integer
 *      example: 2.00
 *     TOTAL:
 *      type: integer
 *      example: 23.00
 */

/**
 * @swagger
 * /history/orders/all/{status}?branchId={legacyStoreId}:
 *   get:
 *     summary: ดึงข้อมูล orders history
 *     tags:
 *      - History
 *     parameters:
 *      - in: path
 *        name: status
 *        schema:
 *         type: string
 *        description: status ที่ต้องการดู history (confirmed, canceled)
 *      - in: query
 *        name: branchId
 *        schema:
 *         type: integer
 *        description: legacy store ID (เลข branchId ของ existing)
 *     responses:
 *       200:
 *         description: แสดงรายการประวัติ orders ทั้งหมดแยกตาม status ที่เลือก
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/OrdersHistory'
 *       422:
 *         description:  Invalid request
 *         content:
 *           application/json:
 *              example:
 *                message: ข้อมูลไม่ถูกต้อง
 *       404:
 *         description:  Data not found
 *         content:
 *           application/json:
 *              example:
 *                message: ไม่พบข้อมูล
 *       500:
 *         description: Internal Error
 *         content:
 *           text/plain:
 *              example: Internal Error
 *
 */
router.get('/orders/all/:status', historyValidator, historyController.getAll);

module.exports = router