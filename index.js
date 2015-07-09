var Promise = require('bluebird');
var path = require('path');

var all = [];

//git
var gitRev = require('git-rev');
all.push(new Promise(function(resolve) {
	gitRev.short(resolve);
}));

//heroku
var fs = Promise.promisifyAll(require("fs"));
var fileLoc = path.join(process.cwd(), '.source_version');
all.push(fs.readFileAsync(fileLoc).then(function(data) {
	return data.toString().substring(0, 8);
}).catch(function(err) {}));

//combined
var version = Promise.all(all).then(function(versions) {
	for (var i = 0; i < versions.length; i++) {
		var version = versions[i];
		if (version) {
			return version;
		}
	}
});

module.exports = function(req, res, next) {
	version.then(function(sourceVersion) {
		res.locals.sourceVersion = sourceVersion;
	}).nodeify(next);
};