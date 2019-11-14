export { getOsisList, formatQueryToOsis }; 
var bcv_parser = require("bible-passage-reference-parser/js/full_bcv_parser").bcv_parser;
var bcv = new bcv_parser();

function getOsisList(s) {
    return s.split(',').map((s) => s.trim()).filter((s) => s !== '');
}

function formatQueryToOsis(s) {
    bcv.parse(s);
    return bcv.osis();
}
