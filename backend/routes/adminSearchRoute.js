const express = require('express');
const router =  express.Router()
const {adminSearch} = require('../controllers/adminSearchController');

router.get("/booking/search",adminSearch);