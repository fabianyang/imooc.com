/*
    http://m.ftchinese.com/phone/html5storage.js
*/

window.ipadstorage = function() {

var db = null;
var init_uname = 'story';
var sql = {
    CREATE : "CREATE TABLE ftchinese (uname REAL UNIQUE,types TEXT, uvalue TEXT, expriedtime INTEGER )",
    INSERT : "INSERT INTO ftchinese (uname, types ,uvalue ,  expriedtime) VALUES ( ?, ?,? , ?)",
    UPDATE : "UPDATE ftchinese SET uvalue = ? WHERE uname = ?",
    GET : "SELECT uvalue FROM ftchinese WHERE uname = ?",
    COUNT : "SELECT COUNT(*) FROM ftchinese",
    DELETEEXPRIED : "DELETE FROM ftchinese WHERE expriedtime <= ?",
    DROPTABLE : "DROP TABLE ftchinese",
    REMOVE : "DELETE FROM ftchinese WHERE uname = ?",
    REMOVE_BY_TYPE : "DELETE FROM ftchinese WHERE types = ?"
};

function initDB( _callback ) {
    try {
        if ( window.openDatabase ) {
            db = openDatabase("FT", "1.0", "Ftchinese Database", 1000000 );
            checkIfDBInitialized();
            if ( !db ) {
                alert( "Failed to open the database. Have you allocated enough space?" );
            } else {
                if ( typeof _callback === "function" ) {
                    _callback.apply({}, []);
                }
            }
        }
    } catch( error ) {
        if (error == 18) { 
            console.log("Invalid database version."); 
        } else { 
            console.log( "Error trying to open database " + error );
        }
    }
}

function checkIfDBInitialized() {
    db.transaction(
        function(tx) {
            tx.executeSql( sql.COUNT, [],
                function(tx, result) {}, function( tx, error) {
                    tx.executeSql( sql.CREATE, [],
                        // create our single row
                        function(result) {});//tx.executeSql( sql.INSERT, [ init_uname, "" , "0" ]);
                    });
    });
}

function load(_uname ,  _callback) {
    db.transaction(function(tx) {
        tx.executeSql( sql.GET, [ _uname ], function(tx, result) {
            if (result.rows.length > 0) {
                var _row = result.rows.item(0);
                var _json = _row['uvalue'];
                if ( typeof _callback === "function" ) {
                    _callback.apply( {}, [ _json ] );
                }
                return _json;
            }
        }, function(tx, error) {
            alert( "Failed to retrieve ftchinese from database : " + error.message );
            return;
        });
    });
};

function save(_uname ,_types, _json, _expriedtime , _callback ) {
    //remove(_uname);
    db.transaction(function (tx) {
        tx.executeSql( sql.REMOVE, [ _uname ]);
        tx.executeSql( sql.INSERT, [ _uname , _types,_json, _expriedtime ], _callback);
    });
};

function remove(_uname,_callback) {
    db.transaction(function (tx) {
        tx.executeSql( sql.REMOVE, [ _uname  ], _callback);
    });
}

function remove_by_types(_types,_callback) {
    db.transaction(function (tx) {
        tx.executeSql( sql.REMOVE_BY_TYPE, [ _types  ], _callback);
    });
}

function delete_expried_rows(_expriedtime , _callback) {
    db.transaction(function (tx) {
        tx.executeSql( sql.DELETEEXPRIED, [ _expriedtime ], _callback);
    });
};

function droptable(_callback){
    if (!db) return; // test
    db.transaction(function (tx) {
        tx.executeSql( sql.DROPTABLE, [], _callback);
    });
    checkIfDBInitialized();
};

return {
    init : initDB,
    load : load,
    save : save,
    delete_expried_rows : delete_expried_rows,
    droptable : droptable,
    remove : remove,
    remove_by_types : remove_by_types
};
}();