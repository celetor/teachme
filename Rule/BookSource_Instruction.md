## Legado书源规则说明
更新时间：2020-11-05  更新url的headers规则
### 概况

  - 1、语法说明
  - 2、Legado的特殊规则
  - 3、书源之「基本」
  - 4、书源之「搜索」
  - 5、书源之「发现」
  - 6、书源之「详情页」
  - 7、书源之「目录」
  - 8、书源之「正文」
  - 9、补充说明

------

### 1、语法说明
  + JSOUP之Default
    - 语法如下：
    ```
     @为分隔符,用来分隔获取规则
     每段规则可分为3段
     第一段是类型,如class,id,tag,text,children等, children获取所有子标签,不需要第二段和第三段,text可以根据文本内容获取
     第二段是名称,text. 第二段为文本内容的一部分
     第三段是位置,class,tag,id等会获取到多个,所以要加位置
     如不加位置会获取所有
     位置正着数从0开始,0是第一个,如为负数则是取倒着数的值,-1为倒数第一个,-2为倒数第二个
     !是排除,有些位置不符合需要排除用!,后面的序号用:隔开0是第1个,负数为倒数序号,-1最后一个,-2倒数第2个,依次
     获取列表的最前面加上负号- 可以使列表倒置,有些网站目录列表是倒的,前面加个负号可变为正的
     @的最后一段为获取内容,如text,textNodes,ownText,href,src,html,all等
     如需要正则替换在最后加上 ##正则表达式##替换内容，替换内容为空时，第二个##可以省略
     例:class.odd.0@tag.a.0@text||tag.dd.0@tag.h1@text##全文阅读
     例:class.odd.0@tag.a.0@text&&tag.dd.0@tag.h1@text##全文阅读
    ```
  
    - 标准规范与实现库 [Package org.jsoup.select, CSS-like element selector](https://jsoup.org/apidocs/org/jsoup/select/Selector.html)
   
  + JSOUP之CSS
    - 语法见http://www.open-open.com/jsoup/selector-syntax.htm
    - 必须以 `@css:` 开头
    - 标准规范与实现库 [Package org.jsoup.select, CSS-like element selector](https://jsoup.org/apidocs/org/jsoup/select/Selector.html)
    - 在线测试 [Try jsoup online: Java HTML parser and CSS debugger](https://try.jsoup.org/)
   - 注意：获取内容可用text,textNodes,ownText,html,all,href,src等
   - 例子见最后的【书源一】的搜索页和正文页规则

  + JSONPath 
    - 语法见 [JsonPath教程](https://blog.csdn.net/koflance/article/details/63262484)
    - 最好以 `@json:` 或 `$.` 开头，其他形式不可靠
    - 标准规范 [goessner JSONPath - XPath for JSON](https://goessner.net/articles/JsonPath/)
    - 实现库 [json-path/JsonPath](https://github.com/json-path/JsonPath)
    - 在线测试 [Jayway JsonPath Evaluator](http://jsonpath.herokuapp.com/)
   - 例子见最后的【书源三】的搜索页、目录页和正文页规则

  + XPath
    - 语法见 [XPath教程](https://www.w3school.com.cn/xpath/index.asp)、[XPath库的说明](https://github.com/zhegexiaohuozi/JsoupXpath/blob/master/README.md)
    - 必须以 `@XPath:` 或 `//` 开头
    - 标准规范 [W3C XPATH 1.0](https://www.w3.org/TR/1999/REC-xpath-19991116/) 
    - 实现库 [hegexiaohuozi/JsoupXpath](https://github.com/zhegexiaohuozi/JsoupXpath)
   - 例子见最后的【书源二】的搜索页、详情页和正文页规则，以及目录页的下一页规则

  + JavaScript
    - 可以在 `<js></js>`、`@js:`中使用，结果存在result中
    - `@js:`只能放在其他规则的最后使用
    - `<js></js>`可以在任意位置使用，还能作为其他规则的分隔符，例：`tag.li<js></js>//a`
    - 在搜索列表、发现列表和目录中使用可以用`+`开头，使用AllInOne规则
   
  + 正则之AllInOne
    - 只能在搜索列表、发现列表、详情页预加载和目录列表中使用
    
    - 必须以 `:` 开头
    
    - 教程 [veedrin/horseshoe 2018-10 | Regex专题](https://github.com/veedrin/horseshoe#2018-10--regex%E4%B8%93%E9%A2%98)
      
      [语法](https://github.com/veedrin/horseshoe/blob/master/regex/%E8%AF%AD%E6%B3%95.md)   [方法](https://github.com/veedrin/horseshoe/blob/master/regex/%E6%96%B9%E6%B3%95.md)  [引擎](https://github.com/veedrin/horseshoe/blob/master/regex/%E5%BC%95%E6%93%8E.md)
      
    - 例子见最后的【书源一】的目录页规则，最前面的`-`表示目录倒序，以及【书源二】的目录页规则
    
  + 正则之OnlyOne
    - 形式 `##正则表达式##替换内容###`
    - 只能在搜索列表、发现列表、详情页预加载、目录列表之外使用
    - 例子见最后的【书源一】的详情页规则
  - 注意点：该规则只能获取第一个匹配到的结果并进行替换

  + 正则之净化
    - 形式 `##正则表达式##替换内容`
    - 只能跟在其他规则后面，独立使用相当于`all##正则表达式##替换内容`
    - 例子见最后的【书源一】的正文页规则
  - 注意点：该规则为循环匹配替换

  + 自定义三种连接符号
    - 符号：`&&`、`||`、`%%`
    
    - 只能在同种规则间使用，不包括js和正则
    
    - `&&`会合并所有取到的值,
    
    - `||`会以第一个取到值的为准
    
    - `%%`会依次取数，如三个列表，
    
      先取列表1的第一个，再取列表2的第一个，再取列表3的第一个，
    
      再取列表1的第二个，再取列表2的第二个...

### 2、Legado的特殊规则
  + URL必知必会

    1. 请求头

       - 一般形式，如下所示

         ```
         {
             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
             "Accept-Language":"zh-CN,zh;q=0.9"
         }
         ```

         

       - 复杂情况可使用js

         ```
         <js>
         (()=>{
         	var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36";
         	var headers = {"User-Agent": ua};
         	return JSON.stringify(headers);
         })()
         </js>
         ```
         ※其中，`ua`必须保证是`JavaScript`的`String`类型，`JSON.stringify()`才能将`header`转换为字符串。

         

    2. GET请求

       - 一般形式如下，charset为utf-8时可省略，无特殊情况不需要请求头和webView，参数webView非空时采用webView加载

         ```
         https://www.baidu.com,{
         	"charset": "gbk",
         	"headers": {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"},
         	"webView": true
         }
         ```

       - 复杂情况可使用js

         ```
         <js>
         	var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36";
         	var headers = {"User-Agent": ua};
         	var option = {
         		"charset": "gbk",
         		"headers": headers,
         		"webView": true
         	};
         	"https://www.baidu.com," + JSON.stringify(option)
         </js>
         ```

         

    3. POST请求

       - 一般形式如下，body是请求体，charset为utf-8时可省略，无特殊情况不需要请求头和webView，参数webView非空时采用webView加载

         ```
         https://www.baidu.com,{
         	"charset": "gbk",
         	"method": "POST",
         	"body": "bid=10086",
         	"headers": {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"},
         	"webView": true
         }
         ```

       - 复杂情况可使用js

         ```
         <js>
         	var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36";
         	var headers = {"User-Agent": ua};
         	var body = "bid="+"10086";
         	var option = {
         		"charset": "gbk",
         		"method": "POST",
         		"body": String(body),
         		"headers": headers,
         		"webView": true
         	};
         	"https://www.baidu.com," + JSON.stringify(option)
         </js>
         ```
         ※其中，`body`必须保证是`JavaScript`的`String`类型，变量是计算得到的尽量都用`String()`强转一下类型。

         

  + 变量的put与get

    - `@put`与`@get`

      只能用于js以外的规则中，@put里使用JSONPath不需要加引号，其他规则需要加引号，

      例：@put:{bid:"//*[@bid-data]/@bid-data"}

    - `java.put`与`java.get`

      只能用于js中，在js中无法使用@get


  +  `{{}}`与`{}`规则

    - 在搜索URL与发现URL中的`{{}}`

      在{{}}里只能使用js

    - 在搜索URL与发现URL以外的`{{}}`

      可在`{{}}`中使用任意规则（正则除外？），默认为js，使用其他规则需要有明显的标志头，

      如：Default规则需要以`@@`开头，XPath需要以`@xpath:`或`//`开头，JSONPath需要以`@json:`或`$.`开头，CSS需要以`@css:`开头

    - `{}`规则

      留用了阅读2.0的规则，只能使用JSONPath，尽量避免使用

  + 自定义js方法
    - 在js中调用java的常规方法：由于java这个关键字已经被使用，调用java开头的包名时需使用全局变量Packages
       - 直接引入java类，如下所示，引入了两个java包，java包的作用域是在`with`的范围内，其内使用java相关语法，最后在作用域外被js调用了作用域内的函数
    ```
    var javaImport = new JavaImporter();
    javaImport.importPackage(
    	Packages.java.lang,
    	Packages.java.security
    );
    with(javaImport){
    	function strToMd5By32(str) {
    		var reStr = null;
    		var md5 = MessageDigest.getInstance("MD5");
    		var bytes = md5.digest(String(str).getBytes());
    		var stringBuffer = new StringBuilder();
    		bytes.forEach(a=>{
    			var bt = a & 0xff;
    			if (bt < 16) {
    				stringBuffer.append("0");
    			}
    			stringBuffer.append(Integer.toHexString(bt));
    		});
    		reStr = stringBuffer.toString();
    		return reStr;
    	}
    }
    strToMd5By32('123')
    ```

       - 只想调用某个public函数：，例：`io.legado.app.utils.htmlFormat(str)`、`org.jsoup.Jsoup.parse(str)`
       - 下面是一些常用的函数/变量
    
    ```
    //当前页的responseBody
    result
    
    //当前页的URL
    baseUrl
    
    //文件下载,content为十六进制字符串,url用于生成文件名，返回String文件路径
    java.downloadFile(content: String, url: String)
    
    //文件解压,zipPath为压缩文件路径，返回String解压路径
    java.unzipFile(zipPath: String)
    
    //文件夹内所有文件读取，返回内容String
    java.getTxtInFolder(unzipPath: String)
    
    //输入urlStr获取网页内容，返回类型String?
    java.ajax(urlStr: String)
    
    //格式化时间戳，返回类型String
    java.timeFormat(timestamp: Long)
    
    //base64解码，返回类型String
    java.base64Decode(str: String)
    //java.base64Decode(str: String, flags: Int)	//未启用
        
    //base64编码，返回类型String?
    java.base64Encode(str: String)
    java.base64Encode(str: String, flags: Int)
        
    //md5编码，返回类型String?
    java.md5Encode(str: String)
    java.md5Encode16(str: String)
    
    //实现重定向拦截，返回Connection.Response
    java.get(url: String, headers: Map<String, String>)
    java.post(urlStr: String, body: String, headers: Map<String, String>)
    
    //实现cookie读取，返回String
    java.getCookie(tag: String, key: String?)
    
    //html格式化，返回String
    java.htmlFormat(str: String)
    
    //实现字符串编码，返回String
    java.encodeURI(str: String, enc: String)
    
    /**************以下部分方法由于JAVA不支持参数默认值，调用时不能省略***************/
    //设置需解析的内容content和baseUrl，返回类型AnalyzeRule
    java.setContent(content: Any?, baseUrl: String? = this.baseUrl)
    
    //输入规则rule和URL标志isUrl获取文本列表，返回类型List<String>?
    java.getStringList(rule: String, isUrl: Boolean = false)
    
    //输入规则rule和URL标志isUrl获取文本，返回类型String
    java.getString(ruleStr: String?, isUrl: Boolean = false)
    
    //输入规则ruleStr获取节点列表，返回类型List<Any>
    java.getElements(ruleStr: String)
    
     /**************以下方法用于重定向拦截，返回返回Jsoup的Connection.Response*******/
    java.get(urlStr: String, headers: Map<String, String>)
    java.post(urlStr: String, body: String, headers: Map<String, String>)
    ```


### 3、书源之「基本」
  + 书源URL(bookSourceUrl)
    - 必填
    - 唯一标识，不可重复
    - 与其他源相同会覆盖
  + 书源名称(bookSourceName)
    - 必填
    - 名字可重复
  + 书源分组(bookSourceGroup)
    - 可不填
    - 用于整理源
  + 登录URL(loginUrl)
    - 可不填
    - 用于登录个人账户
  + 书籍URL正则(bookUrlPattern)
    - 可不填
    - 添加网址时，用于识别书源
    
    - ```
      例:https?://www.piaotian.com/bookinfo/.*
      ```
    
  + 请求头(header)
    - 可不填
    - 访问网址时使用
    
### 4、书源之「搜索」
  - 搜索地址(url)

    - `key`为关键字标识，通常形态为`{{key}}`，运行时会替换为搜索关键字

      也可以对key进行加密等操作，如：`{{java.base64Encode(key)}}`

    - `page`为关键字标识，通常形态为`{{page}}`，page的初值为1也可以对page进行计算，

      如：`{{(page-1)*20}}`，有时会遇到第一页没有页数的情况，有两种方法：

      ① `{{page - 1 == 0 ? "": page}}`  

      ② `<,{{page}}>`

    - 支持相对URL

  - 书籍列表规则(bookList)
  - 书名规则(name)
  - 作者规则(author)
  - 分类规则(kind)
  - 字数规则(wordCount)
  - 最新章节规则(lastChapter)
  - 简介规则(intro)
  - 封面规则(coverUrl)
  - 详情页url规则(bookUrl)

### 5、书源之「发现」

  - 发现地址规则(url)

    - `page`为关键字标识，通常形态为`{{page}}`，page的初值为1，也可以对page进行计算，

      如：`{{(page-1)*20}}`，有时会遇到第一页没有页数的情况，有两种方法：

      ① `{{page - 1 == 0 ? "": page}}`  

      ② `<,{{page}}>`

    - 发现URL可使用`&&`或换行符隔开

    - 支持相对URL

  - 书籍列表规则(bookList)
  - 书名规则(name)
  - 作者规则(author)
  - 分类规则(kind)
  - 字数规则(wordCount)
  - 最新章节规则(lastChapter)
  - 简介规则(intro)
  - 封面规则(coverUrl)
  - 详情页url规则(bookUrl)

### 6、书源之「详情」

  - 预处理规则(bookInfoInit)

    - 只能使用正则之AllInOne或者js

    - 正则之AllInOne必须以`:`开头

    - js的返回值需要是json对象，例：

      ```
      <js>
      (function(){
      	return {
      		a:"圣墟",
      		b:"辰东",
      		c:"玄幻",
      		d:"200万字",
      		e:"第两千章 辰东肾虚",
      		f:"在破败中崛起，在寂灭中复苏。沧海成尘，雷电枯竭...",
      		g:"https://bookcover.yuewen.com/qdbimg/349573/1004608738/300",
      		h:"https://m.qidian.com/book/1004608738"
      	};
      })()
      </js>
      ```
      
      此时，书名规则填`a`，作者规则填`b`，分类规则填`c`，字数规则填`d`，最新章节规则填`e`，简介规则`f`，封面规则填`g`，目录URL规则填`h`
    
  - 书名规则(name)
  - 作者规则(author)
  - 分类规则(kind)
  - 字数规则(wordCount)
  - 最新章节规则(lastChapter)
  - 简介规则(intro)
  - 封面规则(coverUrl)
  - 目录URL规则(tocUrl)

### 7、书源之「目录」
  - 目录列表规则(chapterList)
    
    - 首字符使用负号(`-`)可使列表反序
  - 章节名称规则(ruleChapterName)
  - 章节URL规则(chapterUrl)
  - VIP标识(isVip)
    
    - 当结果为`null` `false` `0` `""`时为非VIP
  - 章节信息(ChapterInfo)
    
    - 可调用java.timeFormat(timestamp: Long)将时间戳转为yyyy/MM/dd HH:mm格式的时间
  - 目录下一页规则(nextTocUrl)   
    
    - 可返回list或者string
    - js中返回 `[]`或 `null`或 `""`时停止加载下一页


### 8、书源之「正文」
  + 正文规则(content)

    - 如下示例，在详情页(目录页)和正文使用webView加载，例：

      ```
      {
        "bookSourceName": "猫耳FM",
        "bookSourceType": 1,
        "bookSourceUrl": "https://www.missevan.com",
        "customOrder": 0,
        "enabled": false,
        "enabledExplore": false,
        "lastUpdateTime": 0,
        "ruleBookInfo": "{}",
        "ruleContent": "{\n  \"content\": \"https://static.missevan.com/{{//*[contains(@class,\\\"pld-sound-active\\\")]/@data-soundurl64}}\",\n  \"sourceRegex\": \"\",\n  \"webJs\": \"\"\n}",
        "ruleExplore": "{}",
        "ruleSearch": "{\n  \"author\": \"author\",\n  \"bookList\": \"$.info.Datas\",\n  \"bookUrl\": \"https://www.missevan.com/mdrama/drama/{{$.id}},{\\\"webView\\\":true}\",\n  \"coverUrl\": \"cover \",\n  \"intro\": \"abstract\",\n  \"kind\": \"{{$.type_name}},{{$.catalog_name}}\",\n  \"lastChapter\": \"newest \",\n  \"name\": \"name\",\n  \"wordCount\": \"catalog_name \"\n}",
        "ruleToc": "{\n  \"chapterList\": \"@css:.scroll-list.btn-groups>a\",\n  \"chapterName\": \"text\",\n  \"chapterUrl\": \"href##$##,{\\\"webView\\\":true}\"\n}",
        "searchUrl": "https://www.missevan.com/dramaapi/search?s={{key}}&page=1",
        "weight": 0
      }
      ```

      

  + 正文下一页URL规则(nextContentUrl)

  + webJs
    
    - 用于模拟鼠标点击等操作，必须有返回值（不为空，表示webjs执行成功，否则会无限循环），返回值会用于资源正则或正文中
    - 举个栗子，在webJs中执行了`getDecode()`，使正文部分解密：

    ```
      {
        "bookSourceGroup": "阅读3.0书源合集",
        "bookSourceName": "🔥斋书苑",
        "bookSourceType": 0,
        "bookSourceUrl": "https://www.zhaishuyuan.com",
        "bookUrlPattern": "",
        "customOrder": 11,
        "enabled": false,
        "enabledExplore": false,
        "exploreUrl": "男生书库::/shuku/0_1_0_0_0_{{page}}_0_0\n男频连载::/shuku/0_2_0_0_0_{{page}}_0_0\n男频完结::/shuku/0_3_0_0_0_{{page}}_0_0\n添加时间::/shuku/0_1_0_0_8_{{page}}_0_0\n总点击榜::/shuku/0_1_0_0_2_{{page}}_0_0\n月点击榜::/shuku/0_1_0_0_5_{{page}}_0_0\n周点击榜::/shuku/0_1_0_0_4_{{page}}_0_0\n总推荐榜::/shuku/0_1_0_0_1_{{page}}_0_0\n月推荐榜::/shuku/0_1_0_0_7_{{page}}_0_0\n周推荐榜::/shuku/0_1_0_0_6_{{page}}_0_0\n总收藏榜::/shuku/0_1_0_0_3_{{page}}_0_0\n总字数榜::/shuku/0_1_0_0_9_{{page}}_0_0\n玄幻奇幻::/shuku/1_1_0_0_0_{{page}}_0_0\n东方玄幻::/shuku/1_1_0_11_0_{{page}}_0_0\n异世大陆::/shuku/1_1_0_12_0_{{page}}_0_0\n史诗奇幻::/shuku/1_1_0_13_0_{{page}}_0_0\n异类兽族::/shuku/1_1_0_14_0_{{page}}_0_0\n历史神话::/shuku/1_1_0_15_0_{{page}}_0_0\n王朝争霸::/shuku/1_1_0_16_0_{{page}}_0_0\n高武世界::/shuku/1_1_0_17_0_{{page}}_0_0\n剑与魔法::/shuku/1_1_0_18_0_{{page}}_0_0\n二次元　::/shuku/1_1_0_19_0_{{page}}_0_0\n武侠仙侠::/shuku/2_1_0_0_0_{{page}}_0_0\n古典仙侠::/shuku/2_1_0_21_0_{{page}}_0_0\n修真文明::/shuku/2_1_0_22_0_{{page}}_0_0\n现代修真::/shuku/2_1_0_23_0_{{page}}_0_0\n神话修真::/shuku/2_1_0_24_0_{{page}}_0_0\n传统武侠::/shuku/2_1_0_25_0_{{page}}_0_0\n浪子异侠::/shuku/2_1_0_26_0_{{page}}_0_0\n国术武技::/shuku/2_1_0_27_0_{{page}}_0_0\n武侠幻想::/shuku/2_1_0_28_0_{{page}}_0_0\n幻想修仙::/shuku/2_1_0_29_0_{{page}}_0_0\n都市青春::/shuku/3_1_0_0_0_{{page}}_0_0\n都市生活::/shuku/3_1_0_31_0_{{page}}_0_0\n官场沉浮::/shuku/3_1_0_32_0_{{page}}_0_0\n娱乐明星::/shuku/3_1_0_33_0_{{page}}_0_0\n乡土小说::/shuku/3_1_0_34_0_{{page}}_0_0\n异术超能::/shuku/3_1_0_35_0_{{page}}_0_0\n现实百态::/shuku/3_1_0_36_0_{{page}}_0_0\n校园青春::/shuku/3_1_0_37_0_{{page}}_0_0\n历史军事::/shuku/4_1_0_0_0_{{page}}_0_0\n架空历史::/shuku/4_1_0_41_0_{{page}}_0_0\n上古先秦::/shuku/4_1_0_42_0_{{page}}_0_0\n秦汉三国::/shuku/4_1_0_43_0_{{page}}_0_0\n两晋隋唐::/shuku/4_1_0_44_0_{{page}}_0_0\n五代十国::/shuku/4_1_0_45_0_{{page}}_0_0\n两宋元明::/shuku/4_1_0_46_0_{{page}}_0_0\n清史民国::/shuku/4_1_0_47_0_{{page}}_0_0\n外国历史::/shuku/4_1_0_48_0_{{page}}_0_0\n历史传记::/shuku/4_1_0_49_0_{{page}}_0_0\n军事战争::/shuku/4_1_0_410_0_{{page}}_0_0\n抗战烽火::/shuku/4_1_0_411_0_{{page}}_0_0\n战争幻想::/shuku/4_1_0_412_0_{{page}}_0_0\n科幻灵异::/shuku/5_1_0_0_0_{{page}}_0_0\n未来世界::/shuku/5_1_0_51_0_{{page}}_0_0\n星际文明::/shuku/5_1_0_52_0_{{page}}_0_0\n宇宙练功::/shuku/5_1_0_53_0_{{page}}_0_0\n超级科技::/shuku/5_1_0_54_0_{{page}}_0_0\n时空穿梭::/shuku/5_1_0_55_0_{{page}}_0_0\n进化变异::/shuku/5_1_0_56_0_{{page}}_0_0\n末世危机::/shuku/5_1_0_57_0_{{page}}_0_0\n灵异鬼怪::/shuku/5_1_0_58_0_{{page}}_0_0\n恐怖惊悚::/shuku/5_1_0_59_0_{{page}}_0_0\n悬疑侦探::/shuku/5_1_0_510_0_{{page}}_0_0\n寻墓探险::/shuku/5_1_0_511_0_{{page}}_0_0\n风水秘术::/shuku/5_1_0_512_0_{{page}}_0_0\n游戏竞技::/shuku/6_1_0_0_0_{{page}}_0_0\n虚拟网游::/shuku/6_1_0_61_0_{{page}}_0_0\n游戏异界::/shuku/6_1_0_61_0_{{page}}_0_0\n体育竞技::/shuku/6_1_0_61_0_{{page}}_0_0\n游戏生涯::/shuku/6_1_0_61_0_{{page}}_0_0\n电子竞技::/shuku/6_1_0_61_0_{{page}}_0_0\n弈林春秋::/shuku/6_1_0_61_0_{{page}}_0_0\n女生书库::/shuku/9_1_0_0_0_{{page}}_0_0\n女频连载::/shuku/9_2_0_0_0_{{page}}_0_0\n女频完结::/shuku/9_3_0_0_0_{{page}}_0_0\n添加时间::/shuku/9_1_0_0_8_{{page}}_0_0\n总点击榜::/shuku/9_1_0_0_2_{{page}}_0_0\n月点击榜::/shuku/9_1_0_0_5_{{page}}_0_0\n周点击榜::/shuku/9_1_0_0_4_{{page}}_0_0\n总推荐榜::/shuku/9_1_0_0_1_{{page}}_0_0\n月推荐榜::/shuku/9_1_0_0_7_{{page}}_0_0\n周推荐榜::/shuku/9_1_0_0_6_{{page}}_0_0\n总收藏榜::/shuku/9_1_0_0_3_{{page}}_0_0\n总字数榜::/shuku/9_1_0_0_9_{{page}}_0_0\n豪门总裁::/shuku/9_1_0_91_0_{{page}}_0_0\n都市生活::/shuku/9_1_0_92_0_{{page}}_0_0\n青春校园::/shuku/9_1_0_93_0_{{page}}_0_0\n都市异能::/shuku/9_1_0_94_0_{{page}}_0_0\n星际科幻::/shuku/9_1_0_95_0_{{page}}_0_0\n游戏竞技::/shuku/9_1_0_96_0_{{page}}_0_0\n灵异推理::/shuku/9_1_0_97_0_{{page}}_0_0\n婚恋情缘::/shuku/9_1_0_98_0_{{page}}_0_0\n官场沉浮::/shuku/9_1_0_99_0_{{page}}_0_0\n娱乐明星::/shuku/9_1_0_910_0_{{page}}_0_0\n穿越架空::/shuku/9_1_0_911_0_{{page}}_0_0\n经商种田::/shuku/9_1_0_912_0_{{page}}_0_0\n玄幻仙侠::/shuku/9_1_0_913_0_{{page}}_0_0\n历史军事::/shuku/9_1_0_914_0_{{page}}_0_0\n宫闱宅斗::/shuku/9_1_0_915_0_{{page}}_0_0\n重生复仇::/shuku/9_1_0_916_0_{{page}}_0_0\n豪门恩怨::/shuku/9_1_0_917_0_{{page}}_0_0",
        "lastUpdateTime": 0,
        "loginUrl": "",
        "ruleBookInfo": "{\n  \"author\": \"@css:[property=og:novel:author]@content\",\n  \"coverUrl\": \"@css:[property=og:image]@content\",\n  \"intro\": \"@css:#bookintro@html\",\n  \"kind\": \"@css:[property=og:novel:category]@content\",\n  \"lastChapter\": \"@css:[property=og:novel:latest_chapter_name]@content\",\n  \"name\": \"@css:[property=og:novel:book_name]@content\",\n  \"tocUrl\": \"@css:[property=og:novel:read_url]@content\",\n  \"wordCount\": \"@css:.count li:eq(3)>span@text\"\n}",
        "ruleContent": "{\n  \"content\": \"all\",\n  \"nextContentUrl\": \"\",\n  \"webJs\": \"getDecode();$('#content').html();\"\n}",
        "ruleExplore": "{\n  \"author\": \"//li[4]/a/text()\",\n  \"bookList\": \"//ul[count(../ul)>10]\",\n  \"bookUrl\": \"//li[3]/a/@href\",\n  \"coverUrl\": \"##/book/(\\\\d+)##https://img.zhaishuyuan.com/bookpic/s$1.jpg###\",\n  \"intro\": \"//li[6]/text()\",\n  \"kind\": \"//li[2]/text()##\\\\[|\\\\]\",\n  \"lastChapter\": \"//span/a/text()\",\n  \"name\": \"//li[3]/a/text()\",\n  \"wordCount\": \"//li[5]/text()\"\n}",
        "ruleSearch": "{\n  \"author\": \"//dd[2]/span[1]/text()\",\n  \"bookList\": \"//*[@id=\\\"sitembox\\\"]/dl\",\n  \"bookUrl\": \"//dt/a/@href\",\n  \"coverUrl\": \"//img/@_src\",\n  \"intro\": \"//dd[3]/html()\",\n  \"kind\": \"//dd[2]/span[3]/text()\",\n  \"lastChapter\": \"//dd[4]/a/text()\",\n  \"name\": \"//h3/a//text()\",\n  \"wordCount\": \"//dd[2]/span[4]/text()\"\n}",
        "ruleToc": "{\n  \"chapterList\": \":href=\\\"(/chapter/[^\\\"]*)\\\"[^>]*>([^<]*)</a>([^<]*)\",\n  \"chapterName\": \"$2\",\n  \"chapterUrl\": \"$1,{\\\"webView\\\":true}\",\n  \"nextTocUrl\": \"//strong/following-sibling::a/@href\",\n  \"updateTime\": \"$3\"\n}",
        "searchUrl": "/search/,{\n  \"charset\": \"gbk\",\n  \"method\": \"POST\",\n  \"body\": \"page={{page}}&key={{key}}\"\n}",
        "weight": 0
      }
    ```
    
  + 资源正则(sourceRegex)
    
    - 用于嗅探
    
    - 一般情况下的无脑教程如下＿φ( °-°)/ 
    
      - 章节链接后面加 `,{"webView":true}`٩(๑❛ᴗ❛๑)۶，不要洒敷敷的写成 `tag.a@href,{"webView":true}`或`$.link,{"webView":true}`
      - 在有嗅探功能的浏览器（如：via、x浏览器等）中，输入章节链接。注意(｡•́︿•̀｡) `千万别带,{"webView":true}` (╯﹏╰)b
      - 媒体开始播放后使用浏览器的嗅探功能，查看资源的链接
      - 在资源正则里填写资源链接的正则，一般写`.*\.(mp3|mp4).*`这个就可以了
      - 最后在正文填写 `<js>result</js>`ヾ(@^▽^@)ノ
    
    - 如下示例，在正文嗅探mp3和mp4的资源：
    
      ```
      {
        "bookSourceName": "猫耳FM",
        "bookSourceType": 1,
        "bookSourceUrl": "https://www.missevan.com",
        "customOrder": 0,
        "enabled": false,
        "enabledExplore": false,
        "lastUpdateTime": 0,
        "ruleBookInfo": "{}",
        "ruleContent": "{\n  \"content\": \"<js>result</js>\",\n  \"sourceRegex\": \".*\\\\.(mp3|mp4)\",\n  \"webJs\": \"\"\n}",
        "ruleExplore": "{}",
        "ruleSearch": "{\n  \"author\": \"author\",\n  \"bookList\": \"$.info.Datas\",\n  \"bookUrl\": \"https://www.missevan.com/mdrama/drama/{{$.id}},{\\\"webView\\\":true}\",\n  \"coverUrl\": \"cover \",\n  \"intro\": \"abstract\",\n  \"kind\": \"{{$.type_name}},{{$.catalog_name}}\",\n  \"lastChapter\": \"newest \",\n  \"name\": \"name\",\n  \"wordCount\": \"catalog_name \"\n}",
        "ruleToc": "{\n  \"chapterList\": \"@css:.scroll-list.btn-groups>a\",\n  \"chapterName\": \"text\",\n  \"chapterUrl\": \"href##$##,{\\\"webView\\\":true}\"\n}",
        "searchUrl": "https://www.missevan.com/dramaapi/search?s={{key}}&page=1",
        "weight": 0
      }
      ```
    
      
    
### 9、补充说明

- 显示js的报错信息

  ```
  (function(result){
      try{
            // 处理result
            // ...
            // 当返回结果为字符串时
            return result;
            // 当返回结果为列表时
            return list;
      }
      catch(e){
            // 当返回结果为字符串时
            return ""+e;
            // 当返回结果为列表时
            return [""+e];  //列表对应名称处填<js>""+result</js>查看
      }
  })(result);
  ```

- 请善用调试功能

  - 调试搜索

    输入关键字，如：`系统`

  - 调试发现

    输入发现URL，如：`月票榜::https://www.qidian.com/rank/yuepiao?page={{page}}`

  - 调试详情页

    输入详情页URL，如：`https://m.qidian.com/book/1015609210`
    
  - 调试目录页

    输入目录页URL，如：`++https://www.zhaishuyuan.com/read/30394`

  - 调试正文页

    输入正文页URL，如：`--https://www.zhaishuyuan.com/chapter/30394/20940996`

- 无脑`{"webView":true}`很方便

- 特别注意用`JSON.stringify()`方法时，需要保证JSON对象的value都是`JavaScript`的`String`类型(在阅读3.0中)

- 附：

  - 书源一

    ```
    {
      "bookSourceGroup": "CSS; 正则",
      "bookSourceName": "🔥小说2016",
      "bookSourceType": 0,
      "bookSourceUrl": "https://www.xiaoshuo2016.com",
      "bookUrlPattern": "",
      "customOrder": 0,
      "enabled": true,
      "enabledExplore": false,
      "exploreUrl": "",
      "lastUpdateTime": 0,
      "loginUrl": "",
      "ruleBookInfo": "{\n  \"author\": \"##:author\\\"[^\\\"]+\\\"([^\\\"]*)##$1###\",\n  \"coverUrl\": \"##og:image\\\"[^\\\"]+\\\"([^\\\"]*)##$1###\",\n  \"intro\": \"##:description\\\"[^\\\"]+\\\"([\\\\w\\\\W]*?)\\\"/##$1###\",\n  \"kind\": \"##:category\\\"[^\\\"]+\\\"([^\\\"]*)##$1###\",\n  \"lastChapter\": \"##_chapter_name\\\"[^\\\"]+\\\"([^\\\"]*)##$1###\",\n  \"name\": \"##:book_name\\\"[^\\\"]+\\\"([^\\\"]*)##$1###\",\n  \"tocUrl\": \"\"\n}",
      "ruleContent": "{\n  \"content\": \"@css:.articleDiv p@textNodes##搜索.*手机访问|一秒记住.*|.*阅读下载|<!\\\\[CDATA\\\\[|\\\\]\\\\]>\",\n  \"nextContentUrl\": \"\"\n}",
      "ruleExplore": "{}",
      "ruleSearch": "{\n  \"author\": \"@css:p:eq(2)>a@text\",\n  \"bookList\": \"@css:li.clearfix\",\n  \"bookUrl\": \"@css:.name>a@href\",\n  \"coverUrl\": \"@css:img@src\",\n  \"intro\": \"@css:.note.clearfix p@text\",\n  \"kind\": \"@css:.note_text,p:eq(4)@text\",\n  \"lastChapter\": \"@css:p:eq(3)@text\",\n  \"name\": \"@css:.name@text\"\n}",
      "ruleToc": "{\n  \"chapterList\": \"-:<li><a[^\\\"]+\\\"([^\\\"]*)\\\">([^<]*)\",\n  \"chapterName\": \"$2\",\n  \"chapterUrl\": \"$1\",\n  \"nextTocUrl\": \"\"\n}",
      "searchUrl": "/modules/article/search.php?searchkey={{key}}&submit=&page={{page}},{\n  \"charset\": \"gbk\"\n}",
      "weight": 0
    }
    ```

  - 书源二

    ```
    {
      "bookSourceGroup": "XPath; 正则",
      "bookSourceName": "🔥采墨阁手机版",
      "bookSourceType": 0,
      "bookSourceUrl": "https://m.caimoge.com",
      "bookUrlPattern": "",
      "customOrder": 0,
      "enabled": true,
      "enabledExplore": false,
      "exploreUrl": "",
      "lastUpdateTime": 0,
      "loginUrl": "",
      "ruleBookInfo": "{\n  \"author\": \"//*[@property=\\\"og:novel:author\\\"]/@content\",\n  \"coverUrl\": \"//*[@property=\\\"og:image\\\"]/@content\",\n  \"intro\": \"//*[@property=\\\"og:description\\\"]/@content\",\n  \"kind\": \"//*[@property=\\\"og:novel:category\\\"]/@content\",\n  \"lastChapter\": \"//*[@id=\\\"newlist\\\"]//li[1]/a/text()\",\n  \"name\": \"//*[@property=\\\"og:novel:book_name\\\"]/@content\",\n  \"tocUrl\": \"//a[text()=\\\"阅读\\\"]/@href\"\n}",
      "ruleContent": "{\n  \"content\": \"//*[@id=\\\"content\\\"]\",\n  \"nextContentUrl\": \"\"\n}",
      "ruleExplore": "{}",
      "ruleSearch": "{\n  \"author\": \"//dd[2]/text()\",\n  \"bookList\": \"//*[@id=\\\"sitebox\\\"]/dl\",\n  \"bookUrl\": \"//dt/a/@href\",\n  \"coverUrl\": \"//img/@src\",\n  \"kind\": \"//dd[2]/span/text()\",\n  \"lastChapter\": \"\",\n  \"name\": \"//h3/a/text()\"\n}",
      "ruleToc": "{\n  \"chapterList\": \":href=\\\"(/read[^\\\"]*html)\\\">([^<]*)\",\n  \"chapterName\": \"$2\",\n  \"chapterUrl\": \"$1\",\n  \"nextTocUrl\": \"//*[@id=\\\"pagelist\\\"]/*[position()>1]/@value\"\n}",
      "searchUrl": "/search.html,{\n  \"method\": \"POST\",\n  \"body\": \"searchkey={{key}}\"\n}",
      "weight": 0
    }
    ```

  - 书源三

    ```
    {
      "bookSourceGroup": "JSon",
      "bookSourceName": "猎鹰小说网",
      "bookSourceType": 0,
      "bookSourceUrl": "http://api.book.lieying.cn",
      "customOrder": 0,
      "enabled": true,
      "enabledExplore": false,
      "header": "{\n  \"User-Agent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36\"\n}",
      "lastUpdateTime": 0,
      "ruleBookInfo": "{}",
      "ruleContent": "{\n  \"content\": \"$.chapter.body\"\n}",
      "ruleExplore": "{}",
      "ruleSearch": "{\n  \"author\": \"$.author\",\n  \"bookList\": \"$..books[*]\",\n  \"bookUrl\": \"/Book/getChapterListByBookId?bookId={$._id}\",\n  \"coverUrl\": \"$.cover\",\n  \"intro\": \"$.shortIntro\",\n  \"kind\": \"$.minorCate\",\n  \"lastChapter\": \"$.lastChapter\",\n  \"name\": \"$.title\"\n}",
      "ruleToc": "{\n  \"chapterList\": \"$.chapterInfo.chapters.[*]\",\n  \"chapterName\": \"$.title\",\n  \"chapterUrl\": \"$.link\"\n}",
      "searchUrl": "/Book/search?query={{key}}&start={{(page-1)*20}}&limit=40&device_type=android&app_version=165",
      "weight": 0
    }
    ```

