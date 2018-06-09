#   js第11天
---
- offset 抵销，补偿   偏移
- scroll  滚动
- client 客户端 可视区
- 事件对象  event  addeventListener/attachEvent
正则表达式


	demo.style.width //.的方式获取不到内嵌的属性值，只能获取行

	内的属性值


**   offsetWidth 和 offsetHeight   **
demo.offsetWidth   //获取的是一个number的类型，不带px
demo.offsetHeight

console.log(demo.offsetWidth); //width+padding+border  边框以内的部分
console.log(demo.offsetHeight); //height+padding+border


**   offsetLeft 和offsetTop   **

	demo.offsetleft  //number类型的值   与父级元素的定位有关，
	获取的是自己的边框到最近的定位的父级元素间的距离，如果父级元素
	没有定位的话，则默认是以页面或是body为准


**   offsetParent   **
	
	demo1.offsetParent //获取的是离自己最近的定位（relative
	 absolute fixed）的父级元素

	demo1.parentNode  //获取的是自己的父元素，与定不定位没有关系

##   offsetLeft 与style.left 的区别

1.style.left/top是以margin的左上角为准，而offsetLeft/offsetTop是以border左上角为准

2.tyle.left只能获取行内的属性值，而offsetLeft或是offsetTop获取的是自己的边框到父级元素的距离

3.left值一般和定位一块使用，如果只用left值，标签没有效果

4.style.left是可读写的属性，可以用来设置值也可以用来获取行内的属性值而offsetLeft/offsetTop是只读的

	所以一个一个元素，没有margin的时候，那我我们一般使用
	offsetLeft或是offsetTOp来获取值，二用style.left/
	style.top来设置值

#   js第12天

- currentStyle[]   元素对象
- computedStyle[]   window对象
获取document的一些属性值



1.原来是匀速移动，之所以是匀速的，因为间隔时间是一定的，而步长也是一定的

2.所谓缓动动画，就是先快后慢，定时器的间隔时间是一定的，只能改变步长，让步长越来越小


>   可以获得样式里面的属性值
- currentStyle 谷歌和火狐不支持此属性，IE浏览器支持的属性
- getComputedStyle 是谷歌和火狐支持，低版本的IE不支持
- console.log(window.getComputedStyle(demo,null).width);
- console.log(getComputedStyle(demo,null)['width']);

**   封装currentStyle和getComputedStyle的兼容性   **

	function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
	}

#   js第13天
---
> - **offsetWidth** 
> - **offsetHeight** 
> - **offsetLeft** 
> - **offsetTop** 
> - **offsetParent**

---
- **scrollWidth**
- **scrollHeight** 
- **scrollLeft** 
- **scrollTop**

> - scrollWidth // width+padding 不包括边框和滚动条  
> - scrollHeight// height+padding+内容超出的部分
> - window.pageYOffset //IE8不支持 undefined
> - console.log(document.body.scrollTop);  //IE8不支持  0 用于导航栏的固定


		document.body  
		document.head
		document.documentElement ==> documentElement就是页面中的html标签

**   clientWidth  clientHeight clientTop clientLeft   **

		clientWidth //with+padding 不包括border,不包括滚动条  一般用于浏览器可视区的宽度  用于响应式界面

**   clientHeight //height+padding 不包括内容超出的部分不包括边框    一般用于浏览器可视区的高度   **

**   clientTop 上边框的宽度   **
**   clientLeft 左边宽的宽度   **

- console.log(window.innerWidth);  // 谷歌支持  火狐也支持   IE8及之前的浏览器不支持

- console.log(document.documentElement.clientWidth); // 都支持
- console.log(document.body.clientWidth); // IE8都支持

**   事件对象   **，是由系统提供给我们的，只要事件被触发，系统会默认提供给我们，是任何浏览器都支持的，但是支持方式不一样

		事件对象存在于函数的形参当中，或是window.event当中
- pageX/pageY  在IE8中不支持  pageX=e.clientX+document.documentElement.scrollLeft
- screenX+screenY
- clientX+clientY

#   js第14天
---
	obj.addEventListener("click",function(){alert
	(123)},false)
//IE8不支持

	obj.attachEvent("onclick",function(){alert(123)}); 
	 //IE11及高级浏览器不支持


