
tt.ImgWidget = cc.Sprite.extend(tt._baseNodePrototype, tt._widgetBaseApi, {
    __className : "TTImgWidget",

    init : function(){
        this._super("grossini.png");
        this._initBorder();
    }
});
cc.addConst(tt.ImgWidget, tt._widgetBaseApi_const, tt._baseConstFuncPrototype);