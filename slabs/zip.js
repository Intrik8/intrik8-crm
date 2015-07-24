var zlib = require('zlib');

var gzip = zlib.createGzip();
var fs = require('fs');
var inp = fs.createReadStream('./customer/models/customer.js');
var out = fs.createWriteStream('/tmp/customer.gz');

inp.pipe(gzip).pipe(out);
