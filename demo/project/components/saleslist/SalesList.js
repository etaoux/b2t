KISSY.add('node_modules/saleslist/SalesList', function(S, Brick){
    function SalesList() {
        SalesList.superclass.constructor.apply(this, arguments);
    }
    SalesList.ATTRS = {
        name:'SalesList'
    };

    SalesList.METHOD = {
        initialize: function() {
             console.log('SalesList init');
        }
    };

    SalesList.ATTACH = {
    };

    S.extend(SalesList, Brick);
    S.augment(SalesList, SalesList.METHOD);
    return SalesList;
}, {
    requires: ["brix/core/brick","./SalesList.css"]
});
