// Require file system module
var fs = require('fs');

// Module for file contents
var upperCaseFile = function(file) {
    var data = fs.readFileSync(file, 'utf-8');
    return data.toUpperCase();
};

// Module for words, letters, sentences, paragraphs
var upperCase = function(text) {
    return text.toUpperCase();
};

// Exporting modules
exports.upperCase = upperCase;
exports.upperCaseFile = upperCaseFile;