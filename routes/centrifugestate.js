const pg_Config = require('../config/dbconfig');
const query = require('../config/query');
var express = require('express');
var cors = require('cors');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

let gpPro_Config = new sqlite3.Database(pg_Config.db_path, (err) => {
  if (err) {
    return console.error(err.message);
  } else {
    console.log('');
  }

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getstate', function (req, res, next) {
  router.options('/getstate', cors());
  gpPro_Config.all(query.get_state, function (err, row) {
    if (!err) {
      res.json({ 'name': row[0].unitName, state: row[0].currentState });
    }
  });
});

module.exports = router;