###   事件对象：
	只要是事件触发了，系统会默认给我们一个事件对象相关的信息
	比如鼠标的一些坐标值 按键信息 键盘的键盘码等等

###   三个坐标
> screenX/Y  clientX/Y  pageX/Y

> style: margin的左上角为准
> offset:border的左上角为准

###   注册事件的第二种方式  addEventListener/attachEvent
可以给同一个事件源注册同一个事件不会被覆盖
- addEventListener 高级浏览器支持的方式
- addEventListener（type,listener,false）;
- attachEvent:IE8 低浏览器支持的方式
- attachEvent（"on"+type,listener）;

###   清除注册事件
- removeEventListener(type,listener,false)
- detachEvent("on"+type,listener)
- obj["on"+type]= null;

###   事件冒泡

	当一个元素的事件被触发，比如说单击事件，那么同样的事件会在当

	对象的祖先级元素中依次的被触发，这种现象叫事件冒泡

####   事件委托
	
	本来自己要做的事情，现在委托别的对象去做，但是效果是一样的
	事件委托就是通过事件冒泡实现的

####   清除冒泡
- e.stopPropagation();  //IE8不支持
- e.cancelBubble = true;  //IE8支持

		阻止冒泡就是让事件只在当前元素中被触发，祖先级元素不被触发

####   事件捕获
	
	事件冒泡和事件捕获刚好是相反的一个过程

###   事件的三个阶段

1.捕获阶段

2.目标阶段   执行当前对象的事件处理程序

3.冒泡阶段

	e.eventPhase 用于检测当前对象处于什么样的阶段

####   事件的类型
	e.type用于检测事件的类型

####   事件的几个属性
- this始终指代当前对象，就是正在执行事件处理程序的那个对象
- e.currentTarget  //和this的用法相同 ，IE8不兼容
- e.target  //源头  最原始的的触发事件的源头
- e.srcElement.id  //和target的用法一样，表示最最原始的源头

####   which的用法
	e.which //鼠标哪个按钮触发
 1.左键

 2.中键

 3.右键

- return false//阻止a标签的默认跳转 没有兼容性
- e.preventDefault   //IE8不兼容
- e.returnValue = false;/IE8里面的阻止

#   js第15天
---
###   正则表达式   RegExp
	正则表达式   实例对象  先创建对象
	去验证或是匹配字符串的
	元字符  \d

###   $的封装
	function $(str){
	}

###   定义正则表达式
	var reg = new RegExp("男|女")；
	var b = reg.test(“这是一个字符串男”);//boolean类型
	test 方法检测的是字符串中只有一个符合规则的字符就返回true
	console.log(b);


	var b = /\d/.test("123,jals,fas fag");//digit 数字 检测里面有没有数字

	就是定义某个规则的字符串，去验证其他的字符串


###   预定义类
	/./.test("")  [^\n\r]//除了换行和回车之外的任何字符
	\d [0-9]  数字字符
	\D [^0-9]  非数字字符
	console.log(/\D/.test("123456")); //false  只要有一个符合要求就返回true,空格不是字符

	\s 不可见字符
	\S 可见字符
	\w  表示大小字母、数字和_中的一个
	\W 和w相反

###   边界
	^以。。。。开头   $表示以。。。结尾
	console.log(/^\d/.test("a1234")); //false
	console.log(/\d$/.test("124abc")); //false
	console.log(/\d$/.test("124abc1"));  //ture
	如果^和$ 2个一起用，表示严格匹配，多一个不行，少一个也不行
	console.log(/^chuan$/.test("chuan"));//true
	console.log(/^chuan$/.test("chuannnn"));//false
	console.log(/^chuan$/.test("ccccchuan"));//false

###   量词
**一般和边界一起使用**

	"*"重复零次或更多次 x>=0;  {0，}
	"+"重复一次或更多次 x>=1;  {1，}
	"?"重复零次或一次x=(0||1)；{0,1}
###   {}量词的使用
	{n}表示前面的字符至少连续的出现一个n次，
	{n,}和{n}类似
	{n,m}  和^和$在一起表示的时候，表示严格匹配，必须全部是规定的字符类型
	 console.log(/\d{5}/.test("abc12345"));//true
	 console.log(/\d{5}/.test("abc12a3455b"));//ｆａｌｓｅ表示数字至少要出现一次连续的5个数字

