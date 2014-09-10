tt.BorderNode = tt.RectNode.extend({
    __className : "tt_BorderNode",

    _selectedState : 0,//0：未选中，1：拖拽添加的控件时选中，2：点击时选中
    setSelectedState : function(state){
        this._selectedState = state;
    },
    _lbNode : null,
    init: function (parent, size) {
        this._super();
        size = size || parent.getContentSize();
        this.setContentSize(size);
    }
});
