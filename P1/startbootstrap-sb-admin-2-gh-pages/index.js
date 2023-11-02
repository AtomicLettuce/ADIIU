/*
Server side js
*/

// Import required modules
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const google = require('googleapis').google;
const googleSearch =google.customsearch('v1');

async function googleImgQuery(query){
    const response = await googleSearch.cse.list({
        auth:'AIzaSyBdzhrXiFGR4AMQdyX6tiaIm3ubnh_Dpo0',
        cx:'611cd72e554a74cb0',
        q: query,
        searchType: 'image',
        num:2
    });
    //console.log(response);
    //console.log(response.request.responseURL);
    const url = await fetch(response.request.responseURL);
    const urlresp =await url.json();
    if(urlresp.items!==undefined){
        console.log('has items')
        if(urlresp.items[0].link !==undefined){
            console.log('has link')
        }
    }
    return urlresp.items[0].link;
}



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
GROUP BY t.tipus
ORDER BY quantitat DESC;`, (err, results) => {
        if (err) {
            console.error('Error en la consulta 1:', err);
            res.status(500).json({ error: 'Error en la consulta 1' });
        } else {
            const data = results.map(results => ({
                name: results.tipus,
                y: results.quantitat
            }));
            res.json(data);
        }
    });
});

app.get('/topAtac', (req, res) => {
    db.query(`SELECT nom,atac FROM pokedex ORDER BY atac DESC LIMIT 5`, (err, results) => {
        if (err) {
            console.error('Error en la consulta 1:', err);
            res.status(500).json({ error: 'Error en la consulta 1' });
        } else {
            const data = results.map(results => ({
                name: results.nom,
                y: results.atac
            }));
            res.json(data);
        }
    });
});

app.get('/randomPokemon', (req, res) => {
    db.query(
        `SELECT nom FROM pokedex
            ORDER BY RAND()
            LIMIT 1;`,
        async (err, results) => {
        if (err) {
            console.error('Error en la consulta 1:', err);
            res.status(500).json({ error: 'Error en la consulta 1' });
        } else {
            //res.json(results);
            console.log(results[0].nom);
            var img={
                link:'',
                nom:''
            }
            img.link = await googleImgQuery(results[0].nom);
            img.nom = results[0].nom;
            console.log(img);
            res.json(img);

        }
    });
});












app.get('/consultaLegendarios', (req, res) => {
    db.query(`SELECT tipus_1, COUNT(*) FROM pokedex WHERE es_llegendari="TRUE" GROUP BY tipus_1;`, (err, results) => {
        if (err) {
            console.error('Error en la consulta 1:', err);
            res.status(500).json({ error: 'Error en la consulta 1' });
        } else {
            res.json(results);
        }
    });
});

app.use('/', express.static(path.join(__dirname, '')));