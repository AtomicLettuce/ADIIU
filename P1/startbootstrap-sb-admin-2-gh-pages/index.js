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
    console.log('Server started on port 3000');
});


app.use('/', express.static(path.join(__dirname, '')));