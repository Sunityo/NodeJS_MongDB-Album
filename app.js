// calling the libraries in
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./model/mongo.js");
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

// the home page of the url
router.get("/", function (req, res) {
    //res.json({"error" : false,"message" : "Hello this is a test"});
    res.write('<h1>Welcome to album API by Sunny</h1>');
    res.write('<p1><a href=http://localhost:3000/api/album>View all albums on the dataset</p1>');
    res.end();
});

// Routes
// the route to get information at /album
// this will show all the data on the mongodb
router.route("/api/album")
    .get(function (req, res) {
        // req = request, res = response
        var response = {};
        mongoOp.find({}, function (err, data) {
            // data will be the data that get entered
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
                // a message to say if the fetch failed
            } else {
                response = {"error": false, "message": data};
                // a message to say if th fetch was successful and no errors happened
            }
            res.json(response);
        });
    })
    .post(function (req, res) {
        // to add new records into the mongodb
        var db = new mongoOp();
        var response = {};
        db.albumInfo = req.body.albumInfo;
        db.songs = req.body.songs;
        db.category = req.body.category;
        db.cover = req.body.cover;
        //the db information it will need in the body area on postman
        db.save(function (err) {
            // the way it will save the new data on to the mongodb
            if (err) {
                response = {"error": true, "message": "Error adding data"};
                // a message to say if the data failed to be added
            } else {
                response = {"error": false, "message": "Data added"};
                // a message to say if the data was added
            }
            res.json(response);
        });
    });

// a route to get certain records in the data by using the id of the record
// also the put and delete method works by this way, so you can update a new record
// by using its id and updating the information
// you can use the id and delete the data from the mongodb
router.route("/api/album/:id")
// the route in the url to get to it. the ":id" part is where the record id goes
    .get(function (req, res) {
        var response = {};
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    })
    .put(function (req, res) {
        var response = {};
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                if (req.body.albumInfo !== undefined) {
                    data.albumInfo = req.body.albumInfo;
                }
                if (req.body.songs !== undefined) {
                    data.songs = req.body.songs;
                }
                if (req.body.category !== undefined) {
                    data.category = req.body.category;
                }
                if (req.body.cover !== undefined) {
                    data.cover = req.body.cover;
                }
                data.save(function (err) {
                    if (err) {
                        response = {"error": true, "message": "Error updating data"};
                    } else {
                        response = {"error": false, "message": "Data is updated for " + req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function (req, res) {
        var response = {};
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                mongoOp.remove({_id: req.params.id}, function (err) {
                    if (err) {
                        response = {"error": true, "message": "Error deleting data"};
                    } else {
                        response = {"error": true, "message": "Data associated with " + req.params.id + "is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })


app.use('/', router);

// runs on port 3000
app.listen(3000);
// a message to say it is running
console.log("Listening to PORT 3000");