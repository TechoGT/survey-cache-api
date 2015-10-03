//File: controllers/Surveys.js
var mongoose = require('mongoose');
var Survey  = mongoose.model('Survey');

//GET - Return all Surveys in the DB
exports.findAllSurveys = function(req, res) {
	Survey.find(function(err, surveys) {
    if(err) res.send(500, err.message);

    console.log('GET /Surveys')
		res.status(200).jsonp(surveys);
	});
};

//GET - Return a Survey with specified ID
exports.findById = function(req, res) {
	Survey.findById(req.params.id, function(err, survey) {
    if(err) return res.send(500, err.message);
    if(!survey) return res.send({message: 'no data was found',status:false})            

    console.log('GET /Survey/' + req.params.id);
		res.status(200).jsonp(survey);
	});
};

//POST - Insert a new Survey in the DB
exports.addSurvey = function(req, res) {
	console.log('POST');	

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
	Survey.findById(req.params.id, function(err, survey) {
		survey.content   = req.body.content;		
		survey.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(survey);
		});
	});
};

//DELETE - Delete a Survey with specified ID
exports.deleteSurvey = function(req, res) {
	Survey.findById(req.params.id, function(err, survey) {
		survey.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};
