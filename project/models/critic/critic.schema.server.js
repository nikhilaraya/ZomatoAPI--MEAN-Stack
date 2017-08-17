/**
 * Created by user on 17-08-2017.
 */
var mongoose = require('mongoose');

var criticSchema = mongoose.Schema({
    userId : {type:String},
    username : {type: String},
    restName : {type: String},
    finding : {type: String}
},{collection: "critic"});

module.exports = criticSchema;
