<template>
  <div class="table-views-demo">
    <SljTable
      rowKey="id"
      height="300px"
      :tableData="tableData"
      :loading="tableLoading"
      :tablecolumn="tablecolumn"
      :selectionObj="selectionObj"
      @sortChange="handleSortChange"
      @selectionChange="selectionChange"
    >
      <template v-slot:custom="{ index, rowData }">
        <div class="table-custom-column">
          <span>{{ rowData.custom }}</span>
          <span>+{{ index + "" }}</span>
        </div>
      </template>
    </SljTable>
  </div>
</template>

<script>
import * as confData from "./config.js";
import SljTable from "@/components/s-lanjing-table/index.vue";
export default {
  name: "表格",
  components: { SljTable },
  data() {
    return {
      tableLoading: false,
      selectionObj: { show: true, fixed: true },
      tableData: confData.tableData,
      tablecolumn: confData.tablecolumn,
    };
  },
  methods: {
    //选中行
    selectionChange(selectedRow) {
      console.log(selectedRow);
    },
    //列排序
    handleSortChange({ orderBy, desc }) {
      console.log(orderBy);
      console.log(desc);
      if (desc) {
        this.tableData=this.tableData.sort((x, y) => {
          return x[orderBy] - y[orderBy];
        });
        // this.tableData=[]
      } else {
        this.tableData=this.tableData.sort((x, y) => {
          return y[orderBy] - x[orderBy];
        });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.table-custom-column {
  color: red;
  font-family: PingFangSC-Medium, PingFang SC;
}
</style>
