const {query} = require('../config/mysql')

class Article {
    static page(category, page, callback) {
        let sql = `
        SELECT * FROM article_list WHERE category = ${category} ORDER BY article_id asc limit ${(page-1)*20},20;
        SELECT COUNT(1) FROM article_list WHERE category =${category}
        `
        if(category== 0){
            sql = `
            SELECT * FROM article_list  ORDER BY article_id asc limit ${(page-1)*20},20;
            SELECT COUNT(1) FROM article_list
            `
        }
        query(sql, (err, rows, fields) => {
            if (err) {
                callback({msg: "获取失败"});
                return;
            }
            callback({data:rows[0],total:rows[1][0]['COUNT(1)']});
        })

    }
    static add(title, username, content, category,description,id, callback) {
        let sql = `
                        INSERT INTO article (title, create_user,content,create_user_id,category) VALUES( '${title}', '${username}','${content.replace(/'/g,'"')}','${id}','${category}');
                        select @last := LAST_INSERT_ID();
                        INSERT INTO article_list ( title,create_user,description,create_user_id,article_id,category)VALUES ( '${title}', '${username}','${description.replace(/'/g,'"')}','${id}',@last,'${category}');
                        `
        query(sql,
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
                    select id,title from article where  id = (select id from article where  id>${id} and category =(select category from article where  id=${id}) ORDER BY ID asc LIMIT 1);
                    select id,title from article where id  = (select id from article where  id<${id} and category =(select category from article where  id=${id}) ORDER BY ID desc LIMIT 1);
                    UPDATE article SET read_volume = article.read_volume+1 WHERE id = ${id};
                    UPDATE article_list SET read_volume = article_list.read_volume+1 WHERE article_id = ${id};
                   `,
            (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    callback('获取失败');
                    return;
                }
                console.log(rows)
                callback({article:rows[0][0],pre:rows[2][0],next:rows[1][0]});
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
    static hot(callback){
        let sql = `SELECT title,article_id,read_volume FROM article_list  ORDER BY read_volume desc limit 0,10;`
        query(sql, (err, rows, fields) => {
            if (err) {
                callback({msg: "获取失败"});
                return;
            }
            callback({data:rows});
        })
    }
    static updateTime(callback){
        let sql = `SELECT title,article_id,create_time FROM article_list  ORDER BY create_time desc limit 0,10;`
        query(sql, (err, rows, fields) => {
            if (err) {
                callback({msg: "获取失败"});
                return;
            }
            callback({data:rows});
        })
    }
}

module.exports = Article;
