/**
 * Created by user on 03-08-2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username:{type: String,unique:true},
    password:{type: String},
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    role:{type: String,default:'User',enum:['Admin','User']},
    rateAndReviewRestaurant:[
        {
            restId: {type: String},
            rating: {type: Number},
            review:{type:String},
            restName:{type:String}
        }
    ],
    facebook: {
        id:    String,
        token: String
    },
    follows: [String],
    following: [String],
    favorites : [String]
},{collection: "rest_user"});

module.exports = userSchema;