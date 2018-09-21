const pg_Config = require('../config/dbconfig');
const query = require('../config/query');
var express = require('express');
var cors = require('cors');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var TimeFormat = require('hh-mm-ss')

var actualValueObject = {
  ace: null,
  rcf: null,
  rpm: null,
  state: null,
  temperature: null,
  time: null
}

var errorObject = {
  code: null,
  description: null,
  title: null,
  time: null,
}

var controlObject = {
  accelerationProfile: null,
  ace: null,
  decelerationProfile: null,
  rcf: null,
  rpm: null,
  temperature: null,
  time: null
}

let gpPro_Config = new sqlite3.Database(pg_Config.db_path, (err) => {
  if (err) {
    return console.error(err.message);
  } else {
    console.log('');
  }

});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
// router.get('/getstate', function (req, res, next) {
//   router.options('/getstate', cors());
//   gpPro_Config.all(query.get_state, function (err, row) {
//     if (!err) {
//       res.json({ 'name': row[0].unitName, state: row[0].currentState });
//     }
//   });
// });

router.get('/getall', function (req, res) {
  router.options('/getall', cors());
  gpPro_Config.all(query.actualValues, function (err, row) {
    if (!err) {
      var unitName = row[0].name;
      var program = row[0].loadedProgram;
      var rotorName = row[0].usedRotor;
      //creating actual object
      if (row[0].chartvaluespeedType == 0) {
        actualValueObject.rpm = row[0].actualSpeed;
      }
      if (row[0].chartvaluespeedType == 1) {
        actualValueObject.rcf = row[0].actualSpeed;
      }
      if ((row[0].cotrolTime == '') || (row[0].cotrolTime == null)) {
        actualValueObject.ace = row[0].timeACEMode1 + 'e' + timeACEMode2;
      }
      if ((row[0].cotrolTime != '') || (row[0].cotrolTime != null)) {
        actualValueObject.time = TimeFormat.fromS(row[0].cotrolTime, 'hh:mm:ss')
      }
      actualValueObject.temperature = row[0].actualTemp;
      actualValueObject.state = row[0].currentState;

      // // For Creating Error Object
      // var str = 'Error 77 occured'
      // if (str.indexOf('Error') > -1) {
      //   console.log('Contains Error')
      //   console.log(str.match(/\d+/g).map(Number).toString());
      // }
      // else{
      //   console.log('Not contains Error')
      // }

      if (((row[0].eventType == 'Errors') || (row[0].eventType == 'Error') || (row[0].eventType == 'Alarm') || (row[0].eventType == 'Alarms'))&& (row[0].title.indexOf('Error') > -1)) {
        errorObject.code = row[0].title.match(/\d+/g).map(Number).toString();
        errorObject.description = row[0].description;
        errorObject.title = row[0].title;
        errorObject.time = row[0].timeval;
      }
      //Creating SetValueObject
      var timestamp = new Date(row[0].cotrolTime * 1000);
      if (row[0].controlSpeedType == 0) {
        controlObject.rpm = row[0].speedInRpm;
      }
      if (row[0].controlSpeedType == 1) {
        controlObject.rcf = row[0].speedInRcf;
      }
      // if ((row[0].cotrolTime == '') || (row[0].cotrolTime == null)) {
      //   controlObject.ace = row[0].timeACEMode1 + 'e' + timeACEMode2;
      // }
      controlObject.ace = actualValueObject.ace;
      controlObject.temperature = row[0].controltemp;
      controlObject.time = actualValueObject.time;
      // controlObject.time = timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds();
      controlObject.accelerationProfile = row[0].accelarationprofile;
      controlObject.decelerationProfile = row[0].decelerationProfile;
      // res.json(row);
      res.json({ "actualValues": actualValueObject, "error": errorObject, "name": unitName, "program": program, "rotorName": rotorName, "setValues": controlObject });
    }
  });
});
console.log('API IS READY')
module.exports = router;
