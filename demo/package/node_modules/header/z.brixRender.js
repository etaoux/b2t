KISSY.ready(function(S){
  KISSY.use('brix/core/pagelet', function(S, Pagelet){
        var pagelet = new Pagelet({
            tmpl: 'body'
        });
    
        pagelet.addBehavior();
        pagelet.ready(function(){
            pagelet.render();
        });
    });  
});

