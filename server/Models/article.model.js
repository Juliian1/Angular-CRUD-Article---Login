let mysqlConfig = require("../Utilities/mysqlConfig");

let initialize = () => {
mysqlConfig.getDB().query("create table IF NOT EXISTS article (id INT auto_increment primary key, category VARCHAR(30), title VARCHAR(24), images VARCHAR(300))");

mysqlConfig.getDB().query("create table IF NOT EXISTS users (id INT auto_increment primary key, username VARCHAR(30), password VARBINARY(30))");

}

module.exports = {
    initialize: initialize
}
