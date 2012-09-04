KISSY.add('node_modules/footer/TMS_Footer', function(S, Brick){
    function TMS_Footer() {
        TMS_Footer.superclass.constructor.apply(this, arguments);
    }
    TMS_Footer.ATTRS = {
        name:'TMS_Footer'
    };

    TMS_Footer.METHOD = {
        initialize: function() {
             console.log('TMS_Footer init');
        }
    };

    TMS_Footer.ATTACH = {
    };

    S.extend(TMS_Footer, Brick);
    S.augment(TMS_Footer, TMS_Footer.METHOD);
    return TMS_Footer;
}, {
    requires: ["brix/core/brick","./TMS_Footer.css"]
});
