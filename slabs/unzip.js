var Archiver = require('archiver');

Archiver.openArchive('/tmp/test.zip', function(err, zip) {
    zip.extractTo('/tmp/', function(err) {
        if (err) {
            throw err;
        }

        // Success!
    });
});
