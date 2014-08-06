tt.ColorComp = tt.InputComp.extend({
    __className : "TTColorComp",

    _getWidgetProp : function($input, widget){
        var self = this;
        var prop = self._super.apply(self, arguments);
        return cc.colorToHex(prop)
    },
    _getInputValue : function($input, widget){
        var self = this;
        var value = self._super.apply(self, arguments);
        return cc.hexToColor(value)
    }
});