## js

1. 让图文不可复制
  ```css
  user-select: none;
  ```

   延伸：那有些网页为了尊重原创，复制的文本 都会被加上一段来源说明，是如何做到的呢？

   ```js
  1. 监听copy事件(document.execCommand('copy'))，并阻止默认行为
  2. window.getSelection()获取选中的内容，加上版权信息
  3. ClipboardEvent.clipboardData.setData()设置到剪切板
   ```

2. 实现多行文本溢出显示

   1. webkit

   ```CSS
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
   overflow: hidden;
   ```

   2. js

3. js判断设备来源

   navigator.userAgent

   ```js
   function deviceType(){
       var ua = navigator.userAgent;
       var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];    
       for(var i=0; i<len,len = agent.length; i++){
           if(ua.indexOf(agent[i])>0){         
               break;
           }
       }
   }
   deviceType();
   window.addEventListener('resize', function(){
       deviceType();
   })

   // 微信的 有些不太一样
   function isWeixin(){
       var ua = navigator.userAgent.toLowerCase();
       if(ua.match(/MicroMessenger/i)=='micromessenger'){
           return true;
       }else{
           return false;
       }
   }
   ```

4. 渲染优化

   1. css3代替js动画
   2. 小图标 base64 编码
   3. Gzip,CDN

5. 事件的各个阶段

   捕获阶段，目标阶段，冒泡阶段

   addEventListener第三个参数：

   ​	true 捕获阶段 由外向里响应事件

   ​	false 冒泡阶段 由里向外响应事件

6. let const var

   let 块作用域，没有提升

   const 创建一个值的只读引用（指针），值类型改变报错，数组，对象改变某个value不会报错

7. ​






## 代码题

1. 快速乱序一个数组

   ```js
   var arr = [1,2,3,4,5,6,7,8,9,10];
   arr.sort(() => Math.random() - 0.5)
   console.log(arr)
   ```

2. ​