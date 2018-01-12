var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/gomoku', function(req, res) {
    res.render('gomoku', { title: 'Gomoku' });
});

module.exports = router;
