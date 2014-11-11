var _ = require('lodash');
var graphite = require('graphite');
var WebScale = require('webscale');
var config = require('../config');

var graphiteClient = graphite.createClient("plaintext://"+config.graphiteHost);
var webScale = new WebScale();

webScale.on('change:weight', function(ounces){
    console.log(ounces + ' ounces');

    var metricsObject = {};
    metricsObject[config.graphiteKey] = { weight: ounces };

    graphiteClient.write(metricsObject, function(err){
	if(err != null){
	    console.warn("failed to write metrics to graphite", err);
	}
    });
});
