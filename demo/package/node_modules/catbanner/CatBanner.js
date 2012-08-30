KISSY.add('node_modules/catbanner/CatBanner', function(S, Brick){
    function CatBanner() {
        CatBanner.superclass.constructor.apply(this, arguments);
    }
    CatBanner.ATTRS = {
        name:'CatBanner'
    };

    CatBanner.METHOD = {
        initialize: function() {
             console.log('CatBanner init');
        }
    };

    CatBanner.ATTACH = {
        '.J_BannerSwitchImg1':{
            mouseenter:function(){
               var B = S;
               var C = B.DOM, A = B.Event,D;
                if (D) {
                    D.cancel()
                }
                if (B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg2")) {
                    B.Anim.stop("#J_CatBannerSwitch .J_BannerSwitchImg2");
                    B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg2", {left: "330px"}, 0.5, "easeBoth").run()
                }
                if (B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg3")) {
                    B.Anim.stop("#J_CatBannerSwitch .J_BannerSwitchImg3");
                    B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg3", {left: "425px"}, 0.5, "easeBoth").run()
                }
                if (!B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg2") || !B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg3")) {
                    D = B.later(function() {
                        B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg2", {left: "330px"}, 0.5, "easeBoth").run();
                        B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg3", {left: "425px"}, 0.5, "easeBoth").run()
                    }, 90)
                }
            }
        },
        '.J_BannerSwitchImg2':{
            mouseenter:function(){
               var B = S;
               var C = B.DOM, A = B.Event,D;
                if (D) {
                    D.cancel()
                }
                if (B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg2")) {
                    B.Anim.stop("#J_CatBannerSwitch .J_BannerSwitchImg2")
                }
                if (B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg3")) {
                    B.Anim.stop("#J_CatBannerSwitch .J_BannerSwitchImg3");
                    B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg3", {left: "425px"}, 0.5, "easeBoth").run()
                }
                if (!B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg2") || !B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg3")) {
                    D = B.later(function() {
                        B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg2", {left: "95px"}, 0.5, "easeBoth").run();
                        B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg3", {left: "425px"}, 0.5, "easeBoth").run()
                    }, 90)
                }
            }
        },
        '.J_BannerSwitchImg3':{
            mouseenter:function(){
                var B = S;
                var C = B.DOM, A = B.Event,D;
                if (D) {
                    D.cancel()
                }
                if (B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg2")) {
                    B.Anim.stop("#J_CatBannerSwitch .J_BannerSwitchImg2");
                    B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg2", {left: "95px"}, 0.5, "easeBoth").run()
                }
                if (B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg3")) {
                    B.Anim.stop("#J_CatBannerSwitch .J_BannerSwitchImg3")
                }
                if (!B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg2") || !B.Anim.isRunning("#J_CatBannerSwitch .J_BannerSwitchImg3")) {
                    D = B.later(function() {
                        B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg2", {left: "95px"}, 0.5, "easeBoth").run();
                        B.Anim("#J_CatBannerSwitch .J_BannerSwitchImg3", {left: "190px"}, 0.5, "easeBoth").run()
                    }, 90)
                }
            }
        }
    };

    S.extend(CatBanner, Brick);
    S.augment(CatBanner, CatBanner.METHOD);
    return CatBanner;
}, {
    requires: ["brix/core/brick","./CatBanner.css"]
});
