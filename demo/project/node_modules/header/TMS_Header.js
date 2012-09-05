KISSY.add('node_modules/header/TMS_Header', function(S, Brick){
    function TMS_Header() {
        TMS_Header.superclass.constructor.apply(this, arguments);
    }
    TMS_Header.ATTRS = {
        name:'TMS_Header'
    };

    TMS_Header.METHOD = {
        initialize: function() {
             console.log('TMS_Header init');
        }
    };

    TMS_Header.ATTACH = {
    };

    S.extend(TMS_Header, Brick);
    S.augment(TMS_Header, TMS_Header.METHOD);
    return TMS_Header;
}, {
    requires: ["brix/core/brick","./TMS_Header.css"]
});