**escape  编码  unescape　解码**


#   Js第一天

###   基础语法  
#####   选择器  
- id 
- 标签名 
- 类名 
- 后代选择器 
- 子代选择器 
- 过滤
####   $
- 获取到的元素全是包装集 对获取到的标签对象进行了一次包装
- DOM对象和jQuery对象的互换

- jQuery内部支持隐式迭代   遍历的**
 
**   原生js开发的一些问题   **
---
1. 入口函数只能有一个
2. 兼容性的问题
3. API比较长
4. 容错性差  只要有一行代码出错了，后面的代码都不会执行

###   jQuery的优点
---
1. jQuery的入口函数有多个
2. 没有兼容性问题
3. API短
4. 容错性强
5. jQuery的特点  write less do more  支持链式编程  支持隐式迭代 丰富的接口和插件
6. 使用jQuery的步骤
 - 引入库文件
 - 写入口函数
 - 写功能实现

#### DOM--->jQuery对象
---							
	var btn = getElementById("btn");
	
	$(btn).click(function(){
	alert(123);
	})

#### jQuery--->DOM
---
	$("#btn")[0].onclick = function(){
	
	alert(123);
	}

	$("#btn").get(0).onclick = function(){
	
	alert(123);
	}

> ###   基本选择器
- id选择器 $("#id")
- 类选择器 $(".类名")
- 标签选择器  $("标签名")
- 交集选择器(标签指定式选择器)  $("li.current")
- 并集选择器 $("#id,类名，p")
> ###   层级选择器 
- 子代选择器  >  $("选择器>选择器")
- 后代选择器  用空格隔开 $("div p span")
- 相邻选择器 + 当前元素的下一个相邻的兄弟级选择器，中间不能有间隔
- 兄弟选择器 ~ 获取当前标签元素的后面的所有符合要求的兄弟级标签，有间隔也没事   $("div ~ span")
- children() 直接子级。如果没有参数的时候，表示获取所有的子级标签，如果有参数的时候，表示获取子级标签中的符合要求的标签
- find("p") 必须带参数，表示查找当前对象的子级元素
> ###   兄弟选择器
- siblings() 表示获取自己的所有的兄弟姐妹级标签，不包括自己
> ###   上一个或是下一个兄弟选择器
- $("#li3").next()
- $().nextAll()
- $().prev()
- $().prevAll()
> ###   父级选择器
- $().parent()   父标签元素
- $().parents()   获取当前元素的父级元素，一直到DOM树的顶层html
- $().parents("div")  获取指定的父级元素
> ###   伪类选择器
：开头的 筛选选择器

- $("ul li:first")
- $("ul li:last")
- $（"ul li:even"） 偶数行li
- $("ul li:odd")   基数行li
> ###   筛选过滤选择器
： 过滤选择器  
筛选选择器都是方法

- $("ul li:eq(2)") 
- $("ul li").eq(2)
- first()
- last()
###   filter和not
---
- $("li").filter(".li4")  选择类名为li4的li标签元素
- $("li").not(".li4")   选择除了类名为li4的其它li标签元素
###   获取索引
- $(this).index();

###   操作类样式	
- addClass添加类  
- removeClass移除类  
- hasClass判断是否有这个类
- toggleClass切换类，有就移除，没有就添加

> 如果只想设置单个属性的话，可以用css()
如果之前已经写好了类样式了，这
个时候添加的话，直接添加就好了

###   显示和隐藏
jQuery中所有的动画都支持时间和回调函数

- hide('fast') 也可以是其他参数，默认是normal 
- show('slow')
- toggle('normal')
- hide(2000);
改变的是width height opacity的值

---



**   fast  200毫秒 normal 400  slow 600   **


- fadeIn
- fadeOut
- fadeTo
- fadeToggle
- sildeDown
- sildeUp
- sildeToggle

#   jQuery第2天
**   mouseenter和mouseleave   **

- 对应mouseover和mouseout 有冒泡事件
- mouseenter和mouseleave屏蔽了冒泡事件，但是如果元素通过定位等方式脱离了父级元素依然会发生冒泡事件



