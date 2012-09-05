var http = require('http'),
    fs = require('fs'),
    jsdom = require('jsdom'),
    prefix = '../../../node_modules/',
    suffix = '/src/template.mustache',
    config = '<script>KISSY.config({packages: [{name: "node_modules",tag: "20120419",path: "./b2tDemo/demo/package"}]});</script>',
    render = '<script src="http://loc.etao.com/b2tDemo/demo/package/src/pages/home/z.brixRender.js"></script>',
    tmpl1,tmpl2,tmpl3,tmpl4,tmpl5;

    fs.readFile(prefix+'header'+ suffix, function(err,data){
        if(err){
            throw err;
        }
        tmpl1 = '<script type="text/template" id="header_tmpl">' + data + '</script>';
    });

    fs.readFile(prefix+'saleslist'+ suffix, function(err,data){
        if(err){
            throw err;
        }
        tmpl2 = '<script type="text/template" id="saleslist_tmpl">' + data + '</script>';
    });

    fs.readFile(prefix+'catbanner'+ suffix, function(err,data){
        if(err){
            throw err;
        }
        tmpl3 = '<script type="text/template" id="catbanner_tmpl">' + data + '</script>';
    });

    fs.readFile(prefix+'sidebanner'+ suffix, function(err,data){
        if(err){
            throw err;
        }
        tmpl4 = '<script type="text/template" id="sidebanner_tmpl">' + data + '</script>';
    });

    fs.readFile(prefix+'footer'+ suffix, function(err,data){
        if(err){
            throw err;
        }
        tmpl5 = '<script type="text/template" id="footer_tmpl">' + data + '</script>';
    });

    var scriptList = [
                        'http://loc.etao.com/b2t/demo/package/src/pages/home/static-config.js',
                        'http://loc.etao.com/b2t/demo/package/src/pages/home/saleslist_data.js',
                        'http://loc.etao.com/b2t/demo/package/src/pages/home/z.brixRender.js',
                        'http://loc.etao.com/b2t/demo/package/src/pages/home/jquery-1.8.0.js'
                     ];

    jsdom.env('./template.html',scriptList, function(err,win){
        if (err) {  
            throw err;   
        }

        var $ = win.$;

        $('div[bx-name=TMS_Header]').attr("bx-config","{tmpl:'#header_tmpl'}");
        $('div[bx-name=SalesList]').attr("bx-config","{tmpl:'#saleslist_tmpl',data:saleslist_data}");
        $('div[bx-name=CatBanner]').attr("bx-config","{tmpl:'#catbanner_tmpl'}");
        $('div[bx-name=SideBanner]').attr("bx-config","{tmpl:'#sidebanner_tmpl'}");
        $('div[bx-name=TMS_Footer]').attr("bx-config","{tmpl:'#footer_tmpl'}");

        if(tmpl1&&tmpl2&&tmpl3&&tmpl4&&tmpl5&&config&&render){

            $('body').append(tmpl1+tmpl2+tmpl3+tmpl4+tmpl5);

            http.createServer(function(request, response) {
                response.writeHeader(200, {"Content-Type": "text/html"});
                response.write(win.document.innerHTML);
                response.end();    
            }).listen(8000);  
        }

    });

