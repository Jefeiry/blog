const express = require('express');
const router = express.Router();
const article = require("../controllers/article");
const upload = require("../library/upload");
const auth = require("../middleware/auth");


//获取文章
router.get('/list', article.index);

//获取单个文章详情
router.get('/details', article.get);

//添加文章页面
router.get('/add',article.add);

//添加文章
router.post('/add', upload.single('img'), article.save);

//更新文章
router.get('/update', article.updateView);
router.post('/update', article.update);

//删除文章
router.get('/delete', article.del);

//文章内容上传图片
router.post('/upload', upload.single('img'), (req, res, next)=>{
    res.json({
        errno:0,
        data:[
            '/uploads/'+req.file.filename
        ]
    });
});

module.exports = router;

module.exports = router;
