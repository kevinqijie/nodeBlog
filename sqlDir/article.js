const {query} = require('../config/mysql')

class Article {
    static page(category, page, callback) {
        query(`SELECT * FROM article_list WHERE category = ${category} ORDER BY article_id asc limit ${(page-1)*20},20;`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(rows[0]);
        })

    }
    static add(title, username, content, category,description,id, callback) {
        query(`
                        INSERT INTO article (title, create_user,content,create_user_id,category) VALUES( '${title}', '${username}','${content}','${id}','${category}');
                        select @last := LAST_INSERT_ID();
                        INSERT INTO article_list ( title,create_user,description,create_user_id,article_id,category)VALUES ( '${title}', '${username}','${description}','${id}',@last,'${category}');`,
            (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    callback('操作失败');
                    return;
                }
            callback('操作成功');
        })

    }
    static details(id,callback){
        query(`
                    SELECT * FROM article WHERE id = ${id};
                    select id,title from article where  id = (select id from article where  id>${id}  ORDER BY ID asc LIMIT 1) or id = (select id from article where  id<${id}  ORDER BY ID desc LIMIT 1);
                   `,
            (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    callback('获取失败');
                    return;
                }
                callback({article:rows[0][0],pre:rows[1][0],next:rows[1][1]});
            })
    }
    static delete(id,callback){
        query(`
                   delete article_list ,article  FROM article_list left JOIN  article on article_list.article_id = article.id WHERE article.id = ${id}
                   `,
            (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    callback('操作失败');
                    return;
                }
                callback('操作成功');
            })
    }
    static update(title,content,category,description,id,callback){
        query(`
                   UPDATE article SET title = '${title}',content='${content}',category=${category} WHERE id = ${id};
                   UPDATE article_list SET title = '${title}',description='${description}',category=${category} WHERE article_id = ${id}
                   `,
            (err, rows, fields) => {
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
