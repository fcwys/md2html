        //获取URL参数方法
        function getUrl(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (false);
        }

        var vm = new Vue({
            el: '#app',
            data: {
                title: "",          //页面标题
                htmlText: "",       //解析的HTML
                load: true,        //显示/隐藏Loading动画    
                loadtip: "加载中...",      //Load提示文字
                about: false        //显示/隐藏关于信息
            },
            mounted: function () {
                var _this = this;
                var url = "./README.md";
                var mdName = "Markdown解析";
                if (getUrl("url")) {
                    url = getUrl("url");
                    //取url文件名
                    let num = url.lastIndexOf('/') + 1
                    var mdName = decodeURI(url.substring(num));
                    // console.log(url);
                } else {
                    // console.log("URL为空")
                };
                axios.get(url)
                    .then(function (response) {
                        // console.log(response.data);
                        // MD解析为HTML
                        var parser = new HyperDown,
                            html = parser.makeHtml(response.data);
                        _this.load = false;
                        _this.title = mdName;
                        _this.htmlText = html;
                        document.title = mdName;
                        //代码高亮渲染
                        hljs.initHighlightingOnLoad();
                    })
                    .catch(function (error) {
                        // 请求失败处理
                        console.log("请求失败");
                        setTimeout(() => {
                            _this.loadtip = "加载失败,请检查参数是否正确并重试";
                        }, 1000);
                    });
            },
            methods: {
                // 阻止事件冒泡
                stopBubble: function (e) {
                    if (e && e.stopPropagation) { //非IE浏览器 
                        e.stopPropagation();
                    } else { //IE浏览器 
                        window.event.cancelBubble = true;
                    }
                }
            }
        })