cc.log = function(){
    console.log.apply(console, arguments);
};
cc.warn = function(){
    console.warn.apply(console, arguments);
};
cc.error = function(){
    console.error.apply(console, arguments);
};
/**
 * 格式化参数成String。
 * 参数和h5的console.log保持一致。
 * @returns {*}
 */
cc.formatStr = function(){
    var args = arguments;
    var l = args.length;
    if(l < 1){
        return "";
    }
    var str = args[0];
    var needToFormat = true;
    if(typeof str == "object"){
        str = JSON.stringify(str);
        needToFormat = false;
    }
    for(var i = 1; i < l; ++i){
        var arg = args[i];
        arg = typeof arg == "object" ? JSON.stringify(arg) : arg;
        if(needToFormat){
            while(true){
                var result = null;
                if(typeof arg == "number"){
                    result = str.match(/(%d)|(%s)/);
                    if(result){
                        str = str.replace(/(%d)|(%s)/, arg);
                        break;
                    }
                }
                result = str.match(/%s/);
                if(result){
                    str = str.replace(/%s/, arg);
                }else{
                    str += "    " + arg;
                }
                break;
            }
        }else{
            str += "    " + arg;
        }
    }
    return str;
};