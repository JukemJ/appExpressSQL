const { poolConnection } = require('../config/database')

module.exports ={
    getTopTwenty: async (req,res) => {
        try {
    
            console.log("Reading rows from the Table...");
            const pool = await poolConnection
            var resultSet = await pool.request().query(`SELECT TOP 20 pc.Name as CategoryName,
                p.name as ProductName 
                FROM [SalesLT].[ProductCategory] pc
                JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`);
    
            console.log(`${resultSet.recordset.length} rows returned.`);
    
            // output column headers
            const columns = []
            for (var column in resultSet.recordset.columns) {
                columns.push(column)
            }
            console.log(columns)
            const rows = []
            // ouput row contents from default record set
            resultSet.recordset.forEach(row => {
                rows.push([row[columns[0]], row[columns[1]]])
                //console.log("%s\t%s", row[columns[0]], row[columns[1]]);
            });
            console.log(rows)
    
            // close connection only when we're certain application is finished
            //poolConnection.close();
            res.render('index', { title: 'Express', columnNames:columns, rowItems:rows})
        } catch (err) {
            console.error(err.message);
        }
    }
}