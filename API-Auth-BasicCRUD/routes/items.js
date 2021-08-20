const express = require('express');
const router = express.Router();

// Import controller
const itemController = require('../controllers/item');

router.route('/')
    .get(itemController.getAllItems)
    .post(itemController.createItem)

router.route('/:_id')
    .put(itemController.editItem)
    .delete(itemController.deleteItem)

router.route('/itemByTitle/:title')
    .get(itemController.getItemByTitle)


module.exports = router;