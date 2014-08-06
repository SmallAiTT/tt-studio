tt.Comp = cc.Class.extend({
    __className : "TTComp",

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

    _getWidgetProp : function($input, widget){//获得widget的属性值
        var valueGetter = $input.attr("propGetter");
        if(valueGetter) {
            valueGetter = eval('(' + valueGetter + ')');
            if(valueGetter) return valueGetter.apply(null, arguments);
        }
        widget = widget || tt.selectedWidget;
        var prop = this._getPropName($input);
        var func = widget["get" + prop.substring(0, 1).toUpperCase() + prop.substring(1)];
        var value = widget[prop];
        if(func){
            value = func.call(widget);
        }
        return value;
    },
    _getInputValue : function($input, widget){//获得输入框的值
        var valueGetter = $input.attr("valueGetter");
        if(valueGetter) {
            valueGetter = eval('(' + valueGetter + ')');
            if(valueGetter) return valueGetter.apply(null, arguments);
        }
        var value = $input.val();
        var valueStr = value + "";
        if(valueStr.match(/^\d+$/)){//如果是整数
            value = parseInt(valueStr);
        }else if(valueStr.match(/^\d+\.\d*/)){//如果是浮点数
            value = parseFloat(valueStr);
            value = Math.round(value * 100) / 100;//保留小数点后两位
        }else if(!value){
            if($input.hasClass("easyui-numberbox")) value = 0;
        }
        return value;
    },

    _setWidgetProp : function($input, widget){
        var widget = widget || tt.selectedWidget;
        var prop = this._getPropName($input);
        var func = widget["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)];
        var value = this._getInputValue($input, widget);
        if(func){
            func.call(widget, value);
        }else{
            widget[prop] = value;
        }
    },

    _setInputValue : function($input, widget){
        widget = widget || tt.selectedWidget;
        var value = this._getWidgetProp($input, widget);
        $input.val(value);
        return value;
    },

    appendTo : function(parent){
        parent.append(this._ele);
    }
});

cc.addConst(tt.Comp, null, tt._baseConstFuncPrototype);