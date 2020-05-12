// const connection = require('./db/connection')
// const consoleTb = require('console.table')


// const showDatabase = async (tableName, body) => {
//     try {
//         const db = await connection("employee-tracker")
//         const [Rows] = await db.query(`SELECT * FROM ${tableName} ORDER BY ${body} ASC`)
//         const table = await consoleTb.getTable(Rows)
//         return (`
// ${table}
//             `)

//     } catch (err) {
//         console.log(err)
//     } finally {
//         const db = await connection("employee-tracker")
//         db.end()
//     }
// }

// module.exports = showDatabase