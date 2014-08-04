tt.Widget = cc.Node.extend({

    _dataCtrlMap : {},
    init : function(){
        this._super();
    },

    createComp : function(){
        return;
    }
});

tt.Widget.create = function(){
    var self = this;
    var obj = new self();
    obj.init.apply(obj, arguments);
    return obj;
};

var panelCfgs = [{
    name : "panel1",
    txt : "属性面板1",
    rows : [{
        name : "posX",
        txt : "x:",
        clazz : "InputComp"
    }]
}]

tt.bindComp = function(widgetClass, panelCfgs, operOpt){
    widgetClass.__panelCfgs = panelCfgs;
    widgetClass.__operOpt = operOpt;
};
tt.bindComp(tt.Widget, panelCfgs, {
    "panel1.posX" : {
        init : function(widget, comp){
            comp.value = widget.x;
        },
        changed : function(widget, comp){
            widget.x = comp.value;
        }
    }
});