**   hover   **  （在一定程度上（针对同一对象）可以代替mouseenter和mouseleave）


		例：  $("div").hover(function () {  //前面的函数是鼠标移入的事件，后面函数是鼠标移出时的事件
                $(this).css("background-color", "skyblue");
            }, function () {
                $(this).css("background-color", "deeppink");
            })

##   slide系列
改变的是height的值

- sildeDown
- sildeUp
- sildeToggle

		例： $(function () {
            var $div = $("div");//变量本地化
            $("input").eq(0).click(function () {
                $div.slideDown(2000);
            })
            $("input").eq(1).click(function () {
                $div.slideUp(2000, function () {
                    $div.slideDown(2000, function () {
                        $div.slideUp(2000, function () {
                            $div.slideDown(1000);
                        })
                    })
                });
            })
            $("input:last").click(function () {
                $div.slideToggle(2000);
            })
        })
 

##   fade系列
改变的是opacity的值

- fadeIn
- fadeOut
- fadeTo
- fadeToggle

		例：$(function () {
            var $div = $("div");
            $("input").eq(0).click(function () {
                $div.fadeIn();
            })
            $("input").eq(1).click(function () {
                $div.fadeOut();
            })
            $("input").eq(2).click(function () {
                $div.fadeTo("opacity", 0.4);
            })
            $("input").last().click(function () {
                $div.fadeToggle(500);
            })
        })

##   animate

		例：$(function(){
        $div = $("div");
        $("input").click(function(){
            $div.animate({width:100,height:100,opacity:0.6},3000,function(){
                $div.animate({width:50,
                    height:50,
                    opacity:1,
                    left:500,
                    top:500
                },2000,"swing",function(){
                    $div.animate({width:100,
                        height:100,
                        opacity:0.8,
                        left:500,
                        top:0
                    },1000,"linear")
                })
            })
        })
    })

**   stop()方法用于在动画或效果完成前对它们进行停止   **

##   动态创建元素
1.`var link = $("<a href="http://www.baidu.com">百度</a>")`

`$("div").append(link)`;

**2.html()**

- html() - 设置或返回所选元素的内容（包括 HTML 标记）
- $("div").html("这是用JQ动态生成的内容")   会将原来的内容覆盖掉

##   克隆节点

**clone()**

- jQuery中的clone无论参数是true还是false都表示深度克隆，不但克隆标签本身，还克隆一切子节点
- true的话，会克隆原来的事件，如果是false则不克隆事件
##   操作节点
- append（） --->appendChild   在被选元素的结尾插入内容
- appendTo（）
- prepend（） ---> inserbefore  在被选元素的开头插入内容
- before（）   在被选元素之后插入内容,同级
- after（）   在被选元素之前插入内容,同级
##   清空节点
- **$("div").empty()**;  div里面的内容没有了，div还在
- **$("div").html("")**;div标签还在
- **$("div").remove()**;标签不在了，一般使用这个
##   获取或是设置表单的值
- **$("input").val()** --->好比原生中的value
##   属性相关操作
	
		setAttribute()  getAttribute()  jQuery中直接将两者合二为一成attr()
- `$('input').attr('aa','mm')`;  设置属性
- `$('input').attr('aa')`;获取属性
- `$('input').removeAttr('aa')`;连属性值和属性名一起删除
	
**   注意   **

	checked、selceted、disabled 单属性的使用prop（），而不是
	attr()
**   prop属性   **
>##offset
- jQuery将offset封装成了一个方法，此方法返回一个对象，用法和原生的js不一样
- offset()返回一个对象，此对象里面有2个属性left top**（offset().left/offset().top）,始终以页面或body为准，与父元素有无定位没有关系**
- offset()是一个可读写的属性

> **   offset设置属性值   **

		$("#box").offset({
    		top:300,
   	 		left:200
   	 	})
>- 在设置值的时候，如果原来有定位，则以自身定位为准
- 如果没有定位，会默认添加一个position:alative
>##position
-  position()这个方法也返回一个对象，里面有两个属性，分别是left top
-  获取的自身的margin到离自己最近的定义的父盒子之间的距离
-  不是以边框为准 是以margin为准，因为style.left  style-top在设置值的时候，也是以margin的左上角为准
- position（）是一个只读的属性，只能读取left top
- style.left是以margin为准
- offset.left 是以边框的左上角为准
- 如果做筋斗云案例的时候，得用position（）.left来获取当前li标签到ul左侧的距离

