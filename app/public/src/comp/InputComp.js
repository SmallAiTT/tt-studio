tt.Comp = cc.Class.extend({
    _cfg : null,
    _ele : null,
    ctor : function(cfg){
        var self = this;
        self._cfg = cfg;
        self._ele = self.createEle();
    },

    createEle : function(){
        return null;
    },

    getEle : function(){
        return this._ele;
    },

    appendTo : function(parent){
        parent.append(this._ele);
    }
});

cc.addConst(tt.Comp, null, {
});


tt.InputComp = tt.Comp.extend({
    createEle : function(){
        var cfg = this._cfg;
        return $(cc.formatStr('<div>%s<input name="%s"></div>', cfg.txt, cfg.name));
    }
});