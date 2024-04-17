<template>
  <div
    style="height: 100%"
    :class="{ 'table-parent-border': tableParentBorder }"
  >
    <el-table
      size="small"
      :border="border"
      :data="tableData"
      :class="tabClass ? tabClass : null"
      :showHeader="showHeader"
      :spanMethod="spanMethod ? spanMethod : null"
      element-loading-text="加载中..."
      v-loading="loading"
      :height="height ? height : null"
      :maxHeight="maxHeight ? maxHeight : null"
      :ref="tabRef ? tabRef : 'childTab'"
      :header-cell-style="setHeaderCellStyle"
      :cell-style="setCellStyle"
      @row-click="rowClick"
      @sort-change="sortByKey"
      @expand-change="expandChange"
      @selection-change="selectionChange"
      :row-key="rowKey ? rowKey : null"
      :expand-row-keys="expandRowKeys"
      show-overflow-tooltip
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      :default-expand-all="defaultExpandAll"
      :row-style="setRowStyle"
      :tree-props="treeProps"
      :row-class-name="rowClasName"
    >
      <!-- 详情内容展示 需要showExpand属性  -->
      <el-table-column v-if="showExpand" type="expand" width="50" fixed>
        <template #default="{ row, $index }">
          <slot name="expand" :expandRow="row" :index="$index"></slot>
        </template>
      </el-table-column>
      <!-- checkout复选框  selectionObj对象 {show: true, fixed: true}-->
      <el-table-column
        v-if="selectionObj.show"
        type="selection"
        align="center"
        width="50"
        :selectable="checkSelectable"
        :fixed="selectionObj.fixed ? true : false"
      >
      </el-table-column>
      <el-table-column
        v-for="(
          {
            prop,
            label,
            width,
            minWidth,
            sortBy,
            slotName,
            slotHeader,
            className,
            customFlag,
            fixed,
            align,
            formart,
            renderHeader,
          },
          index
        ) in tablecolumn"
        :key="index"
        :prop="prop ? prop : null"
        :label="label ? label : null"
        :width="width ? width : null"
        :min-width="minWidth ? minWidth : 100"
        :sort-by="sortBy ? sortBy : null"
        :sortable="sortBy ? (customFlag ? 'custom' : true) : null"
        :className="className ? className : null"
        :fixed="fixed ? fixed : null"
        :render-header="renderHeader ? renderHeader : null"
        :align="align ? align : 'left'"
      >
        <!-- 自定义表头 -->
        <template v-if="slotHeader" #header="{ row, $index }">
          <slot :name="slotHeader" :index="$index" :rowData="row"></slot>
        </template>
        <!-- 自定义内容 -->
        <template #default="{ row, $index }">
          <!-- 自定义tamplate -->
          <!-- prop没有值的情况 传整个row -->
          <div v-if="slotName">
            <slot
              :name="slotName"
              :data="prop ? row[prop] : null"
              :index="$index"
              :rowData="row"
            ></slot>
          </div>
          <span v-else>
            <!-- 新增内置支持数据自定义format模版，,formart: 'thousandths'
            formart: (val) => { return `$${val}` } } -->
            <span v-if="formart && typeof formart == 'function'">{{
              formart(row[prop] || 0)
            }}</span>
            <span
              v-else-if="
                formart &&
                typeof formart == 'string' &&
                (formart === 'thousandths' || formart === 'number')
              "
              >{{ formartThousandths(row[prop] || 0) }}</span
            >
            <span
              v-else-if="
                formart && typeof formart == 'string' && formart === 'ratio'
              "
              ><span v-if="row[prop]">{{ row[prop] }}%</span
              ><span v-else>0</span></span
            >
            <div
              class="text-overflow-ellipsis"
              v-else-if="
                formart && typeof formart == 'string' && formart === 'ellipsis'
              "
            >
              {{ row[prop] || "-" }}
            </div>
            <span
              v-else
              :class="{
                'children-placeholde':
                  (!row[treeProps.children] ||
                    !row[treeProps.children].length) &&
                  index === 0 &&
                  childrenPlaceholde,
              }"
              >{{ emptyText(row[prop]) }}</span
            >
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页插槽 -->
    <slot name="el-pagination"></slot>
  </div>