>##width() height() 用于获取浏览器可视区的宽度和高度

>- $(widow).width() $(widow).height()获取的值不带单位
- css('width')获取的值带px

#   jQuery第3天
###   三大家族
- offset() offset().top offset().left  position()--->offset
- width()  height() --->client
- srcollTop()   srcollLeft() 可读写的属性 --->srcoll()
###  jQuery中简单事件绑定
可以给同一个事件源注册多个相同的事件，而不会被覆盖
####   bind的注册事件
    
	e.preventDefault() 阻止a标签的默认跳转
##   阻止冒泡

	e.stopPropagation();jQuery中只用这一个
>####   事件中的几个属性

- this.id  正在处理事件处理程序的源头
- e.target.id  始终表示最原始的源头
- e.currentTarget.id 和this一样
- e.degegateTarget.id  和this一样
>####   事件对象中的坐标
- e.screenX  ===== e.screenY
- e.clientX  ===== e.clientY
- e.pageX  ===== e.pageY
>####   触发器
- click() 简单事件触发
- $(obj).trigger('click') //写上参数对应的名称
- $(obj).triggHandler('click')  触发事件的时候不会引发默认行为，输入框的焦点获取到之后，闪烁的光标是一个默认行为
####   each用来遍历jQuery对象和数组
	$('ul li').each(function(index,ele){
		$(ele).css('opacity',(index+1)/10)
	}) ele是DOM对象
**   each是jQuery中的方法，一定要用jQuery对象来调用   **

		遍历数组
		var arr=[10,20,30];
		$each(arr,function(index,ele){
		console.log(index===ele)
		})

		遍历对象
		var obj = {
                name:"张三",
                sex:"男"
            }
            $.each(obj,function(index, ele){
                console.log(index+"====="+ele);
            })
####   end()结束当前对象返回上一个对象，只能用一次
####   多库共存的解决方式
var itcast = $.noConflict();

#   H5第1天
- canvas
- **1.html 标签 智能标签 新增的事件**  
##   语义标签
	header	nav seciton aside article footer


---
##   解决html的兼容问题

	低版本的浏览器如IE8 对于HTML5新增的标签是不认的，默认认为不存在  
- hack技术
	<!--[if lte ie8]>
	<srcipt>
		document.createElement("header") 默认是行内元素，要转化为	display:block
	</srcipt>
	<![endif]-->
- 引入插件

##   智能表单
	<style>
        form{
            width:100% ;
            max-width:640px;
            min-width:320px;
            margin:0 auto;
        }
        input{
            width: 100%;
        }
    </style>
	<form>
	    <fieldset>
	        <legend>智能表单</legend>
	        <label for=''>
	            用户名：<input type="text"/>
	        </label>
	        <label for=''>
	            密码：<input type="password"/>
	        </label>
			<input type="submit"/>
	    </fieldset>
	</form>

###   新增列表
	<input type="search" list="form1"/>
	<datalist id="form1">
	    <option value="宝马"></option>
	    <option value="宝骏"></option>
	    <option value="宝宝"></option>
	    <option value="宝莱坞"></option>
	</datalist>

###   表单新增的属性
- placeholder  占位符 提示用户的内容，用户有输入就自动清空
- required  表单不能为空 如果为空，则不提交
- autocompelete="off" 提示之前输入过的内容默认是on
- autofocus 自动获取焦点
- pattern="^\d{11}$"  匹配输入的电话号码
###   表单新增的事件
- invalid事件 当用户输入的内容无效的时候 
		
		oninvalid="this.setCustomValidity('请输入11位的电话号码')"

- input 当用户输入就触发的事件

		oninput="this.setCustomValidity('')"
###   新增的2个API
- document.querySelector('#userPwd')
		
		是选择器 id 类 标签 后代 属性 类似于jQuery的$
		只会获取一个，如果传进来的选择器有多个的话，只选择一个符合要求的

- document.querySelectorAll()
		
		也是将获取到的多个标签存放在伪数组当中

###   音频
	<audio autoplay>
    	<source src="audio/yinyue.ogg"/>
	</audio>
