import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
//全局scss入口文件
import "@/scss/index.scss";
//全局唯一id,数据深拷贝
import { newUuid, deepClone } from "./utils/tool.js";
app.config.globalProperties.$newUuid = newUuid;
app.config.globalProperties.$deepClone = deepClone;
//引入插件
import router from "./router/index";
import store from "./store/index";
//引入elment，vite已动态按需引入，组件中文语言包
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//开发环境异常警告,方便调试
app.config.errorHandler = (err, vm, info) => {
  console.log("[全局异常]", err, vm, info);
};
//引入echarts
import * as echarts from "echarts";
app.config.globalProperties.$echarts = echarts;

//引入全局minxin
import mixin from "./mixins/index.js";
app.mixin(mixin);

import { deleteMessageBox, additionMessageBox } from "./utils/ui.js"; //封装element message
app.config.globalProperties.$delConfirm = deleteMessageBox;
app.config.globalProperties.$addConfirm = additionMessageBox;
app
  .use(ElementPlus, { locale, size: "default" })
  .use(router)
  .use(store)
  .mount("#app");
