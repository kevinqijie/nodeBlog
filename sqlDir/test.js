const {query} = require('../config/mysql')
class Test {
    static print(category,callback){
        query(`SELECT * FROM article_list WHERE ${category}`,(err, rows, fields)=>{
            if (err) {
                console.log(err);
                return;
            }
            callback(rows[0]);
        })

    }
}
module.exports = Test;
