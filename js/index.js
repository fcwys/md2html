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

        // 目录导航
        function navTree() {
            // 创建 Outline 实例
            let navigation = new AutocJs({
                // 文章正文 DOM 节点的 ID 选择器
                article: '#mainContent',
                // 要收集的标题选择器
                selector: 'h1,h2,h3,h4,h5,h6',
                // 是否生成文章导读导航
                isGenerateOutline: true,
                // 是否在文章导读导航中显示段落章节编号
                isGenerateOutlineChapterCode: false,
                // 是否在正文的文章标题中显示段落章节编号
                isGenerateHeadingChapterCode: false,
            });
            //置空方法以使该方法只能调用一次
            navTree = function () {};
        }

        var vm = new Vue({
            el: '#app',
            data: {
                title: "", //页面标题
                htmlText: "", //解析的HTML
                load: true, //显示/隐藏Loading动画    
                loadtip: "加载中...", //Load提示文字
                about: false //显示/隐藏关于信息
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
                    })
                    .catch(function (error) {
                        // 请求失败处理
                        _this.title = mdName;
                        console.error("数据请求失败");
                        setTimeout(() => {
                            _this.loadtip = "加载失败，请检查参数是否正确并重试";
                        }, 500);
                    });
            },
            updated: function () {
                //代码高亮渲染
                hljs.initHighlighting();
                //目录树渲染
                navTree();
            },
            methods: {}
        })