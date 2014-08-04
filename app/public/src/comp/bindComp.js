tt._compPanelsMap = {};
tt.bindCompPanels = function(widgetClass, panels){
    tt._compPanelsMap[widgetClass.__className] = panels;
}
tt._compPanelsForImg = [{
    name : "panel1",
    text : "属性面板1",
    rows : [
        { name : "x", text : "x:", clazz : "tt.InputComp", props : {"class" : "easyui-numberbox"} },
        { name : "y", text : "y:", clazz : "tt.InputComp", props : {"class" : "easyui-numberbox"} },
        { name : "scaleX", text : "scaleX:", clazz : "tt.InputComp", props : {"class" : "easyui-numberbox"} },
        { name : "scaleY", text : "scaleY:", clazz : "tt.InputComp", props : {"class" : "easyui-numberbox"} },
    ]
}]

tt.bindCompPanels(tt.ImgWidget, tt._compPanelsForImg);
tt.createCompPanel = function(cfg){
    var temp = '<div><div class="tt-panel-title" name="%s">%s</div></div>';
    var $container = $('<div class="tt-panel-container"></div>');
    var $div = $(cc.formatStr(temp, cfg.name, cfg.text));
    $div.append($container);
    var rows = cfg.rows;
    for(var i = 0, li = rows.length; i < li; i++){
        var itemi = rows[i];
        var Class = eval('(' + itemi.clazz + ')');
        var $row = $("<div></div>");
        $container.append($row);
        var comp = Class.create(itemi);
        $row.append(comp.getEle());
    }
    return $div;
};

tt.createCompPanels = function(widget){
    var cfgs = tt._compPanelsMap[widget.__className];
    if(!cfgs) return;
    var $compPanelRoot = $("#compPanelRoot");
    $compPanelRoot.html("");
    for(var i = 0, li = cfgs.length; i < li; i++){
        $compPanelRoot.append(tt.createCompPanel(cfgs[i]));
    }
}