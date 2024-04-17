import sljTable from "./s-lanjing-table/index.js";
import sljSearch from "./s-lanjing-search/index.js";

//按需引入
export { sljTable, sljSearch };
const components = [sljTable, sljSearch];
const sljUI = {
  install(app) {
    components.forEach((item) => {
      app.use(item);
    });
  },
};
export default sljUI;
