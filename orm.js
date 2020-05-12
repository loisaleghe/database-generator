const connection =require('./db/connection') 

//USE ?? IF VARIABLE ISN'T A STRING BUT AN SQL TYPE
const orm = {
  selectAll: async function (tableName) {
    const sql = "SELECT * FROM ??";
    const [rows] = await connection.query(sql, [tableName]);
    return rows;
  },
};

module.exports = orm

