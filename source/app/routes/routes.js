module.exports = function (io, app) {

    app.use(function(req, res){
        res.sendFile('index.html', {
            root : './source/public/'
        });
    });

};
