tt.RectNode = cc.NodeRGBA.extend({
    __className : "TTCircleNode",

    ctor : function(){
        this._super();
    },
    init : function(){
        if(this._super) this._super.apply(this, arguments);
        this.setContentSize(10, 10);
        this.setColor(cc.color(255, 0, 0, 255));
    },

    draw : function(ctx){
        this._super(ctx);
        var drawingUtil = cc._drawingUtil;
        drawingUtil.setLineWidth(1);
        var color = this.getColor();
        drawingUtil.setDrawColor(color.r, color.g, color.b, color.a);
        var size = this.getContentSize();
        drawingUtil.drawRect(cc.p(1, 1), cc.p(size.width, size.height));
    },

    onDragBegan : function(){},
    onDragEnded : function(){}

});
cc.addConst(tt.RectNode, null, tt._baseConstFuncPrototype);