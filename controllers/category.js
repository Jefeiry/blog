const CategoryModel = require("../models/category");
const ArticleModel = require("../models/article");

const Category = {
    /**
     * 分类列表
     */
    index: (req, res, next) => {
        /* *
         *  关键字搜索
         */
        let path = req.params.name;
        let count = 0;
        let limit = 2;
        let page = req.query.page;
        let totalPage = 0;
        let where = {};

        CategoryModel.find({path:path}).then(doc => {
            if (doc._id) {
                where = {category_id:doc._id}
            }

            ArticleModel.find(where).count().then(doc => {
                count = doc;
                console.log("count:" + count);
                totalPage = Math.ceil(count / limit);
                console.log("totalPage:" + totalPage);
                ArticleModel.find(where).skip((page - 1) * limit).limit(limit).sort({create_at: "desc"}).then(doc => {
                    res.json(doc);
                });
            });
        });


    },
    get: (req, res, next) => {
        CategoryModel.find({}).then(doc => {
            res.json(doc);
        })
    },
    /**
     * 分类保存
     */
    save: (req, res, next) => {
        let categoryModel = new CategoryModel({
            name: req.body.name,
            path: req.body.path,
            template: req.body.template,
            sort: req.body.sort,
            is_nav: req.body.is_nav,
        });
        categoryModel.save();
        res.json({
            "msg": "添加成功！"
        })
    },
    /**
     * 分类更新
     */
    update: (req, res, next) => {
        let id = req.params.id;
        CategoryModel.update({_id: id}, {
            name: req.body.name,
            path: req.body.path,
            template: req.body.template,
            sort: req.body.sort,
            is_nav: req.body.is_nav,
        }).then(doc => {
            res.json(doc);
        });
    },
    /**
     * 分类删除
     */
    delete: (req, res, next) => {
        let id = req.params.id;
        CategoryModel.remove({_id: id}).then(doc => {
            res.json(doc);
        })

    }
}
module.exports = Category;