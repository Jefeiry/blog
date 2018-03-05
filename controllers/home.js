const ArticleModel = require('../models/article');
const CategoryModel = require("../models/category");
const UserModel = require("../models/user");
const trimHtml = require('trim-html');
const Home = {
    /**
     * 首页
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
        let content = [];
        let where = {};

        if (key) {
            where = {title: {$regex: regex}};
        }
        ArticleModel.find(where).count().then(doc => {
            count = doc;
            totalPage = Math.ceil(count / limit);

            ArticleModel.find(where).skip((page - 1) * limit).limit(limit).sort({create_at: 'desc'}).then(articleList => {
                //截取文章内容
                for (var i = 0; i < articleList.length; i++) {
                    content.push(trimHtml(articleList[i].content, {
                        limit: 150,
                        moreLink: "/article/details?id=" + articleList[i]._id,
                        preserveTags: false
                    }));
                }
                res.render('index', {
                    list: articleList,
                    count: count,
                    page: page,
                    totalPage: totalPage,
                    key: key,
                    content: content
                });
            });
        });
    },
    /**
     * 个人中心页
     */
    personalCenter: (req, res, next) => {

        UserModel.findOne({}).then(user => {
            ArticleModel.find({}).count().then( totalPage=> {
                ArticleModel.find({}).then(articleList => {
                    res.render('center',{
                        user:user,
                        articleList:articleList,
                        totalPage:totalPage,
                        articleEidt:""
                    });
                });
            });


        });

    },

    /**
     * 栏目页
     */
    category: (req, res, next) => {
        let categoryPath = req.params.category;
        console.log(categoryPath);
        //列表 分页 搜索 排序
        CategoryModel.findOne({path: '/' + categoryPath}).then(doc => {
            //搜索关键字
            let key = req.query.key;
            let regex = new RegExp(key);

            //分页
            let count = 0;
            let limit = 2;
            let page = req.query.page ? req.query.page : 1;
            let totalPage = 0;
            let content = [];
            let where = {
                category_id: doc._id
            };
            if (key) {
                where.title = {$regex: regex};
            }
            ;

            ArticleModel.find(where).count().then(doc => {
                count = doc;
                totalPage = Math.ceil(count / limit)
                //console.log(key);
                ArticleModel.find(where).skip((page - 1) * limit).limit(limit).sort({create_at: 'desc'}).then(articleList => {
                    for (var i = 0; i < articleList.length; i++) {
                        content.push(trimHtml(articleList[i].content, {
                            limit: 150,
                            moreLink: "/article/details?id=" + articleList[i]._id,
                            preserveTags: false
                        }));
                    }
                    res.render('index', {
                        list: articleList,
                        count: count,
                        page: page,
                        totalPage: totalPage,
                        key: key,
                        content: content
                    });
                });
            })
        })
    }
}

module.exports = Home;