    class OpenApp {
        constructor() {
            this.isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
            this.isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            this.isWeixin = /MicroMessenger/i.test(navigator.userAgent);

            this.andScheme = 'goodsDetail://store:8888/goodsDetail' + "?";     //这里是唤起App的协议，由Android同事提供 
            this.iosScheme = 'goodsDetail' + ":" + "//";     //唤起协议，由iOS小哥哥提供 
            this.download = 'https://xxxxxxxxxx.com';  //应用商城链接
        }
    }

    OpenApp.prototype.open = function () {
        let context = this;
        context.jump(context.isAndroid ? context.andScheme : context.iosScheme);

        let downloader = 0;

        downloader = setTimeout(function () {
            let url = context.download;
            document.writeln(url);
            context.jump(url);
        }, 5000);

        document.addEventListener('visibilitychange webkitvisibilitychange', function () {
            if (document.hidden || document.webkitHidden) {
                clearTimeout(downloader);
            }
        });

        window.addEventListener('pagehide', function () {
            clearTimeout(downloader);
        });
    }

    OpenApp.prototype.jump = function(url) {
        //url += "productId=1&activityId=2&specialId=1&promote_code=MYD32c9136c1&adsense=4310756262356717569&terminal_type=H5&from=browser";
        var productId = window.localStorage.getItem('productId');
        var activityId = window.localStorage.getItem('activityId');
        var specialId = window.localStorage.getItem('specialId');
        var promote_code = window.localStorage.getItem('promote_code');
        var adsense = window.localStorage.getItem('adsense');
        var terminal_type = window.localStorage.getItem('terminal_type');
        var from = window.localStorage.getItem('from');
        url +=  'productId=' + productId + '&' +  'activityId='  + activityId + '&' + 'specialId='  + specialId + '&' + 'promote_code='  + promote_code + '&' + 'adsense='  + adsense + '&' + 'terminal_type='  + terminal_type + '&' + 'from='  + from;
        console.log(url);   
        // return;
        var a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        document.body.appendChild(a);
        a.click();
        //window.location.href = url;
    };

    let openApp = new OpenApp();

    openApp.open();
    //点击事件
    // openApp: function() {
    //     new OpenApp().open();
    // },