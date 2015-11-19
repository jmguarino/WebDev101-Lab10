var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetByID = function(company_id, callback) {
    console.log(company_id);
    var query = 'SELECT * FROM company WHERE company_id= ?';
    console.log(query);
    connection.query(query, [company_id],
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Update = function(company_info, callback) {
    var query_data = [company_info.name, company_info.address_id, company_info.company_id];
    var query = 'UPDATE company SET name = ?, address_id = ? WHERE company_id = ?';
    connection.query(query, query_data, function(err, result) {
       if(err){
           console.log(err)
           callback(err);
           return;
       }
        else {
           callback(err, result);
       }
    });
}
