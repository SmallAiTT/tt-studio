tt.inputMgr = {
    _curWidget : null,
    _panelHtmlContentCache : {},
    _panelUrlMap : {
        "panel1" : "prop-panel/panel1.html"
    },
    _inputPanelRootId : "#compPanelRoot",

    inputGetterRegister : {
        "default" : function($input){
            var value = $input.val();
            var regExp4Float = /^\d+[\.]*\d*$/;
            if(regExp4Float.test(value)) value = new Number(value);
            return value;
        }
    },
    inputSetterRegister : {
        "default" : function($input, value){
            $input.val(value);
        }
    },
    inputOnChangedRegister : {
        "default" : function($input){
            $input.on('input propertychange', function() {
                var getter = $input.attr("tt-getter") || "default";
                var value = tt.inputMgr.getInputValue($input);
                var propName = $input.attr("name");
                tt.inputMgr.notifyPropFromInput(propName, value);
            });
        }
    },

    setInputValue : function($input, value){
        var setter = $input.attr("tt-setter") || "default";
        this.inputSetterRegister[setter]($input, value);
    },

    getInputValue : function($input){
        var getter = $input.attr("tt-getter") || "default";
        return this.inputGetterRegister[getter]($input);
    },

    notifyPropFromInput : function(propName, value){
        tt.selectedWidget.setProp(propName, value);
    },
    notifyPropFromWidget : function(propName, value){
        var self = this;
        var $input = self._inputMap[propName];
        if(!$input)
            return cc.warn("未找到名为【%s】的输入框", propName);

        self.setInputValue($input, value);
    },
    preload : function(cb){
        var self = this;
        cc.async.map(self._panelUrlMap, function(value, key, cb1){
            cc.loader.loadTxt(cc.path.join("frameworks/tt", value), function(err, html){
                if(err) return cb1(err);
                self._panelHtmlContentCache[key] = html;
                cb1(err, html);
            });
        }, cb);
    },
    resetPanels : function(panelNames, widget){
        var self = this;
        if(self._curWidget == widget) return;
        var arr = [];
        for(var i = 0; i < panelNames.length; ++i){
            arr.push(self._panelHtmlContentCache[panelNames[i]]);
        }
        var htmlStr = arr.join("\r\n");
        $(self._inputPanelRootId).html(htmlStr);
        self._inputMap = {};
        $(".tt-prop-input").each(function(index, input){
            var $input = $(input);
            var name = $input.attr("name");
            if(!name)
                return cc.warn("input为配置name属性，请检查！", input);

            tt.inputMgr._inputMap[name] = $input;

            var onChanged = $input.attr("tt-onChanged") || "default";
            tt.inputMgr.inputOnChangedRegister[onChanged]($input);
        });
        self._curWidget = widget;
        self.resetInputValues(widget);
    },
    resetInputValues : function(widget){
        var self = this;
        var inputMap = self._inputMap;
        for (var propName in inputMap) {
            var $input = inputMap[propName];
            self.setInputValue($input, widget[propName]);
        }
    }
};
