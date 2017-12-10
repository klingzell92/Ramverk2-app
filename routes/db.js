// MongoDB
const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/movie";
var ObjectId = require('mongodb').ObjectID;

var express = require('express');
var router = express.Router();


router.get('/db', async (req, res) => {
    try {
        const db  = await mongo.connect(dsn);
        const col = await db.collection('movie');
        const result = await col.find().toArray();

        await db.close();
        res.render('db', { title: 'DB', movies: result});
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

router.post('/create', async (req, res) => {
    var movie = {
        director: req.body.director,
        title: req.body.title,
        release: req.body.release
    };

    try {
        const db  = await mongo.connect(dsn);
        const col = await db.collection('movie');

        col.insert(movie);
        await db.close();
        res.redirect('/db');
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const db  = await mongo.connect(dsn);
        const col = await db.collection('movie');
        const result = await col.find({"_id": ObjectId(id)}).toArray();

        console.log(result[0]);
        res.render('edit', { title: 'Redigera', movie: result[0]});
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

router.post('/update', async (req, res) => {
    let id = req.body.id;
    var movie = {
        director: req.body.director,
        title: req.body.title,
        release: req.body.release
    };

    console.log(id);
    try {
        const db  = await mongo.connect(dsn);
        const col = await db.collection('movie');

        col.update({  "_id": ObjectId(id) }, movie);
        res.redirect('/db');
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

router.get('/remove/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const db  = await mongo.connect(dsn);
        const col = await db.collection('movie');

        col.remove({  "_id": ObjectId(id) });
        res.redirect('/db');
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

module.exports = router;
