const express = require('express');
const router = express.Router();
const CartController = require('../controllers/branch/Cart.controller');
const {cartValidator} = require('../src/validators/cart.validator');

/**
 * @swagger
 * components:
 *  schemas:
 *   Orders:
 *    type: object
 *    properties:
 *     orders:
 *      type: array
 *      items:
 *       anyOf:
 *        - $ref: "#/components/schemas/Order1"
 * 
 *   Order1:
 *    type: object
 *    properties:
 *     SLIP_NO:
 *      type: integer
 *      example: 501
 *     TERM_ID:
 *      type: integer
 *      example: 5101
 *     TERM_NAME:
 *      type: string
 *      example: 
 *     ITEMCODE:
 *      type: string
 *      example: V10032900031
 *     ITEM_NAME_TH:
 *      type: string
 *      example: ข้าวมันไก่
 *     PRICEUNIT:
 *      type: integer
 *      example: 60
 *     QUANTITY:
 *      type: integer
 *      example: 1
 *     DELIVERY_NAME:
 *      type: string
 *      example: Line Man
 * 
 *   OrderInfo1:
 *    type: object
 *    properties:
 *     slipNo:
 *      type: integer
 *      example: 15436
 *     termId:
 *      type: integer
 *      example: 517701
 *     userId:
 *      type: integer
 *      example: 5177
 * 
 *   OrderItem1:
 *    type: object
 *    properties:
 *     slipNo:
 *      type: integer
 *      example: 15436
 *     termId:
 *      type: integer
 *      example: 517701
 *  
 *   OrderInfo2:
 *    type: object
 *    properties:
 *     slipNo:
 *      type: integer
 *      example: 15443
 *     termId:
 *      type: integer
 *      example: 517702
 *     userId:
 *      type: integer
 *      example: 5177
 * 
 *   OrderInfo:
 *    type: object
 *    properties:
 *     orders:
 *      type: array
 *      items:
 *       anyOf:
 *        - $ref: "#/components/schemas/OrderInfo1"
 *        - $ref: "#/components/schemas/OrderInfo2"
 * 
 *   OrderItems:
 *    type: object
 *    properties:
 *     orders:
 *      type: array
 *      items:
 *       anyOf:
 *        - $ref: "#/components/schemas/OrderItem1"
 */

/**
 * @swagger
 * /cart/providers/{deliveryType}?branchId={legacyStoreId}:
 *   get:
 *     summary: แสดงราย orders ในตะกร้าแยกตามผู้ให้บริการ
 *     tags:
 *      - Cart
 *     parameters:
 *      - in: path
 *        name: deliveryType
 *        schema:
 *         type: integer
 *        description: Type ผู้ให้บริการ
 *      - in: query
 *        name: branchId
 *        schema:
 *         type: integer
 *        description: legacy store ID (เลข branchId ของ existing)
 *     responses:
 *       200:
 *         description: แสดงข้อมูลรายการ orders ในตะกร้าของผู้ให้บริการที่เลือก
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Orders'
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
router.get('/providers/:deliveryType', cartValidator, CartController.getOrdersByProvider);

/**
 * @swagger
 * /cart?branchId={legacyStoreId}:
 *   post:
 *     summary: บันทึกข้อมูล order
 *     tags:
 *      - Cart
 *     parameters:
 *      - in: query
 *        name: branchId
 *        schema:
 *         type: integer
 *        description: legacy store ID (เลข branchId ของ existing)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInfo'
 *     responses:
 *       201:
 *         description: บันทึกข้อมูล order success
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
router.post('/', cartValidator, CartController.create);

/**
 * @swagger
 * /cart?branchId={legacyStoreId}:
 *   delete:
 *     summary: ยกเลิก order
 *     tags:
 *      - Cart
 *     parameters:
 *      - in: query
 *        name: branchId
 *        schema:
 *         type: integer
 *        description: legacy store ID (เลข branchId ของ existing)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItems'
 *     responses:
 *       201:
 *         description: cancel order success
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
router.delete('/', cartValidator, CartController.cancel);

module.exports = router