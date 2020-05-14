const connection =require('./db/connection') 

//USE ?? IF VARIABLE ISN'T A STRING BUT AN SQL TYPE
const orm = {
  insert: async function(table, col, val ){
    const sql = "INSERT INTO ?? (??) VALUES (?)";
    const [rows] = await connection.query(sql, [table, col, val]);
    return rows;
  },
  insertMore: async function(table, col, col1, col2, val1, val2, val3 ){
    const sql = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
    const [rows] = await connection.query(sql, [table, col, col1, col2, val1, val2, val3]);
    return rows;
  },
  selectAll: async function (tableName) {
    const sql = "SELECT * FROM ??";
    const [rows] = await connection.query(sql, [tableName]);
    return rows;
  },

  selectJoin: async function (
    col1,
    col2,
    col3,
    col4,
    col5,
    col6,
    col7,
    col8i,
    tb1,
    tb2i,
    col8,
    col9,
    tb3,
    col10,
    col11,
    tb4,
    col12,
    col13,
    col14,
    col15
  ) {
    const sql = 
    `SELECT ??, ??, ??, ??, ??, concat(??, ' ', ??) AS ??
    FROM ??
    JOIN ?? ON ?? = ??
    JOIN ?? ON ?? = ??
    LEFT JOIN ?? ?? ON ?? = ??
    ORDER BY ??`
    
const [rows] = await connection.query(sql, [
  col1,
  col2,
  col3,
  col4,
  col5,
  col6,
  col7,
  col8i,
  tb1,
  tb2i,
  col8,
  col9,
  tb3,
  col10,
  col11,
  tb4,
  col12,
  col13,
  col14,
  col15
])

return rows
  }
};

module.exports = orm

