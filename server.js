// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Event      = require('./app/models/event');
var Session    = require('./app/models/session');
var schema     = require('./app/models/event.schema.js')

var Joi = require('joi');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

mongoose.connect('mongodb://localhost:27017/innovationDB'); // connect to our datab

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// on routes that end in /events
// ----------------------------------------------------
router.route('/events')
    // create a bear (accessed at POST http://localhost:8080/api/events)
    .post(function(req, res) {
        
    	var eventsArray = req.body
	    console.log(eventsArray);

	    for (var index in eventsArray){
	    	console.log(index);
	        var event = new Event();      // create a new instance of the Event model
    	    event.name = eventsArray[index].name
    	    console.log(event);

	        // save the bear and check for errors
	        event.save(function(err) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'Event created!' });
	        });     
	    }
    })

    // get all the bears (accessed at GET http://localhost:8080/api/events)
    .get(function(req, res) {
        Event.find(function(err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });
// =============================================================================
router.route('/event')
    // create a bear (accessed at POST http://localhost:8080/api/event)
    .post(function(req, res) {
        
      var eventJSON = req.body
      
      var err = Joi.validate(eventJSON, schema.check);
      if (err.error) {
        console.log(err.error);
        res.send(err.error);
        return
      } else {
        console.log('Hemos pasado la validacion');
      }

      var event = new Event();      // create a new instance of the Event model
      event.name = eventJSON.name
      console.log(event);

      // save the event and check for errors
      event.save(function(err) {
        if (err)
          res.send(err);

      res.json(event);
      });
    });

// =============================================================================
router.route('/session/:session_id/init')
   	.post(function(req,res) {

    var session = new Session();

    session.app.name = req.body.app.name
    session.app.version = req.body.app.version

    session.device.name = req.body.device.name
    session.device.resolution.width = req.body.device.resolution.width
    session.device.resolution.height = req.body.device.resolution.height
    session.device.ip =  req.body.device.ip
    session.device.uuid =  req.body.device.uuid

		session.os.platform = req.body.os.type
		session.os.version = req.body.os.version

		console.log(session);

		// save the bear and check for errors
        session.save(function(err) {
            if (err)
                res.send(err);

            res.json({ session });
        });
   	});

// =============================================================================
router.route('/sessions')
    // get all the bears (accessed at GET http://localhost:8080/api/events)
    .get(function(req, res) {
        Session.find(function(err, sessions) {
            if (err)
                res.send(err);

            res.json(sessions);
        });
    });


// REGISTER OUR ROUTES -------------------------------
// =============================================================================
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(8080);
console.log('Magic happens on port ' + port);

// =============================================================================
// function createEvent(eventJSON) {

//     console.log('entre en el metodo!!!!');

//     var event = new Event();      // create a new instance of the Event model
//     event.name = eventJSON.name
//     console.log(event);

//     // save the event and check for errors
//     event.save(function(err) {
//       return event, err
//     });  
// }
