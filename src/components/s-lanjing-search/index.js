import sljSearch from "./index.vue";

sljSearch.install = (app) => {
  app.component(sljSearch.name, sljSearch);
};
export default sljSearch;