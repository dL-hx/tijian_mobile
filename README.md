## `antd-mobile` with create-react-app demo

## 图标
> https://www.easyicon.net/
>

## 微信支付流程
1. https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_4


2. 微信JS-SDK说明文档
https://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3

JS-SDK 文档(官网)
https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html



3. 参考文章
+ 1. https://blog.csdn.net/HuangLin_Developer/article/details/89323610?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522159410249619725222462544%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=159410249619725222462544&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v3~pc_rank_v2-4-89323610.first_rank_ecpm_v3_pc_rank_v2&utm_term=react+weixin-js-sdk%E5%B8%B8%E8%A7%81%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95


+ 2. 调用微信支付wx.chooseWXPay 详细流程
https://blog.csdn.net/fangxin222/article/details/85002430

+ 3. jweixin-1.1.0.js微信接口“分享给朋友”文字和图片配置
      https://www.cnblogs.com/mmzuo-798/p/6744947.html

+ 4. vue 微信公众号支付 jssdk jsapi实现微信支付（完整版
https://blog.csdn.net/weixin_42124196/article/details/88971031

+ 5. 配置需要使用微信支付的详细支付地址
https://www.cnblogs.com/achengmu/p/7018034.html  




## React 集成JS-SDK
JS-SDK: 微信JS-SDK是微信公众平台面向网页开发者提供的基于微信内的网页开发工具包。
通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫等微信特有的能力，为微信用户提供更优质的网页体验。

1. 在项目目录下执行
> $ npm install weixin-js-sdk --save

2. 在需要使用js-sdk的页面引入sdk
> import wx from 'weixin-js-sdk';

3. 之后的步骤和文档介绍的就一样了。
附上完整的代码
``` javascript

```

## React PDF
> https://mozilla.github.io/pdf.js/examples/index.html#interactive-examples


https://github.com/forthealllight/blog/issues/27

https://blog.csdn.net/ime33/article/details/103088711

https://blog.csdn.net/zhongmei121/article/details/90066884

https://segmentfault.com/a/1190000021837138


## example

React实现浏览器阅读PDF文件
https://blog.csdn.net/weixin_43225598/article/details/96494281

解决react项目中PDF的显示与打印问题
https://www.jianshu.com/p/58c7ef1f8530



## 登录密码
> 19666663333
> 8888


## git 创建分支
https://blog.csdn.net/csshuke/article/details/79454032

## git 如何把master分支代码合并到自己的分支
https://blog.csdn.net/dengying1570/article/details/102193785
```
master分支的代码领先自己的分支,git 如何把master分支代码合并到自己的分支


1.首先切换到主分支

git checkout master
2.使用git pull 把领先的主分支代码pull下来

git pull
3.切换到自己的分支

git checkout xxx(自己的分支)
4.把主分支的代码merge到自己的分支

git merge master
5.git push推上去ok完成,现在 你自己分支的代码就和主分支的代码一样了

git push
```

```
1.创建本地分支
git branch 分支名，例如：git branch 2.0.1.20120806
注：2.0.1.20120806是分支名称，可以随便定义。

2.切换本地分支
git checkout 分支名，例如从master切换到分支：git checkout 2.0.1.20120806

3.远程分支就是本地分支push到服务器上。比如master就是一个最典型的远程分支（默认）。
git push origin 2.0.1.20120806

4.远程分支和本地分支需要区分好，所以，在从服务器上拉取特定分支的时候，需要指定远程分支的名字。
git checkout --track origin/2.0.1.20120806
注意该命令由于带有--track参数，所以要求git1.6.4以上！这样git会自动切换到分支。

5.提交分支数据到远程服务器
git push origin <local_branch_name>:<remote_branch_name>
例如：
git push origin 2.0.1.20120806:2.0.1.20120806
一般当前如果不在该分支时，使用这种方式提交。如果当前在 2.0.1.20120806 分支下，也可以直接提交
git push

6.删除远程分支
git push origin :develop

-----------------------------------------------------------

1,从已有的分支创建新的分支(如从master分支),创建一个dev分支

Git checkout -b dev

2,创建完可以查看一下,分支已经切换到dev

git branch

    * dev

    master

3,提交该分支到远程仓库

git push origin dev

4,测试从远程获取dev

git pull origin dev

```


