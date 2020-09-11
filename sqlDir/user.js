class User {
    static login(category, page, callback) {
        query(`SELECT * FROM article_list WHERE category =${category}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(rows[0]);
        })
    }
    static register(category, page, callback) {
        query(`SELECT * FROM article_list WHERE category =${category}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                return;
            }
            callback(rows[0]);
        })
    }
}

module.exports = User;
