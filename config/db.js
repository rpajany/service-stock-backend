// import path module
const path = require('path');

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, '../data/dbStock.db');

// Create connection to SQLite database
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true, //  This will ensure that columns that are not provided will use NULL as the default and This hides the warning
    pool: { // new added for multi user connection
        min: 4,   // Minimum number of connections
        max: 10,  // Maximum number of connections
    },
});

// create Table 'tbl_User'
knex.schema
    .hasTable('tbl_User')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('tbl_User', (table) => {
                table.increments('user_id').primary()
                table.string('username')
                table.string('password')
                table.string('role')
                table.timestamp('created_at').defaultTo(knex.fn.now());

            })
                .then(() => {
                    // Log success message
                    console.log('Table \'tbl_User\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating tbl_User: ${error}`)
                })
        }
    })
    .then(() => {
        // Log success message
        console.log('db connected.. !!')
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`)
    });
// Export the database
module.exports = knex