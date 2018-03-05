const express = require('express');
const router = express.Router();
const home = require('../controllers/home');

//首页
router.get('/', home.index);

//个人中心页面
router.get('/personalCenter', home.personalCenter);

//分类页
router.get('/:category', home.category);

module.exports = router;
