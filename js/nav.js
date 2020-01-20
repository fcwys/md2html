/*
    功能：生成博客目录的JS工具
    测试：IE8，火狐，google测试通过
    孤傲苍狼
    2014-5-11
*/
var BlogDirectory = {
    /*
        获取元素位置，距浏览器左边界的距离（left）和距浏览器上边界的距离（top）
    */
    getElementPosition:function (ele) {        
        var topPosition = 0;
        var leftPosition = 0;
        while (ele){              
            topPosition += ele.offsetTop;
            leftPosition += ele.offsetLeft;        
            ele = ele.offsetParent;     
        }  
        return {top:topPosition, left:leftPosition}; 
    },


    /*
    创建博客目录，
    id表示包含博文正文的 div 容器的 id，
    mt 和 st 分别表示主标题和次级标题的标签名称（如 H2、H3，大写或小写都可以！），
    */
    createBlogDirectory:function (id, mt, st){
         //获取博文正文div容器
        var elem = document.getElementById(id);
        if(!elem) return false;
        //获取div中所有元素结点
        var nodes = elem.getElementsByTagName("*");
        //创建博客目录的div容器
        var divSideBar = document.createElement('DIV');
        divSideBar.className = 'sideBar';
        divSideBar.setAttribute('id', 'sideBar');
        var divSideBarTab = document.createElement('DIV');
        divSideBarTab.setAttribute('id', 'sideBarTab');
        divSideBar.appendChild(divSideBarTab);
        var h2 = document.createElement('H2');
        divSideBarTab.appendChild(h2);
        var txt = document.createTextNode('目录导航');
        h2.appendChild(txt);
        var divSideBarContents = document.createElement('DIV');
        divSideBarContents.style.display = 'none';
        divSideBarContents.setAttribute('id', 'sideBarContents');
        divSideBar.appendChild(divSideBarContents);
        //创建自定义列表
        var dlist = document.createElement("dl");
        divSideBarContents.appendChild(dlist);
        var num = 0;//统计找到的mt和st
        mt = mt.toUpperCase();//转化成大写
        st = st.toUpperCase();//转化成大写
        //遍历所有元素结点
        for(var i=0; i<nodes.length; i++)
        {
            if(nodes[i].nodeName == mt|| nodes[i].nodeName == st)    
            {
                //获取标题文本
                var nodetext = nodes[i].innerHTML.replace(/<\/?[^>]+>/g,"");//innerHTML里面的内容可能有HTML标签，所以用正则表达式去除HTML的标签
                nodetext = nodetext.replace(/&nbsp;/ig, "");//替换掉所有的&nbsp;
                nodetext = BlogDirectory.htmlDecode(nodetext);
                //插入锚        
                nodes[i].setAttribute("id", "blogTitle" + num);
                var item;
                switch(nodes[i].nodeName)
                {
                    case mt:    //若为主标题 
                        item = document.createElement("dt");
                        break;
                    case st:    //若为子标题
                        item = document.createElement("dd");
                        break;
                }
                
                //创建锚链接
                var itemtext = document.createTextNode(nodetext);
                item.appendChild(itemtext);
                item.setAttribute("name", num);           
                
                //将自定义表项加入自定义列表中
                dlist.appendChild(item);
                num++;
            }
        }
        
        if(num == 0) return false; 
        /*鼠标进入时的事件处理*/
        divSideBarTab.onmouseenter = function(){
            divSideBarContents.style.display = 'block';
        }
        /*鼠标离开时的事件处理*/
        divSideBar.onmouseleave = function() {
            divSideBarContents.style.display = 'none';
        }

        document.body.appendChild(divSideBar);
    }
    
};

// window.onload=function(){
//     /*页面加载完成之后生成博客目录*/
//     BlogDirectory.createBlogDirectory("mainContent","h2","h3");
// }