var mysql = require('mysql')
var util = require('util');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'group_root',
    password: '123456',
    database: 'group_management'
});

pool.query = util.promisify(pool.query).bind(pool);

module.exports = pool;
