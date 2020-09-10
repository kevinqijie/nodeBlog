const {query} = require('../config/mysql')

class Article {
    static page(category, page, callback) {
        query(`SELECT * FROM article_list WHERE ${category}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(rows[0]);
        })

    }

    static add(title, create_user, content, category,description, callback) {
        let date = new Date()
        let create_time =date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        query(`INSERT INTO article (title, create_user,content,create_time,category) VALUES( '${title}', '${create_user}','${content}','${create_time}','${category}');
        select @last := LAST_INSERT_ID();
        INSERT INTO article_list ( title,create_user,description,create_time,article_id,category)VALUES ( '${title}', '${create_user}','${description}','${create_time}',@last,'${category}');`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                callback('操作失败');
                return;
            }
            callback('操作成功');
        })

    }
}

module.exports = Article;
