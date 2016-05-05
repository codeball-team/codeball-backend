const rimraf = require('rimraf');
const fs = require('fs');

const dir = '../build';

rimraf(dir, function (err) {
	if (err) {
		throw err;
	}

	if (process.argv.indexOf("createdir") >= 0) {
		fs.mkdirSync(dir);
	}
});
