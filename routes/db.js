// MongoDB
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/movie";

var express = require('express');
var crud = require('mongodb-crud-phkl16')(dsn, 'movie');
var router = express.Router();


router.get('/db', async (req, res) => {
    try {
        const result = await crud.getAll();

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
        await crud.create(movie);
        res.redirect('/db');
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const result = await crud.find(id);

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
        await crud.update(id, movie);
        res.redirect('/db');
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

router.get('/remove/:id', async (req, res) => {
    let id = req.params.id;

    try {
        await crud.delete(id);
        res.redirect('/db');
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

module.exports = router;
