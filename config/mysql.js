var db    = {};
var mysql = require('mysql');
const {sql} = require('./index')
var pool  = mysql.createPool({
    connectionLimit : 10,
    ...sql
});

db.query = function(sql, callback){
    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function(err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };
        callback(null, rows, fields);
    });
}
module.exports = db;
