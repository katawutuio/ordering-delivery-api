const express = require('express');
const router = express.Router();
const DeliveryProviderController = require('../controllers/branch/DeliveryProvider.controller');
const {deliveryProviderValidator} = require('../src/validators/deliveryProvider.validator');

/**
 * @swagger
 * components:
 *  schemas:
 *   GetProviders:
 *    type: object
 *    properties:
 *     providers:
 *      type: array
 *      items:
 *       anyOf:
 *        - $ref: "#/components/schemas/Delivery1"
 *        - $ref: "#/components/schemas/Delivery2"
 *     notificationTimes: 
 *      type: integer
 *      example: 60
 * 
 *   Delivery1:
 *    type: object
 *    properties:
 *     DELIVERY_TYPE:
 *      type: integer
 *      example: 1
 *     DELIVERY_NAME:
 *      type: string
 *      example: Robinhood
 *     DELIVERY_IMAGE:
 *      type: string
 *      example: robinhood.png
 *     DELIVERY_SHOWIMG:
 *      type: boolean
 *      example: 'Y'
 *     ORDERS:
 *      type: integer
 *      example: 12
 * 
 *   Delivery2:
 *    type: object
 *    properties:
 *     DELIVERY_TYPE:
 *      type: integer
 *      example: 5
 *     DELIVERY_NAME:
 *      type: string
 *      example: Line Man
 *     DELIVERY_IMAGE:
 *      type: string
 *      example: lineman.png
 *     DELIVERY_SHOWIMG:
 *      type: boolean
 *      example: 'Y'
 *     ORDERS:
 *      type: integer
 *      example: 8
 */

/**
 * @swagger
 * /main/providers/{legacyStoreId}:
 *   get:
 *     summary: ดึงข้อมูลผู้ให้บริการทั้งหมด
 *     tags:
 *      - Main
 *     parameters:
 *      - in: path
 *        name: legacyStoreId
 *        schema:
 *         type: integer
 *        description: legacy store ID (เลข branchId ของ existing)
 *     responses:
 *       200:
 *         description: แสดงข้อมูลผู้ให้บริการ, เวลาที่ตั้งไว้ในระบบสำหรับแจ้งเตือน order
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/GetProviders'
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

router.get('/providers/:branchId', deliveryProviderValidator, DeliveryProviderController.getAllProviders);

module.exports = router