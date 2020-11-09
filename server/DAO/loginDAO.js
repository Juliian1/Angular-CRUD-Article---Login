let dbConfig = require("../Utilities/mysqlConfig");
let mysqlConfig = require("../Utilities/mysqlConfig");
const initialize = require("../Models/article.model");

initialize.statics = {
    login: function (query, cb) {
        this.find(query, cb); //con esto se busca con la query que le voy a pasar y tendre un callback
    }
}

module.exports = {
    initialize: initialize
    }
// const articleModel = mysqlConfig.model('Users', initialize);
// module.exports = articleModel;



// let getLogin = (criteria, callback) => {
// criteria.aricle_id ? conditions += ` and aricle_id = '${criteria.aricle_id}'` : true;
// dbConfig.getDB().query(`select * from login where 1`,criteria, callback);
// }

// let getLoginDetail = (criteria, callback) => {
//     let conditions = "";
// criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
// dbConfig.getDB().query(`select * from login where 1 ${conditions}`, callback);
// }

// let createLogin = (dataToSet, callback) => {
// console.log("insert into login set ? ", dataToSet,'pankaj')
// dbConfig.getDB().query("insert into login set ? ", dataToSet, callback);
// }

// let updateLogin = (criteria,dataToSet,callback) => {
//     let conditions = "";
// let setData = "";
// criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
// dataToSet.nombre ? setData += `, nombre = '${dataToSet.nombre}'` : true;
// dataToSet.email ? setData += `email = '${dataToSet.email}'` : true;
// dataToSet.password ? setData += `password = '${dataToSet.password}'` : true;
// console.log(`UPDATE login SET ${setData} where 1 ${conditions}`);
// dbConfig.getDB().query(`UPDATE login SET ${setData} where 1 ${conditions}`, callback);
// }
// module.exports = {
// getLogin : getLogin,
// createLogin : createLogin,
// updateLogin : updateLogin,
// getLoginDetail : getLoginDetail
// }