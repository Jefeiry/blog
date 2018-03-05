const ArticleModel = require('../models/article');
const CategoryModel = require('../models/category');
const UserModel = require('../models/user');
const Article = {
    /**
     * 列表
     */
    index: (req, res, next) => {

        //列表 分页 搜索 排序

        //搜索关键字
        let key = req.query.key;
        let regex = new RegExp(key);

        //分页
        let count = 0;
        let limit = 2;
        let page = req.query.page ? req.query.page : 1;
        let totalPage = 0;
        let where = {};

        if (key) {
            where = {title: {$regex: regex}};
        }
        ArticleModel.find(where).count().then(doc => {
            count = doc;
            totalPage = Math.ceil(count / limit);

            ArticleModel.find(where).skip((page - 1) * limit).limit(limit).sort({create_at: 'desc'}).then(articleList => {
                res.render('index', {
                    list: articleList,
                    count: count,
                    page: page,
                    totalPage: totalPage,
                    key: key
                });
            });
        });
    },


    /**
     * 获取单个文章
     */
    get: (req, res, next) => {
        let id = req.query.id;
        ArticleModel.findOne({_id: id}).then(details => {
            ArticleModel.update({_id: id}, {$inc: {view: 1}}).then(doc => {
                res.render('article', {
                    details: details,
                });
            });
        });
    },

    /**
     * 展示发布文章页面
     */
    add: (req, res, next) => {
        CategoryModel.find({is_sys: 0}).then(doc => {
            res.render('add', {category: doc});
        })
    },

    /**
     * 保存
     */
    save: (req, res, next) => {
        console.log(req.file);
        let articleModel = new ArticleModel({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            is_jing: req.body.is_jing,
            status: req.body.status,
            img: req.file.filename,
            category_id: req.body.category_id,
            user_id: req.body.user_id,
        });
        articleModel.save();
        res.redirect('/');
    },
    /**
     * 更新
     */
    updateView: (req, res, next) => {
        let id = req.query.id;
        UserModel.findOne({}).then(user => {
            ArticleModel.findOne({_id: id}).then(articleEidt => {
                res.render('center', {
                    user: user,
                    articleEidt: articleEidt
                });
            });
        });
    },
    update: (req, res, next) => {
        let id = req.query.id;
        ArticleModel.update({_id: id}, {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            is_jing: req.body.is_jing,
            status: req.body.status,
            img: ''
        }).then(doc => {
            res.json(doc);
        });
    },
    /**
     * 删除
     */
    del: (req, res, next) => {
        let id = req.query.id;
        ArticleModel.remove({_id: id}).then(doc => {
            res.json({msg: "删除成功"});
        })
    }
}
module.exports = Article;