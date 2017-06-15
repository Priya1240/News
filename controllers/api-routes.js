var express = require("express");
var router = express.Router();
var request = require('request');
var cheerio = require("cheerio");

var article = require("../models/article.js");

router.get("/scrape", function(req, res) {

	request("http://www.huffingtonpost.com/", function(error, response, html) {

		// console.log(html);
      		// console.log(result);

		var $ = cheerio.load(html);

		$("h2").each(function(i,element) {

			var result = {};

	  		result.title = $(this).children("a").text();
      		result.link = $(this).children("a").attr("href");
      		console.log(result);
      		var entry = new article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });

    });
  });

// Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});

// This will get the articles we scraped from the mongoDB
router.get("/articles", function(req, res) {
  
  article.find({}, function(error, doc) {

    if (error) {
      console.log(error);
    }
    
    else {
      res.render("articles", {articles:doc

      });
    }

  });

});

// Grab an article by it's ObjectId
router.get("/api/articles/:id", function(req, res) {

  article.findOne({ "_id": req.params.id })
  
  .populate("note")
  
  .exec(function(error, doc) {

    if (error) {
      console.log(error);
    }
    
    else {
      res.json(doc);
    }

  });

});

// Create a new note or replace an existing note
router.post("/articles/:id", function(req, res) {
// Create a new note and pass the req.body to the entry
	var newNote = new Note(req.body);

	// And save the new note the db
    newNote.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }

    else {
      // Use the article id to find and update it's note
      article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
     
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
        }
      });
    }
  });
});

module.exports = router;
