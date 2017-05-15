# 适应场景
本脚手架适合桌面版且需要支持ie8等老浏览器  

# 框架
* require做模块的加载  
* jquery做dom操作  

## require加载流程
1.在html的body中约定 id="require" module="页面名" child="子页面名"  
2.在config.js(require配置文件)中加载对应的页面js文件  
3.页面的js文件需要暴露init方法,或者当有子页面的时候需要将init方法改成子页面名的方法  

# 目录结构
-dist : 构建工具生成的目录  
-mock : 拦截ajax请求,模拟  
-node_modules  
-resource : 开发目录  
-view : html目录  

# package.json文件说明
## devDependencies
* browser-sync : 开发调试神器
* concurrently : 可同时运行监控
* gulp-changed : 只通过更改过的文件
* gulp-clean-css : css压缩
* gulp-concat : js合并
* gulp-file-include : html合并
* gulp-postcss : 处理css
* gulp-rename : 重命名
* gulp-uglify : 压缩
* gulp-watch : 监控
* json-server : 请求模拟

## scripts
* build : 运行js,css,html的一系列操作
* init : 运行js,css,html的一系列操作并且运行browser-sync
* mock_server : 运行模拟服务器
* dev : 运行init和mock_server