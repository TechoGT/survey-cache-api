var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Enable huge json files
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// Connection to DB
mongoose.connect('mongodb://localhost/techo-cache', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/survey')(app, mongoose);
var SurveyCtrl = require('./controllers/surveyController');


// API routes
var surveys = express.Router();

surveys.route('/construct')
  .get(SurveyCtrl.findAllSurveys)
  .post(SurveyCtrl.addSurvey);

surveys.route('/construct/:id')
  .get(SurveyCtrl.findById)
  .put(SurveyCtrl.updateSurvey)
  .delete(SurveyCtrl.deleteSurvey);

app.use('/api', surveys);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
