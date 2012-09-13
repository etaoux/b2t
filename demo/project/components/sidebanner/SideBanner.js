KISSY.add('node_modules/sidebanner/SideBanner', function(S, Brick){
    function SideBanner() {
        SideBanner.superclass.constructor.apply(this, arguments);
    }
    SideBanner.ATTRS = {
        name:'SideBanner'
    };

    SideBanner.METHOD = {
        initialize: function() {
             console.log('SideBanner init');
        }
    };

    SideBanner.ATTACH = {
    };

    S.extend(SideBanner, Brick);
    S.augment(SideBanner, SideBanner.METHOD);
    return SideBanner;
}, {
    requires: ["brix/core/brick","./SideBanner.css"]
});
