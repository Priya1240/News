//Require Mongoose

var mongoose = require("mongoose");

//Create Schema

var Schema = mongoose.Schema;

var noteSchema = new Schema({
	title: {
		type: String,
	},

	body: {
		type: String
	}
});

var note = mongoose.model("Note", noteSchema);

module.exports = note;