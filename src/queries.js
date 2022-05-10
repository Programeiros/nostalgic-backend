const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Nostalgic',
    password: 'nostalgic',
    port: 5433
});

const getGames = (require, response) => {
    pool.query('SELECT * FROM "Games" ORDER BY "Id" ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getGamesById = (require, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "Games" WHERE "Id" = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getGames,
    getGamesById
}