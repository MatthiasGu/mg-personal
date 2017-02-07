var csvFile = require('../utils/csvToJson.js');
const csv=require('csvtojson');
const file = 'gary-KFIN32.csv';
const csvFilePath='source/app/files/' + file;
module.exports = function (io, app) {


    app.get('/csv', function (req, res) {
        csv()
            .fromFile(csvFilePath)
            .on('end_parsed',(jsonObj)=>{
            console.log('end');
            res.send(jsonObj);
        });
    });

    app.use(function(req, res){
        res.sendFile('index.html', {
            root : './source/public/'
        });
    });

};
