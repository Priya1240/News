//Require Mongoose

var mongoose = require("mongoose");

//Create Schema

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({

	title: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
	},

	notes: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

// Create the Article model with the ArticleSchema
var article = mongoose.model("Article", ArticleSchema);

module.exports = article;