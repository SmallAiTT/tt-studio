
$(".tt-color").colpick({
    layout:'hex',
    colorScheme:'dark',
    onShow : function(){
        $(this).colpickSetColor(this.value);
    },
    onHide : function(){
    },
    onChange:function(hsb,hex,rgb,el,bySetColor) {
        var $input = $(el);
        $input.val("#" + hex);
        $input[0]._comp._setWidgetProp($input);
    },
    onSubmit : function(hsb,hex,rgb,el){
        var $input = $(el);
        $input.val("#" + hex);
        $input[0]._comp._setWidgetProp($input);
    },
    onRestoreOriginal : function(hsb,hex,rgb,el){
        var $input = $(el);
        $input.val("#" + hex);
        $input[0]._comp._setWidgetProp($input);
    }
});