let mongoose = require('mongoose'),
    SensorMessageEvent = require('../db/model/SensorMessageEvent'),
    Asset = require('../db/model/Asset');

//Check the connection and return a promise 
var conn = new Promise(function (resolve, reject) {
    if (mongoose.Connection.STATES.connected !== mongoose.connection.readyState) {
        mongoose.connect('mongodb://razrlab:gameofthrones@ds060009.mlab.com:60009/communicationdb', function (err) {
            resolve();
        });
    } else {
        resolve();
    }
});

//Given that a promise is return, transact and save
conn.then(() => {
    //save sensor event
    SensorMessageEvent
        .find({ eventType:'Short GPS'})
        .populate('_asset') // only return the Persons name
        .exec(function (err, story) {
            if (err) return handleError(err);
            console.log(story);
        })
});


//Check the connection and return a promise 
var conn = new Promise(function (resolve, reject) {
    if (mongoose.Connection.STATES.connected !== mongoose.connection.readyState) {
        mongoose.connect('mongodb://razrlab:gameofthrones@ds060009.mlab.com:60009/communicationdb', function (err) {
            resolve();
        });
    } else {
        resolve();
    }
});

//Given that a promise is return, transact and save
conn.then(() => {
    //save sensor event
    Asset
        .findOne({ assetName:'Asset 123'})
        .populate('events') // only return the Persons name
        .exec(function (err, story) {
            if (err) return handleError(err);
            console.log(story);
        })
});