</template>
<script>
import { PropsType } from "@/utils/propsType.js";
import Sortable from "sortablejs";
export default {
  name: "s-lanjing-table",
  data() {
    return {};
  },
  emits: ["expandChange", "rowClick", "sortChange", "selectionChange"],
  computed: {
    setCellStyle() {
      let defaultStyle = {};
      return Object.assign(defaultStyle, this.cellStyle);
    },
    setRowStyle() {
      let defaultStyle = {
        height: "36px",
      };
      return Object.assign(defaultStyle, this.rowStyle);
    },
    setHeaderCellStyle() {
      let defaultStyle = {
        background: "#EEF3FA",
        height: "40px",
        color: "#A5AEBA",
      };
      return Object.assign(defaultStyle, this.headerCellStyle);
    },
  },
  props: {
    cellStyle: PropsType.Object, //表格cell样式
    rowStyle: PropsType.Object, // 表格行样式
    headerCellStyle: PropsType.Object, //表格cell样式
    tableData: PropsType.Array,
    tablecolumn: PropsType.Array,
    expandRowKeys: PropsType.Array,
    loading: PropsType.Boolean, //loading
    border: PropsType.Boolean, //是否显示纵向边框
    tableParentBorder: PropsType.BooleanTrue, //是否显示表格父元素边框
    showExpand: PropsType.Boolean, //是否展示详情行
    showSummary: PropsType.Boolean, //是否显示合计行
    summaryMethod: PropsType.Function, //自定义合计行函数
    defaultExpandAll: PropsType.Boolean, //是否默认展开所有行
    selectionObj: PropsType.Object, //是否展示详情行
    checkSelectable: PropsType.Function, // 行是否可勾选
    height: PropsType.Number, //表格高度
    maxHeight: PropsType.Number, //表格最大高
    tabRef: PropsType.String, //表格ref
    smallRow: PropsType.Boolean, //控制表格行高
    childrenPlaceholde: PropsType.Boolean, //控制行children的第一列缩进
    showHeader: PropsType.BooleanTrue, //是否显示表头
    spanMethod: PropsType.Function, //合并行合并列
    rowClasName: PropsType.Function, //行样式
    // renderHeader: PropsType.Function,//自定义表头
    tabClass: PropsType.String, //表格class [拖动表格需要的参数]
    rowKey: PropsType.FunSring, //表格唯一标识 [拖动表格需要的参数]
    dragTableFlag: PropsType.Boolean, //是否可拖动表格排序 [拖动表格需要的参数]
    treeProps: {
      //树形数据配置
      type: Object,
      default: () => {
        return { children: "children", hasChildren: "hasChildren" };
      },
    },
  },
  methods: {
    //父组件获取eltable实例，可调用table方法
    getInstance() {
      let that = this;
      return that.$refs[that.tabRef];
    },
    emptyText(value) {
      //数据为0的情况显示
      if (value === 0) {
        return "0";
      }
      return value === "undefined" || value === "" || value === null
        ? "-"
        : value;
    },
    formartThousandths(value) {
      if (value === 0) {
        return value;
      }
      if (Number.isInteger(value)) {
        return this.NumFormatInt(value);
      } else {
        return this.NumFormatFloat(value);
      }
    },
    //表格行展开收起
    expandChange(column, expandedRows) {
      this.$emit("expandChange", column, expandedRows);
    },
    //点击行
    rowClick(row, column, event) {
      this.$emit("rowClick", row, column, event);
    },
    //列排序
    sortByKey(column) {
      let params = {};
      if (column.order) {
        if (column.column) {
          params.orderBy = column.column.sortBy;
          params.desc = column.column.order === "descending";
          params.order = true;
        }
      } else {
        //排序恢复
        params.order = false;
      }
      // else {//自定义初始化排序 看情况传入
      //例如
      // params.orderBy = 'avgSales'
      // params.desc = true
      // }
      this.$emit("sortChange", params);
    },
    //行选中
    selectionChange(val) {
      this.$emit("selectionChange", val);
    },
    //行拖拽
    rowDrop() {
      // 此时找到的元素是要拖拽元素的父容器
      const tbody = document.querySelector(
        `.${this.tabClass} .el-table__body-wrapper tbody`
      );
      const _this = this;
      tbody.style.cursor = "move";
      Sortable.create(tbody, {
        // 指定父元素下可被拖拽的子元素
        draggable: ".el-table__row",
        // 开始拖拽的时候
        onStart: function (evt) {
          // console.log(evt.oldIndex);
        },
        // 结束拖拽
        onEnd({ newIndex, oldIndex }) {
          if (newIndex !== oldIndex) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0];
            _this.tableData.splice(newIndex, 0, currRow);
            _this.$emit("getDragTableSort", _this.tableData);
          }
        },
      });
    },
  },
  mounted() {
    this.dragTableFlag && this.rowDrop();
  },
};
</script>
<style lang="scss" scoped>
.table-parent-border {
  padding: 0;
  margin: 0;
  border: solid $border-line-color 1px;
  border-bottom: none;
  width: 100%;
  box-sizing: border-box;
}
//兼容表格树渲染数据为空时第一列样式
.children-placeholde {
  padding-left: 20px;
}
:deep(.el-table__inner-wrapper) {
  order: 1;
}
:deep(.el-table__body-wrapper) {
  order: 0;
}
</style>
