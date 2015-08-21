//File: controllers/Surveys.js
var mongoose = require('mongoose');
var Survey  = mongoose.model('Survey');

//GET - Return all Surveys in the DB
exports.findAllSurveys = function(req, res) {
	Survey.find(function(err, Surveys) {
    if(err) res.send(500, err.message);

    console.log('GET /Surveys')
		res.status(200).jsonp(Surveys);
	});
};

//GET - Return a Survey with specified ID
exports.findById = function(req, res) {
	Survey.findById(req.params.id, function(err, Survey) {
    if(err) return res.send(500, err.message);

    console.log('GET /Survey/' + req.params.title);
		res.status(200).jsonp(Survey);
	});
};

//POST - Insert a new Survey in the DB
exports.addSurvey = function(req, res) {
	console.log('POST');
	console.log(req);

	var survey = new Survey({
		_id:    req.body._id,
		content:  req.body.content
	});

	survey.save(function(err, survey) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(survey);
	});
};

//PUT - Update a register already exists
exports.updateSurvey = function(req, res) {
	Survey.findById(req.params.id, function(err, Survey) {
		Survey.title   = req.body.petId;
		Survey.year    = req.body.year;
		Survey.country = req.body.country;
		Survey.poster  = req.body.poster;
		Survey.seasons = req.body.seasons;
		Survey.genre   = req.body.genre;
		Survey.summary = req.body.summary;

		Survey.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(Survey);
		});
	});
};

//DELETE - Delete a Survey with specified ID
exports.deleteSurvey = function(req, res) {
	Survey.findById(req.params.id, function(err, Survey) {
		Survey.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};
