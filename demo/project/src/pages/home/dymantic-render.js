KISSY.ready(function(S){

    KISSY.use('node,sizzle', function(S,node){

        var $ = node.all,
            prefix = '../../../node_modules/',
            suffix = '/src/template.mustache',
            tmpl1,tmpl2,tmpl3,tmpl4,tmpl5;

            $('div[bx-name=TMS_Header]').attr("bx-config","{tmpl:'#header_tmpl'}");
            $('div[bx-name=SalesList]').attr("bx-config","{tmpl:'#saleslist_tmpl',data:saleslist_data}");
            $('div[bx-name=CatBanner]').attr("bx-config","{tmpl:'#catbanner_tmpl'}");
            $('div[bx-name=SideBanner]').attr("bx-config","{tmpl:'#sidebanner_tmpl'}");
            $('div[bx-name=TMS_Footer]').attr("bx-config","{tmpl:'#footer_tmpl'}");

        S.getScript('saleslist_data.js');

        S.io.get(prefix + 'header' + suffix, function(data){
            if(data){
                tmpl1 = '<script type="text/template" id="header_tmpl">' + data + '</script>';
            }
        });
    
        S.io.get(prefix + 'saleslist' + suffix, function(data){
            if(data){
                tmpl2 = '<script type="text/template" id="saleslist_tmpl">' + data + '</script>';
            }
        });
    
        S.io.get(prefix + 'catbanner' + suffix, function(data){
            if(data){
                tmpl3 = '<script type="text/template" id="catbanner_tmpl">' + data + '</script>';
            }
        });
    
        S.io.get(prefix + 'sidebanner' + suffix, function(data){
            if(data){
                tmpl4 = '<script type="text/template" id="sidebanner_tmpl">' + data + '</script>';
            }
        });
    
        S.io.get(prefix + 'footer' + suffix, function(data){
            if(data){
                tmpl5 = '<script type="text/template" id="footer_tmpl">' + data + '</script>';
            }
        });
    
        var i = setInterval(function(){

            if(tmpl1&&tmpl2&&tmpl3&&tmpl4&&tmpl5){

                $('body').append(tmpl1+tmpl2+tmpl3+tmpl4+tmpl5);

                KISSY.use('brix/core/pagelet', function(S, Pagelet){
                    var pagelet = new Pagelet({
                        tmpl: 'body'
                    });

                    pagelet.addBehavior();
                    pagelet.ready(function(){
                        pagelet.render();
                    });
                    clearInterval(i);
                }); 

            }

        },50);

    });
});

