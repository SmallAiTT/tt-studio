cc.game.onStart = function(){
    cc.loader.resPath = "res";

    tt.inputMgr.preload(function(){
    });

    cc.loader.load(["grossini.png"], function(){
        var scene = new cc.Scene();
        var world2d = tt.World2d.create(cc.color(100, 200, 100));
        scene.addChild(world2d);
        cc.director.runScene(scene);


        $('.dragitem').draggable({
            revert:true,
            deltaX:0,
            deltaY:0,
            proxy:function(source){
                var $dragItem = $(source);
                tt.dragState = 1;//正在拖拽
                tt.widgetToAddClass = eval("(" + $dragItem.attr("widget") + ")");
                var n = $('<div style="pointer-events: none;" class="proxy"></div>');
                n.html($dragItem.html()).appendTo('body');
                return n;
            }
        });

        $('#gameCanvas').droppable({
            accept:'.dragitem',
            onDragEnter:function(e,source){
                //$(this).html('enter');
            },
            onDragLeave: function(e,source){
                //$(this).html('leave');
            },
            onDrop: function(e,source){
                //$(this).html($(source).html() + ' dropped');
            }
        });
        tt.scheduleForEditor();
    });

};
cc.game.run();
