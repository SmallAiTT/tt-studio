tt.InputComp = tt.Comp.extend({
    __className : "TTInputComp",

    _createEle : function(){
        var self = this;
        var cfg = self._cfg;
        var propsStr = "";
        var props = cfg.props || {};
        for (var key in props) {
            var prop = props[key];
            propsStr += key + '="' + prop + '"'
        }
        var $input = $(cc.formatStr('<input oninput="function(){console.log(arguments)}" name="%s" %s/>', cfg.name, propsStr));
        var $span = $(cc.formatStr('<span><label>%s</label></span>', cfg.text));
        $span.append($input);
        return $span;
    },
    _bindEvents : function(){
        var self = this;
        var ele = self._ele;
        ele.find("input")[0]._comp = self;
        self._setInputValue(ele.find("input"));
        ele.on('input propertychange', function() {
            if(!tt.selectedWidget) return;
            self._setWidgetProp($(this).find("input"));
        });

    }
});