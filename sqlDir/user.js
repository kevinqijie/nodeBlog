const {query} = require('../config/mysql')
class User {
    /**
     * 登录
     */
    static login(email, callback) {
        query(`SELECT * FROM user WHERE email =${email}`, (err, rows, fields) => {
            if (err) {
                callback(-1);

            }
            if(rows.length == 0){
                callback(0);
                return;
            }
            callback(rows[0]);
        })
    }
    /**
     * 注册
     */
    static register(email, username,password, callback) {
        query(`INSERT INTO user (email, username,password) VALUES( '${email}', '${username}','${password}')`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                callback('操作失败');
                return;
            }
            callback('操作成功');
        })
    }
    /**
     * @Description:
     * @author 七戒
     * 验证邮箱
     * @date 2020/9/14
    */
    static verificationEmail(email,callback) {
        query(`SELECT * FROM user WHERE email =${email}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                callback(-1);
                return;
            }
            if(rows.length == 0){
                callback(0);
                return;
            }
            callback(1);
        })
    }
}

module.exports = User;
