// MongoDB
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/highscore";

var express = require('express');
var crud = require('mongodb-crud-phkl16')(dsn, 'highscore');
var router = express.Router();


router.get('/highscore', async (req, res) => {
    try {
        const result = await crud.getAll();

        res.render('highscore', { title: 'Highscore', scores: result});
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

module.exports = router;
