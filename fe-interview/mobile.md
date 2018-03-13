## 移动端

#### 一些概念

**viewport**

移动端浏览器在一个通常比设备屏幕更宽的“虚拟窗口”中渲染页面，这个“虚拟窗口”就是视口（viewport）

常见的使用：

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
   ```

**屏幕分辨率**

屏幕垂直和水平有多少个物理像素

**屏幕尺寸**

屏幕对角线的长度，单位英寸

**屏幕像素密度 dpi**

每英寸屏幕拥有的像素数

![dpi](http://img.hb.aicdn.com/d905056e3bde56b29eaa4afa6f477e7ad32cd447709-NyWgbQ_fw658)


**设备像素（物理像素）**

设备中的一个最微小的物理部件

**设备独立像素 dp** 

程序使用的虚拟像素（如css像素，我们常说的10px 就是它），然后右相关系统转换为物理像素

**设备像素比 dpr**

dpr = 物理像素 / 设备独立像素，在 js 中可以通过 `window.devicePixelRatio` 获取当前设备的dpr

拿 iPhone 6 举例：

| 设备     | 分辨率     | 设备独立像素 |屏幕尺寸 | dpi    |dpr|
| :------- | :--------- | :--------- | :------- | :----- | :----- |
| iPhone 6 | 750 * 1334 | 375 * 667 |4.7in    | 326dpi |2|

