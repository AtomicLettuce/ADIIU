/*
Server side js
*/

// Import required modules
const express = require('express');
const mysql = require('mysql');
const path = require('path');

// Create an instance of express
const app = express();

// Middlewares
app.use(express.json());

// Define the database connection details
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ADIIU_P1_POKEMON'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Set up the server
app.listen('6900', () => {
    console.log('Server started on port 6900');
});

app.get('/tipus', (req, res) => {
    db.query(`SELECT 
    tipus, SUM(recompte) quantitat
FROM
    (SELECT 
        tipus_1 tipus, COUNT(*) recompte
    FROM
        pokedex
    GROUP BY tipus_1 UNION SELECT 
        tipus_2 tipus, COUNT(*) recompte
    FROM
        pokedex
    WHERE
        tipus_2 != ''
    GROUP BY tipus_2
    ORDER BY tipus) t
GROUP BY t.tipus;`, (err, results) => {
        if (err) {
            throw err;
        }

        // Transform the data into a format that can be used by Highcharts
        const data = results.map(result => ({
            name: result.developer,
            y: result.count
        }));

        // Send the data to the client
        res.json(data);
    });
});








app.get('/consultaLegendarios', (req, res) => {
    db.query('SELECT tipus_1, COUNT(*) FROM pokedex WHERE es_llegendari="TRUE" GROUP BY tipus_1;', (err, results) => {
        if (err) {
            console.error('Error en la consulta 1:', err);
            res.status(500).json({ error: 'Error en la consulta 1' });
        } else {
            res.json(results);
        }
    });
});




app.use('/', express.static(path.join(__dirname, '')));