/**
 * Created by user on 03-08-2017.
 */
var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer2_project';

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds139761.mlab.com:39761/heroku_97xkgvvq'; // user yours
}
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/restaurant.service.server');
require('./services/critic.service.server');