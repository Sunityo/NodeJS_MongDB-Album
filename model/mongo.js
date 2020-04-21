// calling mongoose library in
var mongoose    =   require("mongoose");
// making the connection to the mongodb server on port 27017
mongoose.connect('mongodb://localhost:27017/albumstore', {useMongoClient: true});
// making a schema for the dataset
// the format for the data
var mongoSchema =   mongoose.Schema;
// the album schema
// and what the data it requires to work
var albumSchema  = {

    albumInfo:{
        albumName : String,
        artistName : String
    },
    songs : Number,
    category : String,
    cover : String
};

// and export that will make a new collection called "albumlogins" in mongodb.
// this will contain the information,
module.exports = mongoose.model('albumLogin',albumSchema);