###   视频
- 两个方法pause() play()
- paused 暂停的状态
- 多媒体的2个事件 pause play
###   标签属性
---
1. autoplay =>视频默认加载完播放

2. controls =>播放的控件

3. loop =>控制循环

4. poster =>在视频没有播放的时候的预览图片

###   操作类样式
- Node.classList.add('demo') 添加
- Node.classList.remove('demo')  删除
- Node.classList.toggle('demo')  切换
- Node.classList.contains('demo') 判断
###   自定义属性
- 原生js当中的是setAttribute() getAttribute()
- HTML5中，推荐凡是自定义属性都需要以data-开头 data-price
data-my-name
- 获取 span.dataset['price'];
- 获取 span.dataset['myName'];  //驼峰命名
###   两个进度条
- progress 一般用于密码强度 上传或是下载
- meter 磁盘存储文件的表示

		很少用，工作中一般用2个div实现
#   H5第2天
##   渐进增强原则
渐进增强：让低版本浏览器可以使用最基本的功能，高版本的浏览器具有更好的用户体验
##   属性选择器
- li[class^='box']  属性中以box开头的li标签
- li[class$='box']  属性中以box结尾的li标签
- li[class*='box']  属性中包含box内容的li标签
- li[class|='box']  属性中box-的li标签,没有-,它自身box也可以
##   伪类选择器
- li:first-child  选择li标签的父元素中的第一个子元素，还得是li标签，不然没效果
- li:last-child  选择li标签的父元素中的最后子元素，还得是li标签，不然没效果
- li:nth-child(1) 序号从1开始
- li:nth-child(4)
- li:nth-child(2n)   偶数 从0开始
- li:nth-child(2n+1)  奇数
- li:nth-child(odd)  奇数
- li:nth-child(even)  偶数


- li:nth-of-type(2) 获取父元素中的第2个和前面标签一致的子标签
	
		n的取值从0开始
	
		<ul>
		    <li>这是li标签1</li>
		    <li>这是li标签2</li>
		    <li>这是li标签3</li>
		    <li>这是li标签4</li>
		    <li>这是li标签5</li>
		    <li>这是li标签6</li>
		</ul>

##   其他选择器
- :enabled
- :disabled
- :target
- :checked
- :not


- p:first-letter  权重比linear高
- p:first-line
- p::selection

##   伪元素
**::before和 ::after  默认是行内元素**
	伪元素就是一个假的元素，不占用内存

	div::before{
		content:'';
	}  IE8不兼容
	div:before{
		content:'';
	}  IE8兼容

##   文本阴影
			移动水平位置  垂直位置  模糊距离 颜色
text-shadow: 10px   10px     10px   blue;

##   背景图片

###   背景尺寸
- backgorund-size:700px 600px;
- backgorund-size:cover;   铺满整个盒子
- backgorund-size:contain;  只要有一边触及边线就不再变化了

###   背景原点
- background-origin:padding-box;  默认的显示状态
- background-origin:border-box;  从边框开始显示
- background-origin:content-box; 以内容为左上角起始点开始显示
###   背景裁切
- background-clip:border-box; 
- background-clip:padding-box;
- backgorund-clip:content-box
###   过渡

	谁要过渡，哪个元素需要有过渡的效果，就需要给谁添加transition属性
transition:all 2s 1s ease; 
	
	运动曲线：linear ease ease-In-out ease-In ease-Out
4个参数分别表示：属性 时间 延迟 曲线

- transition-property   过渡属性
- transition-duration   过渡时间
- transition-timing-function  过渡曲线
- transition-delay 过渡延时

		
#   H5第3天
**   border-image   **

步骤

- border
- border-image-source
- border-image-slice
- border-image-repeat：round
- border-image-outset
- background:url（''）

##   盒子内减模式
- box-sizing:border-box;
- box-sizing:content-box
##   盒子阴影语法
box-shadow:0px 0px 0px 0px #000 inset;

参数： 水平位移 垂直位移 羽化程度 阴影大小 阴影颜色 内/外阴影
##   渐变
- linear-gradient 方向 起始颜色 起始位置 ，目标颜色 结束位置
- radial-gradient 半径 位置，起始颜色，结束颜色
##   转换 transform
- 缩放 scale(倍数或是百分比) scaleX() scaleY()
- 移动 translate(length,percentage) translateX translateY
- 旋转  rotate(deg) 可以设置旋转的起始点 transform-origin
- 倾斜 skew(deg)

