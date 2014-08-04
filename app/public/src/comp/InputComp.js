tt.Comp = cc.Class.extend({
    _cfg : null,
    _ele : null,
    init : function(cfg){
        var self = this;
        self._cfg = cfg;
        self._ele = self._createEle();
        self._bindEvents();
    },

    _bindEvents : function(){
    },

    _createEle : function(){
        return null;
    },

    getEle : function(){
        return this._ele;
    },

    _getPropName : function($input){
        var name = $input.attr("name");
        return $input.attr("prop") || name;
    },

    _getPropGetter : function($input){
        var widget = tt.selectedWidget;
        var prop = this._getPropName($input);
        return widget["get" + prop.substring(0, 1).toUpperCase() + prop.substring(1)];
    },
    _getPropSetter : function($input){
        var widget = tt.selectedWidget;
        var prop = this._getPropName($input);
        return widget["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)];
    },

    _setWidgetProp : function($input){
        var widget = tt.selectedWidget;
        var prop = this._getPropName($input);
        var func = widget["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)];
        var value = $input.val();
        var valueStr = value + "";
        if(valueStr.match(/^\d+$/)){
            value = parseInt(valueStr);
        }else if(valueStr.match(/^\d+\.\d*/)){
            value = parseFloat(valueStr);
        }else if(!value){
            if($input.hasClass("easyui-numberbox")) value = 0;
        }
        cc.log(prop, value);
        if(func){
            func.call(widget, value);
        }else{
            widget[prop] = value;
        }
    },

    _getWidgetProp : function($input){
        var widget = tt.selectedWidget;
        var prop = this._getPropName($input);
        var func = widget["get" + prop.substring(0, 1).toUpperCase() + prop.substring(1)];
        var value = widget[prop];
        if(func){
            value = func.call(widget);
        }
        $input.val(value);
        return value;
    },

    appendTo : function(parent){
        parent.append(this._ele);
    }
});

cc.addConst(tt.Comp, null, tt._baseConstFuncPrototype);


tt.InputComp = tt.Comp.extend({
    _createEle : function(){
        var self = this;
        var cfg = self._cfg;
        var propsStr = "";
        var props = cfg.props || {};
        for (var key in props) {
            var prop = props[key];
            propsStr += key + '="' + prop + '"'
        }
        var $input = $(cc.formatStr('<input name="%s" %s/>', cfg.name, propsStr));
        if(cfg.prop) $input.attr("prop", cfg.prop);
        var $span = $(cc.formatStr('<span><label>%s</label></span>', cfg.text));
        $span.append($input);
        return $span;
    },
    _bindEvents : function(){
        var self = this;
        var ele = self._ele;
        self._getWidgetProp(ele.find("input"));
        ele.bind('input propertychange', function() {
            var widget = tt.selectedWidget;
            if(!widget) return;
            var $input = $(this).find("input");
            self._setWidgetProp($input);
        });
    }
});