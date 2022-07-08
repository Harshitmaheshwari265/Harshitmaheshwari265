const diacritics = require('../../../lib/core/diacritics');
//import fs from "fs"; 
var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;
var parser = new xml2js.Parser(/* options */);

exports.xmlToJSON = function (xmldata) {


    var xml = "<root>Hello xml2js!</root>"
    // return parseString(xmldata, function (err, result) {
    // 		return	JSON.stringify(result)
    // });

    return parser.parseStringPromise(xmldata).then(function (result) {
        return result
    })
        .catch(function (err) {
            // Failed
        });
    // parseString(xmldata, function (err, arr) {

    // // parsing to json
    // let data = JSON.stringify(arr)

    // // display the json data
    // return data;
    // });
}