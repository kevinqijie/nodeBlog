const {query} = require('../config/mysql')
class User {
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
}

module.exports = User;
