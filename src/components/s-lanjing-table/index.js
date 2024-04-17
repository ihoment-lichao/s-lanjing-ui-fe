import sljTable from "./index.vue";

sljTable.install = (app) => {
  app.component(sljTable.name, sljTable);
};
export default sljTable;