## 真机预览地址
> http://192.168.2.133:3000

> 使用ngrok 进行本地调试
>  将本机网站映射到外网
> ngrok http [端口号]
ngrok http 3000


## 接口地址
> http://192.168.2.69:10001/swagger-ui.html
>
>
> http://122.51.89.143:3000/project/11/interface/api/11
>
> 账号名："admin@admin.com"，密码："admin123"
>


{"customerIdStr":"98805586395137","customerId":98805586395137,"customerName":"张三","sex":"男","mobile":"18229019743","married":true,"openId":"odzcH017kKec4hCsLtF4RgSM3XuE","idNumber":"142702199610111213","address":"","age":null,"birthday":null,"job":"","createBy":98805586395137,"createTime":1593414975000,"updateBy":98805586395137,"updateTime":1593414975000,"remark":null}

## 真机预览
> 1.查询本机ip , 确保在同一局域网下
> $ ipconfig 
>
>  IPv4 地址 . . . . . . . . . . . . : 192.168.2.133
>
> 2.拼接ip地址 + 项目端口号(3000)
> http://192.168.2.133:3000
> 
> 即可在手机端进行预览



## 阻止事件冒泡
在没有涉及到原生事件注册只有react事件时，用e.stopPropagation()阻止冒泡
```jsx
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  handleClickTestBox = (e) => {
    console.warn('handleClickTestBox: ', e);
  }

  handleClickTestBox2 = (e) => {
    console.warn('handleClickTestBox2: ', e);
  }

  handleClickTestBox3 = (e) => {
    e.stopPropagation();
    console.warn('handleClickTestBox3: ', e);
  }

  render() {
    return (
      <div
        className="test-box"
        onClick={this.handleClickTestBox}
      >
        <div
          onClick={this.handleClickTestBox2}
        >
          <div
            onClick={this.handleClickTestBox3}
          >
          </div>
        </div>
      </div>
    );
  }
}

export default App;

```
https://blog.csdn.net/w799766/article/details/82591372


## 向事件处理程序传递参数(事件对象)
给函数传递额外参数：以下两种方式

<button onClick = { (e)=> this.handleClick( id,e ) }></button>
<button onClick = { this.handleClick.bind( this,id ) }></button>

上述两种方式是等价的，分别通过 箭头函数 和 Function.prototype.bind 来实现。

在上面两种情况下，React的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，
而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

## 导入redux
购物车功能的实现
1、 商品单选、全选、反选功能
2、 商品添加、删除功能
3、 商品价格自动计算

----
1、利用redux操作商品的选中状态
2、全选与取消全选
3、动态reduce计算价格
4、结算取出商品id





> https://blog.csdn.net/Vue2018/article/details/101214267
### 1. 配置redux 组件包

Provider 组件实现
1. 导入Provider 组件, 在react-redux 中进行导入
2. 需要利用Provider 组件, 对我们整个结构进行包裹
3. 给我们Provider 组件设置 store 的属性, 而 这个值就是我们 通过createStore 构建出来的store 实例对象


ComA 发送action 
1. 导入connect 
2. 利用connect 对组件进行加强
    connect(要接收组件的数据 的函数, 要发送action的函数)(要加强的组件)
3. 实现connect 第二个参数
4. 构建了一个函数 mapDispatchToProps(dispatch)
    dispatch  : 就是用来 发送action的
    
5. 在这个函数里面就可以返回一个对象
    key 是方法名
    value: 调用 dispatch 去发送action
    
6. 在组件的内部, 就可以通过this.props 来拿到这个方法
    (拿到方法后进行调用)
    
redux 案例
https://www.bilibili.com/video/BV1oE411V7RW?p=14


{
  comboDiscount: 70
  comboId: 1
  comboImg: "https://wm.source.wiimedia.cn/hemeiyoujia/taocan1.jpg"
  comboPrice: 200
  comboType: 1
  createBy: 1
  orderId: 100065333018625
  personCount: 3
  title: "测试套餐"
  updateBy: 1
}










