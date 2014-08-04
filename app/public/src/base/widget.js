tt._widgetBaseApi = {
    _borderNode : null,
    _selectedState : 0,//0：未选中，1：拖拽添加的控件时选中，2：点击时选中
    onEnter : function(){
        if(this._super) this._super.apply(this, arguments);
        cc.eventManager.addListener(tt.createMouseEvent(), this);
    },
    onExit : function(){
        if(this._super) this._super.apply(this, arguments);
        cc.eventManager.removeListeners(cc.EventListener.MOUSE);
    },
    setSelectedState : function(state){
        var self = this;
        if(!self._borderNode) return;
        self._selectedState = state;
        switch (state){
            case self.SELECTED_STATE_NONE :
                self._borderNode.setVisible(false);
                break;
            case self.SELECTED_STATE_WHEN_ADD_WIDGET :
                self._borderNode.setVisible(true);
                break;
            case self.SELECTED_STATE_SELECTED :
                self._borderNode.setVisible(true);
                break;
        }
    },
    _initBorder : function(){
        this._borderNode = tt.BorderNode.create(this);
        this.addChild(this._borderNode);
    }
};
tt._widgetBaseApi_const = {
    SELECTED_STATE_NONE : 0,//未选中
    SELECTED_STATE_WHEN_ADD_WIDGET : 1,//拖拽添加的控件时选中
    SELECTED_STATE_SELECTED : 2//点击时选中
};

tt.dragState = 0;
tt._widgetOnMouseDown = null;
tt.widgetToAddClass = null;
tt._selectedWidgets = [];
tt._selectedWidget = null;
/** @expose */
tt.selectedWidget;
cc.defineGetterSetter(tt, "selectedWidget", function(){
    return tt._selectedWidget;
}, function(widget){
    tt._selectedWidgets.length = 0;
    if(tt._selectedWidget && tt._selectedWidget != widget){
        tt._selectedWidget.setSelectedState(tt._selectedWidget.SELECTED_STATE_NONE);
    }
    this._selectedWidget = widget;
    if(widget){
        widget.setSelectedState(widget.SELECTED_STATE_SELECTED);
    }
});

tt.createWidget = function(parent, pos){
    if(!tt.widgetToAddClass) return;
    var widget = tt.widgetToAddClass.create();
    parent.addChild(widget);
    widget.setPosition(pos);
    tt.selectedWidget = widget;
    tt.selectedWidgets = [widget];
    tt.widgetToAddClass = null
    tt.dragState = 0;
};
/**
 * 延时执行一个函数
 * @param delay 时间单位：秒
 * @param selector
 * @param target
 */
tt.delayTime = function(delay, selector, target){
    cc.director.getScheduler().scheduleCallbackForTarget(target, selector, 0, 0, delay, false);
};

/**
 * 下一帧延时执行一个函数
 * @param selector
 * @param target
 */
tt.nextTick = function(selector, target){
    tt.delayTime(0, selector, target);
};
/**
 * 循环执行一个函数
 * @param interval 时间单位：秒
 * @param selector
 * @param target
 */
tt.schedule = function(selector, target, interval){
    cc.director.getScheduler().scheduleCallbackForTarget(target, selector, interval, cc.REPEAT_FOREVER, 0, false);
};

tt.scheduleForEditor = function(){
    tt.schedule(function(){
        if(tt.dragState == 1){
            if(tt.upperWidget) {
                if(tt.oldUpperWidget){
                    var selectedWidget = tt.selectedWidget;
                    if(tt.oldUpperWidget != tt.upperWidget && (!selectedWidget || tt.oldUpperWidget != selectedWidget)) {
                        tt.oldUpperWidget.setSelectedState(tt.oldUpperWidget.SELECTED_STATE_NONE);
                    }
                }
                tt.upperWidget.setSelectedState(tt.upperWidget.SELECTED_STATE_WHEN_ADD_WIDGET);
                tt.oldUpperWidget = tt.upperWidget;
                tt.upperWidget = null;
            }
        }else if(tt.dragState == 2){
            if(tt.oldUpperWidget){
                tt.createWidget(tt.oldUpperWidget, tt.posForWidgetToAdd);
                tt.oldUpperWidget.setSelectedState(tt.oldUpperWidget.SELECTED_STATE_NONE);
            }
            tt.oldUpperWidget = null;
        }
        if(tt._widgetOnMouseDown) {
            tt.selectedWidget = tt._widgetOnMouseDown;
        }
    }, tt);
}


