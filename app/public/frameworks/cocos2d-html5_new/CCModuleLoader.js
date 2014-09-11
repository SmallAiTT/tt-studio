cc.moduleLoader = {
    _getJsListOfModule: function (moduleMap, moduleName, dir, jsAddedCache) {
        jsAddedCache = jsAddedCache || {};
        if (jsAddedCache[moduleName]) return [];//已经加载过了就直接返回空列表
        dir = dir || "";
        var jsList = [];
        var tempList = moduleMap[moduleName];
        if (tempList == null) throw "can not find module [" + moduleName + "]";
        var ccPath = cc.path;
        for (var i = 0, li = tempList.length; i < li; i++) {
            var item = tempList[i];
            if (jsAddedCache[item]) continue;
            var extname = ccPath.extname(item);
            if (!extname) {
                var arr = this._getJsListOfModule(moduleMap, item, dir, jsAddedCache);
                if (arr) jsList = jsList.concat(arr);
            } else if (extname.toLowerCase() == ".js") jsList.push(ccPath.join(dir, item));
            jsAddedCache[item] = 1;
        }
        return jsList;
    },
    getModuleJsList : function(moduleRoot, modules, cb){
        var self = this;
        //先获取到moduleConfig.json
        var moduleConfigPath = cc.path.join(moduleRoot, "moduleConfig.json");
        cc.loader.loadJson([moduleConfigPath], function(err, moduleConfig){
            if(err) return cb(err);
            var moduleMap = moduleConfig["module"];
            var resultList = [];
            modules = modules || ["default"];//确定需要加载的模块
            for(var i = 0, li = modules.length; i < li; ++i){
                resultList = resultList.concat(self._getJsListOfModule(moduleMap, modules[i], moduleRoot))
            }
            cb(null, resultList);
        });
    },
    getJsList : function(moduleCfgList, cb){
        var self = this;
        var tempList = [];
        for(var i = 0, li = moduleCfgList.length; i < li; ++i){
            var cfg = moduleCfgList[i];
            if(typeof cfg == "string"){
                tempList.push({moduleRoot:cfg});
            }else{
                for(var moduleRoot in cfg){
                    tempList.push({moduleRoot:moduleRoot, modules:cfg[moduleRoot]});
                }
            }
        }
        cc.async.map(tempList, function(value, index, cb1){
            self.getModuleJsList(value.moduleRoot, value.modules, cb1);
        }, function(err, results){
            if(err) return cb(err);

            var resultList = []
            for(var i = 0, li = results.length; i < li; ++i){
                resultList = resultList.concat(results[i]);
            }
            cb(null, resultList);
        });
    },

    load : function(moduleCfgList, cb){
        this.getJsList(moduleCfgList, function(err, jsList){
            if(err) return cb(err);
            cc.loader.loadJs(jsList, cb);
        });
    },

    loadWithImg : function(moduleCfgList, cb){
        this.getJsList(moduleCfgList, function(err, jsList){
            if(err) return cb(err);
            cc.loader.loadJsWithImg(jsList, cb);
        });
    }
}