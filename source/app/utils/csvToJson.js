const csv=require('csvtojson');
const file = 'gary-KFIN32.csv';
const csvFilePath='source/app/files/' + file;
console.log(csvFilePath);

module.exports = function () {
    var result;
    csv()
        .fromFile(csvFilePath)
        .on('end_parsed',(jsonObj)=>{
            console.log('end');
            result = jsonObj;
            console.log(jsonObj);
            console.log(result);
    });
    console.log(result);
    return result;

};



