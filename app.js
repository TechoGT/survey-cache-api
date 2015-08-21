var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://techouser:holamundo@ds033113.mongolab.com:33113/techo-survey-cache', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/tvshow')(app, mongoose);
var models     = require('./models/survey')(app, mongoose);
var TVShowCtrl = require('./controllers/tvshows');
var SurveyCtrl = require('./controllers/surveyController');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var tvshows = express.Router();

tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/construct')
  .get(SurveyCtrl.findAllSurveys)
  .post(SurveyCtrl.addSurvey);

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

tvshows.route('/construct/:id')
  .get(SurveyCtrl.findById)
  .put(SurveyCtrl.updateSurvey)
  .delete(SurveyCtrl.deleteSurvey);

app.use('/api', tvshows);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
