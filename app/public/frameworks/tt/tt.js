var tt = tt || {};

tt.clipRect = function(width, height, node){
    if(typeof width == "object"){
        node = height;
        height = width.height;
        width = width.width;
    }
    var stencil = cc.DrawNode.create();
//    stencil.drawRect(cc.p(-width/2, -height/2), cc.p(width/2, height/2));

    var triangle = [cc.p(-width/2, -height/2), cc.p(width/2, -height/2), cc.p(width/2, height/2), cc.p(-width/2, height/2)];

    var green = cc.color(0, 255, 0, 255);
    stencil.drawPoly(triangle, green, 3, green);

    var clipper = cc.ClippingNode.create(stencil);
    clipper.anchorX = 0.5;
    clipper.anchorY = 0.5;

    if(node) clipper.addChild(node);

    return clipper;
};

tt._baseConstFuncPrototype = {
    /**
     * 创建
     * @returns {}
     */
    create : function(){
        var Class = this;
        var obj = new Class();
        if(obj.init) obj.init.apply(obj, arguments);
        return obj;
    },

    /**
     * 获取单例
     * @returns {*|clazz|Session|A|Object|cc.Scene}
     */
    getInstance : function(){
        var Class = this;
        if(!Class._instance){
            var instance = Class._instance = Class.create.apply(Class, arguments);
            instance._isInstance = true;
            if(instance.retain) instance.retain();
        }
        return Class._instance;
    },

    /**
     * 释放单例
     */
    purgeInstance : function(){
        var Class = this;
        var instance = Class._instance;
        if(instance){
            if(instance.release) instance.release();
            if(instance.dtor) instance.dtor();
            Class._instance = null;
        }
    }
};
tt._baseNodePrototype = {

    //DataController类的事件注册存储
    _eventStoreForClass : null,
    isAutoDtor : true,//是否自动dtor，默认为ture

    dtor : function(){
        var self = this;
        var eventStoreForClass = self._eventStoreForClass
        if(eventStoreForClass){
            var l = eventStoreForClass.length;
            for(var i = l - 1; i >= 0; --i){
                var info = eventStoreForClass[i];
                info[0].unregisterByKey(info[1], info[2], self);
            }
            eventStoreForClass.length = 0;
        }
    },

    /**
     * 通过key进行对DataController类的事件注册
     * @param clazz
     * @param key
     * @param func
     */
    registerClassByKey : function(clazz, key, func){
        var self = this;
        var eventStoreForClass = self._eventStoreForClass = self._eventStoreForClass || [];
        for(var i = 0, li = eventStoreForClass.length; i < li; i++){
            var info = eventStoreForClass[i];
            if(clazz == info[0] && key == info[1] && func == info[2]) return;
        }
        eventStoreForClass.push([clazz, key, func]);
        clazz.registerByKey(key, func, self);
    },

    getFactory: function () {
        return this._factory;
    },

    setFactory: function (factory) {
        this._factory = factory;
    },

    getDelegate: function () {
        return this._delegate;
    },

    setDelegate: function (factory) {
        this._delegate = factory;
    },

    removeSelf: function () {
        this.removeFromParent(true);
        this._factory.reclaim(this);
    },

    canBeReclaimed: function () {
        return this._canBeReclaimed;
    },

    reset: function () {
        if(this._super) this._super();
    }
};

tt.isEventIn = function(event, locationInNode){
    var target = event.getCurrentTarget();
    locationInNode = locationInNode || target.convertToNodeSpace(event.getLocation());
    var s = target.getContentSize();
    var rect = cc.rect(0, 0, s.width, s.height);
    return cc.rectContainsPoint(rect, locationInNode);
}
