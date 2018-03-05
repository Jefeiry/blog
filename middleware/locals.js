const CategoryModel = require("../models/category");
const UserModel = require("../models/user");
const ArticleModel = require("../models/article");
const Locals = (req, res, next) => {

    let limit = 2;
    let is_jing = {is_jing: 1};
    /**
     * sys导航查询
     */
    CategoryModel.find({is_sys: 1, is_nav: 1}).then(sysList => {
        res.locals.sysList = sysList;
        /**
         * 登录失败提示
         */
        res.locals.error = req.flash('error');
        /**
         * 存储user登录信息
         */
        res.locals.loginUser = req.session.loginUser;
        /**
         * nav导航查询
         */
        CategoryModel.find({is_sys: 0, is_nav: 1}).then(navList => {
            res.locals.navList = navList;
            /**
             * 侧边栏user查询
             */
            UserModel.findOne({}).then(userList => {
                res.locals.userList = userList;
                /**
                 * 侧边栏文章精华查询
                 */
                ArticleModel.find(is_jing).limit(limit).then(articleJing => {
                    res.locals.articleJing = articleJing;
                    /**
                     * 侧边栏热门文章查询
                     */
                    ArticleModel.find({}).sort({view: -1}).limit(limit).then(articleHot => {
                        res.locals.articleHot = articleHot;
                        next();
                    });
                });
            });
        });
    });


}
module.exports = Locals;