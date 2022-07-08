# The shifter of vanmoof
shifter:变速转换器

> 案例source: [https://www.vanmoof.com/](https://www.vanmoof.com/en-NL/s3?color=dark)


![shifter](https://vanmoof-website-cdn.s3.eu-central-1.amazonaws.com/v1/assets/placeholders/s3/e-shifter.jpg)

## 流程分析

### 添加精灵到舞台

依次添加辐条（spokes）、无覆盖变速器（uncovered）、覆盖变速器（covered）到舞台

### 绑定鼠标滑过事件

鼠标滑过时，可以获取到对应位置坐标点
以坐标点为圆心，改变该区域covered透明度

### 绑定按钮按下、松开事件

按下时：
精灵缩放，展现整个自行车

以辐条中心为圆心，依次出现一圈圈径向滚动的粒子

当随着速度变大，最外圈粒子出现后，粒子速度放缓并保持

松开时：
恢复初始状态

## 相关文档
- PIXI：https://pixijs.com/
- GSAP：https://greensock.com/docs/v3/GSAP
