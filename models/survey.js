exports = module.exports = function(app, mongoose) {

	var surveySchema = new mongoose.Schema({
		_id : {type: Number},
		content: {type: Object}
		
	});

	mongoose.model('Survey', surveySchema);

};
