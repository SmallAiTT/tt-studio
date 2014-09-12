var async = require("async");
var isCc = true;
if(isCc) async = require("./cc-async");

function asyncFunc(interval, name, cb){
    console.log("----------%s start-------------", name);
    setTimeout(function(){
        console.log("----------%s end-------------", name);
        cb();
    }, interval)
}
var cb = function(err, results){
    if(err) return console.error(err);
    console.log("results--->", results);
}

function series(){
    async.series([
        function(cb1){
            asyncFunc(1500, "t1", function(){
                cb1(null, "t1-obj")
            });
        },
        function(cb1){
            asyncFunc(1000, "t2", function(){
                cb1(null, "t2-obj")
            });
        }
    ], cb);
}

function parallel(){
    async.parallel([
        function(cb1){
            asyncFunc(1500, "t1", function(){
                cb1(null, "t1-obj")
            });
        },
        function(cb1){
            asyncFunc(1000, "t2", function(){
                cb1(null, "t2-obj")
            });
        }
    ], cb);
}

function map(){
    var arr = ["t1", "t2"]
    async.map(arr, function(value, index, cb1){
        if(!isCc) cb1 = index;
        asyncFunc(1000, value, function(){
            cb1(null, value + "-obj")
        });
    }, cb)
}
function mapLimit(){
    var arr = ["t1", "t2"]
    async.mapLimit(arr, 1, function(value, index, cb1){
        if(!isCc) cb1 = index;
        asyncFunc(1000, value, function(){
            cb1(null, value + "-obj")
        });
    }, cb)
}

function waterfall(){
    async.waterfall([
        function(cb1){
            asyncFunc(1000, "t1", function(){
                cb1(null, "t1-obj", "FFF")
            });
        },
        function(arg, arg2, cb1){
            console.log(arg, arg2);
            asyncFunc(1000, "t2", function(){
                cb1(null, "t2-obj", "DDD");
            });
        }
    ], function(err, arg1, arg2){
        if(err) return console.wrror(err);
        console.log(arg1, arg2);
    });
}


//series();
//parallel();
//map();
mapLimit();
//waterfall();