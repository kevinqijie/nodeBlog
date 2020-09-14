const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const {query} = require('../config/mysql')

// console.log(User)





const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";


// 导出passport 对象
module.exports = passport =>{
    //进行token 验证
    // @jwt_payload token携带信息
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        query(`SELECT id,username FROM user WHERE id =${jwt_payload.id}`, (err, rows, fields) => {
            if (err) {
                return done(null,false)
            }
            done(null,rows[0])
        })
    }))
}
