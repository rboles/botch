const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const nodeCleanup = require('node-cleanup');
const uuid = require('uuid/v1');

// API config
const SERVICE_PORT = 3003;

// MongoDB config
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'botch';
const DB_COLL = 'todo';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let db = undefined;

/* -- Static Content Endpoints */

app.get('/', (req, res) => {
    db.collection(DB_COLL).find().toArray((err, results) => {
        if ( err ) {
            res.status(500).type('text/plain').send(err);
        } else {
            const sorted = results.sort((a, b) => {
                return b.priority - a.priority;
            });
            console.log(sorted);
            res.render('index.ejs', {todos: sorted});
        }
    });
});

/* -- API Endpoints */

// get all entities
app.get('/api/todo', (req, res) => {
    console.log('GET /api/todo');
    db.collection(DB_COLL).find().toArray((err, results) => {
        res.status(200).type('application/json').send(results);
    });
});

// get entity matching ID
app.get('/api/todo/:id', (req, res) => {
    console.log('GET /api/todo/:id');
    const id = req.params.id;
    db.collection(DB_COLL).findOne({id: id}, (err, result) => {
        if ( err ) {
            res.status(500).type('text/plain').send(err);
        } else {
            if ( result ) {
                res.status(200).type('application/json').send(result);
            } else {
                res.status(404).type('text/plain').send('NOT FOUND');
            }
        }
    });
});

// create an entity
app.post('/api/todo', (req, res) => {
    console.log('POST /api/todo', req.body);
    const record = req.body;
    record['id'] = uuid();
    db.collection(DB_COLL).insertOne(record, (err, result) => {
        if ( err ) {
            res.status(500).type('text/plain').send(err);
        } else {
            res.redirect('/');
            // if this was a pure API we would return:
            // res.status(201).type('application/json').send(record);
        }
    });
});

/* -- Main */

nodeCleanup((exitCode, signal) => {
    console.log('Shutting down...');
    if ( db ) {
        console.log(' - Released connection to MongoDB: ' + DB_URL);
    }
});

mongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
    if ( err ) {
        console.log('ERROR: ', err);
        return;
    } else {
        db = client.db(DB_NAME);
        app.listen(SERVICE_PORT, () => {
            console.log('Starting up...');
            console.log(' - Service listening on ' + SERVICE_PORT);
            console.log(' - Service connected to MongoDB ' + DB_URL);
        });
    }
});

