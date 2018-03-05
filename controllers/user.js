const UserModel = require("../models/user");
const md5 = require("md5");
const User = {
    /**
     * 登录页面
     */
    login: (req, res, next) => {
        res.render('login');
    },
    /**
     * 登录验证
     */
    doLogin: (req, res, next) => {

    },
    /**
     * 登出
     */
    logout: (req, res, next) => {

    },
    /**
     * 更新信息
     */
    update: (req, res, next) => {
        let id = req.query.id;
        UserModel.update({_id: id}, {
            nickname: req.body.nickname,
            //avatar: req.body.avatar,
            signature: req.body.signature,
            position: req.body.position,
            //info: req.body.info,
        }).then(doc => {
            res.redirect("/personalCenter");
        });
    },
    /**
     * 修改密码
     */
    updatePassword: (req, res, next) => {
        let id = req.query.id;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        let surePassword = req.body.surePassword;
        UserModel.findOne({_id: id}).then(doc => {
            if (md5(oldPassword) != doc.password) {
                res.json({message: "原密码不正确"});
            }
            else {
                if (newPassword != surePassword) {
                    res.json({message: "两次密码不一致"});
                }
                else {
                    UserModel.update({_id: id}, {
                        password: md5(surePassword),
                    }).then(doc => {
                        res.json({message: "修改成功"});
                    });
                }
            }
        });
    }
}
module.exports = User;