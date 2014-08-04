
tt.createMouseEvent = function(){
    var listener = cc.EventListener.create({
        event: cc.EventListener.MOUSE,
        onMouseDown: function(event){tt._widgetOnMouseDown
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(event.getLocation());
            if (tt.isEventIn(event, locationInNode)) {
                if(tt._widgetOnMouseDown){
                    if(target.isZUpperInWorld(tt._widgetOnMouseDown)) {
                        tt._widgetOnMouseDown = target;
                        tt._widgetOnMouseDownLoc = tt._widgetOnMouseDown.convertToNodeSpace(event.getLocation());
                    }
                }else{
                    tt._widgetOnMouseDown = target;
                    tt._widgetOnMouseDownLoc = tt._widgetOnMouseDown.convertToNodeSpace(event.getLocation());
                }
            }
        },
        onMouseMove: function(event){
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(event.getLocation());
            if(tt.dragState == 1){
                if (tt.isEventIn(event, locationInNode)) {
                    if(tt.upperWidget){
                        if(target.isZUpperInWorld(tt.upperWidget)) tt.upperWidget = target;
                    }else{
                        tt.upperWidget = target;
                    }
                }
            }
            var widgetOnMouseDown = tt._widgetOnMouseDown
            if(widgetOnMouseDown){
                var parent = widgetOnMouseDown.parent;
                if(parent == target){
                    var loc = tt._widgetOnMouseDownLoc;
                    var size = widgetOnMouseDown.getContentSize();
                    var newPos = cc.p(locationInNode.x + ((size.width/2) - loc.x), locationInNode.y + ((size.height/2) - loc.y))
                    widgetOnMouseDown.setPosition(newPos);
                }
            }
        },
        onMouseUp: function(event){
            tt._widgetOnMouseDown = null;
            if(tt.dragState == 1){
                var target = event.getCurrentTarget();
                if(target == tt.oldUpperWidget){
                    tt.posForWidgetToAdd = target.convertToNodeSpace(event.getLocation());
                    tt.dragState = 2;
                }
            }
        }
    });
    return listener;
};