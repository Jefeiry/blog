const express = require('express');
const router = express.Router();
const user = require("../controllers/user")

//登录页
router.get('/login', user.login);

router.post('/update', user.update);

router.post('/updatePassword', user.updatePassword);

module.exports = router;
