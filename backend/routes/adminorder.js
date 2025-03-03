const express = require('express');
const { handlefetchAllorder } = require('../controller/adminorder');

const adminorderrouter = express.Router();
adminorderrouter.get('/orderstatus', handlefetchAllorder)

module.exports = {adminorderrouter}