const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Nostalgic',
    password: 'nostalgic',
    port: 5433
});

const getGames = (request, response) => {
    pool.query('SELECT * FROM games ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getGamesById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM games WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const newGame = (request, response) => {
    const { name, description, developer, launchdate, platforms, genre, mode, image } = request.body
  
    pool.query('INSERT INTO games (name, description, developer, launchdate, platforms, genre, mode, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [name, description, developer, launchdate, platforms, genre, mode, image], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Game added with ID: ${result.insertId}`)
    })
  }
  
  const updateGame = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, description, developer, launchdate, platforms, genre, mode, image } = request.body
  
    pool.query(
      'UPDATE games SET name = $1, description = $2, developer = $3, launchdate = $4, platforms = $5, genre = $6, mode = $7, images = $8 WHERE id = $9',
      [name, description, developer, launchdate, platforms, genre, mode, image],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Game modified with ID: ${id}`)
      }
    )
  }
  
  const deleteGame = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM games WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Game deleted with ID: ${id}`)
    })
  }

module.exports = {
    getGames,
    getGamesById,
    newGame,
    updateGame,
    deleteGame
}