#   H5第4天
##   透视
perspective：1000px;  近大远小,一般给父元素添加
##   3D转换 transform
- transform:rotate(-90deg);
	
		默认整数值的时候，是一个顺时针方向的旋转，相当于是一个Z轴
- transform:rotateX(180deg);

		正值的角度的时候，是一个推倒的效果，是往里，如果是负
		值的话，则是向外，向外扑的一个效果
- transform:rotateY(-180deg);

		正值的角度的时候，是往里，负值的时候是往外转
- transform:rotateZ(180deg);

		正值的时候是一个顺时针的效果，负值的时候，是一个逆时针的效果

【3D旋转属性合写】

	因为2个属性分开写后面的会将前面的覆盖掉
transform:rotateX(90deg) translateZ(400px);

**   transform-style:preserve-3d;   **不加看不到3D效果,一般是给父元素添加

**   backface-visibility:visible/hidden;   **反面不可见
##   动画
- 【@keyframes 动画名{from{}to{}}】
- 【@keyframes 动画名{0%{}100%{}}】
**   属性   **
- @keyframes 规定动画
- animation 所有动画属性的简写属性，除了animation-paly-state
- animation-name 规定@keyframes动画的名称
- animation-duration 规定动画一个周期所花费的时间
- animation-timing-function:steps(2)规定动画的速度曲线，默认是ease
- animation-delay 规定动画从何时开始，默认是0
- animation-iteration-count:infinite 规定动画被播放的次数，默认是1
- animation-direction 规定动画是否在下一周期逆向播放，默认是normal reverse alternate alternate-reverse
- animation-play-state 规定动画是否在运行或暂停
- animation-fill-mode:forwards/backwards 运动完之后停留在最后的状态


#   H5第5天
###   今日课程介绍

1.弹性盒布局 伸缩布局 flex布局 display:flex;

2.简易版本携程

3.360浏览器的页面

>给父元素加
- display:flex;
- justify-content:space-between;
- align-item:center;

>##   justify-content 主轴方向的对齐方式
- flex-start
- flex-end
- center
- space-between
- space-around
>##   align-items 整个子元素在侧轴方向的对齐方式
- flex-start
- flex-end
- center
- stretch
>##   flex-wrap 换行
- nowrap 默认不换行
- wrap 换行
>##   align-content 多行的对齐方式
- flex-start
- flex-end
- center
- space-between
- space-around
- stretch

----
>##   设置子盒子的分配空间
flex：1;
>##   order属性 设置子元素的排列顺序
	
	数值越小越靠前，默认为0
>##   align-self 设置单个子元素侧轴位置
	
	取值和align-items一样，优先级比align-items高


测试属性支持网站
caniuse.com

插件库

github.com
cdn.baidu.com

火狐社区MDZ

##   鼠标滚轮事件

mousewheel  有兼容性，火狐不支持


#   H5第6天
今日课程介绍

1.弹性盒布局 伸缩布局 flex布局 display:flex;

2.简易版本携程

3.360浏览器的页面

>#   给父元素加
- display:flex;
- justify-content:space-between;
- align-item:center;

>##   justify-content 主轴方向的对齐方式
- flex-start
- flex-end
- center
- space-between
- space-around
>##   align-items 整个子元素在侧轴方向的对齐方式
- flex-start
- flex-end
- center
- stretch
>##   flex-wrap 换行
- nowrap 默认不换行
- wrap 换行
>##   align-content 多行的对齐方式
- flex-start
- flex-end
- center
- space-between
- space-around
- stretch

----
>###   设置子盒子的分配空间
flex：1;
>###   order属性 设置子元素的排列顺序
	
	数值越小越靠前，默认为0
>##   align-self 设置单个子元素侧轴位置
	
	取值和align-items一样，优先级比align-items高


测试属性支持网站
caniuse.com

插件库

github.com
cdn.baidu.com

火狐社区MDZ

##   鼠标滚轮事件

mousewheel  有兼容性，火狐不支持


