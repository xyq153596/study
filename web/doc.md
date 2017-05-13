# 思路
gulp-file-include 用于html的合并与生成
sass用于css的合并与生成

# 适应场景
本脚手架适合桌面版且需要支持ie8等老浏览器

# 框架
require做模块的加载  
jquery做dom操作

## require加载流程
1.在html的body中约定 id="require" module="页面名" child="子页面名"
2.在config.js(require配置文件)中加载对应的页面js文件
3.页面的js文件需要暴露init方法,或者当有子页面的时候需要将init方法改成子页面名的方法
