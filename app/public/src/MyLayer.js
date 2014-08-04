tt.MyLayer = cc.Layer.extend({
    __className : "tt_MyLayer",

    ctor : function(){
        this._super();
        cc.log("FFF")
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                var pos = event.getLocation(), target = event.getCurrentTarget();
                if(event.getButton() === cc.EventMouse.BUTTON_RIGHT)
                    cc.log("onRightMouseDown at: " + pos.x + " " + pos.y );
                else if(event.getButton() === cc.EventMouse.BUTTON_LEFT)
                    cc.log("onLeftMouseDown at: " + pos.x + " " + pos.y );
            },
            onMouseMove: function(event){
                var pos = event.getLocation(), target = event.getCurrentTarget();
                cc.log("onMouseMove at: " + pos.x + " " + pos.y );
            },
            onMouseUp: function(event){
                var pos = event.getLocation(), target = event.getCurrentTarget();
                cc.log("onMouseUp at: " + pos.x + " " + pos.y );
            }
        }, this);
    }
});