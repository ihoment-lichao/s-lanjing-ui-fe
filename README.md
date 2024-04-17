### npm组件仓库工程 ###

> 本地开发
  *  src/components  组件源文件
  *  src/views 对应组件预览文件（需在router/index.js添加路由）

> npm发布
  1. 本地开发完成后，必须修改package.json文件version版本号，每次加1。否则无法上传
  2. yarn build 打包后生产dist文件
  3. npm publish 

### 组件使用 ###
1. 安装 npm i s-lanjing-ui-fe --save / yarn add s-lanjing-ui-fe
2. import lanjingUi from "s-lanjing-ui-fe"
3. import "s-lanjing-ui-fe/dist/style.css";
4. app.use(lanjingUi)
5. 页面直接使用<s-lanjing-table/>，目前支持以下组件名，
   |    中文组件名  |   英文组件名    |
   |    :---       |    :---       |
   |     表格      |   s-lanjing-table    |
   |    搜索栏     |    s-lanjing-search   |