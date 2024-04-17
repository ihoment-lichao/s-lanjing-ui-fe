<!--
 * @Author: lichao
 * @Date: 2022-06-27 14:13:29
 * @FilePath: /S-yundeng-bi-fe/packages/ads/src/components/search-area.vue
 * @Description: 全局搜索组件
 * 各项默认值3种方式 1、配置数据项赋值value，2、url入参取值(待实现)，3、父组件ref形式调用方法赋值setFomrValueBuName()
-->
<template>
  <!-- :target="targetContainer" -->
  <el-affix
    :offset="stickyTop >= 40 ? stickyTop : 40"
    :zIndex="zIndex"
    style="width: 100%"
  >
    <div class="search-area-box" :style="{ backgroundColor: backgroundColor }">
      <el-space wrap>
        <template v-for="(item, index) in list" :key="item.name">
          <template v-if="item.type === 'INPUT'">
            <el-input
              :size="size"
              clearable
              v-model="searchParmas[item.name]"
              :style="setItemWidth(item)"
              :placeholder="item.placeholder || '请输入'"
              @change="changeInput($event, item, index)"
            />
          </template>
          <template v-if="item.type === 'SEARCH'">
            <el-input
              :size="size"
              clearable
              v-model="searchParmas[item.name]"
              :placeholder="item.placeholder || '请输入'"
              class="input-with-select"
            >
              <template #prepend>
                <el-select
                  :size="size"
                  v-model="searchParmas[item.searchType]"
                  placeholder="请选择"
                  class="input-search"
                  style="width: 110px"
                >
                  <el-option
                    v-for="opt in item.data"
                    :key="opt.id"
                    :label="opt.name"
                    :value="opt.id"
                  />
                </el-select>
              </template>
            </el-input>
          </template>
          <template v-if="item.type === 'SELECT'">
            <el-select
              :size="size"
              :style="setItemWidth(item)"
              v-model="searchParmas[item.name]"
              :disabled="item.disabled || false"
              :placeholder="item.placeholder || '请选择'"
              :multiple="item.multiple ? true : false"
              :clearable="item.multiple || item.clearable"
              filterable
              collapse-tags
              collapse-tags-tooltip
              @change="changeSelect($event, item, index)"
            >
              <el-option
                v-for="opt in item.data"
                :key="opt.id"
                :label="opt.name"
                :value="opt.id"
                :disabled="opt.disabled || false"
              />
            </el-select>
          </template>
          <template v-if="item.type === 'LIST'">
            <el-select
              :size="size"
              v-model="searchParmas[item.name]"
              :style="setItemWidth(item)"
              :fit-input-width="true"
              :placeholder="item.placeholder || '请选择'"
              no-data-text="请选择一个店铺"
              :multiple="item.multiple ? true : false"
              clearable
              filterable
              :collapse-tags="item.collapseTags ? true : false"
              collapse-tags-tooltip
              @change="changeSelect($event, item, index)"
            >
              <el-option
                v-for="opt in item.data"
                :key="opt.id || opt.portfolioId"
                :label="opt.sku || opt.name"
                :value="opt.listingId || opt.portfolioId"
              />
            </el-select>
          </template>
          <template v-if="item.type === 'DATE'">
            <el-date-picker
              :size="size"
              class="date-box"
              v-model="searchParmas[item.name]"
              :style="setItemWidth(item)"
              v-if="item.type === 'DATE'"
              :type="item.dataType ? item.dataType : 'date'"
              :placeholder="item.placeholder || '请选择'"
              @change="changeSelect($event, item, index)"
              :format="item.format ? item.format : 'YYYY-MM-DD'"
              :clearable="false"
              :value-format="item.valueFormat ? item.valueFormat : 'YYYY-MM-DD'"
              :disabled-date="disabledDate"
            />
          </template>
          <template v-if="item.type === 'DATERANGE'">
            <!-- :style="setItemWidth(item)" -->
            <el-date-picker
              :size="size"
              class="date-box"
              style="width: 240px"
              v-model="searchParmas[item.name]"
              v-if="item.type === 'DATERANGE'"
              :type="item.dataType ? item.dataType : 'daterange'"
              @change="changeSelect($event, item, index)"
              :end-placeholder="item.endPlaceholder || '结束时间'"
              :start-placeholder="item.startPlaceholder || '开始时间'"
              format="YYYY-MM-DD"
              :clearable="item.clearable ? true : false"
              value-format="YYYY-MM-DD"
              :disabled-date="item.disabled ? disabledDate : null"
            />
          </template>
        </template>
        <slot></slot>
        <span v-if="showButton">
          <!-- <el-button style="margin-right: 3px" type="primary" @click="resetForm"
            >重置</el-button
          > -->
          <el-button
            :size="size"
            type="primary"
            :icon="Search"
            @click="search"
          ></el-button>
        </span>
      </el-space>
    </div>
  </el-affix>
</template>

<script>
import { Search } from "@element-plus/icons-vue";
export default {
  name: "s-lanjing-search",
  emits: ["reset", "changeInput", "changeSelect", "search"],
  props: {
    //目标容器类名
    targetContainer: {
      type: String,
      default: "—",
    },
    //吸顶距离
    stickyTop: {
      type: Number,
      default: 40,
    },
    backgroundColor: {
      type: String,
      default: "#EEF3FA",
    },
    //吸顶索引
    zIndex: {
      type: Number,
      default: 1000,
    },
    //配置数据
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //显示按钮
    showButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      Search,
      size: "default",
      searchParmas: {},
      fieldNames: {
        value: "id",
        label: "name",
      },
    };
  },
  watch: {
    list(newList) {
      this.initParams();
    },
  },
  created() {
    this.initParams();
  },
  mounted() {},
  destroyed() {
    this.searchParmas = {};
  },
  methods: {
    disabledDate(time) {
      var now = new Date().getTime();
      return time > now;
    },
    //初始化参数对象
    initParams() {
      this.searchParmas = {};
      if (this.list && this.list.length > 0) {
        this.list.forEach((item) => {
          this.searchParmas[item.name] =
            item.value || item.value === 0 ? item.value : null;
        });
      }
    },
    //重置
    resetForm() {
      this.searchParmas = {};
      this.$emit("reset");
    },
    //input事件
    changeInput(value, item, index) {
      this.$emit("changeInput", value, item, index);
    },
    //下拉事件
    changeSelect(value, item, index) {
      this.$emit("changeSelect", value, item, index);
    },
    //查询
    search() {
      this.$emit("search", this.getSearchParmas());
    },
    //设置宽度
    setItemWidth(item) {
      let widthStyle = {
        width: 120,
      };
      if (item.width && item.width > 120) {
        widthStyle.width = item.width;
      }
      if (item.multiple && item.type === "SELECT") {
        widthStyle.width = item.width && item.width >= 160 ? item.width : 160;
      }
      widthStyle.width = widthStyle.width + "px";
      return widthStyle;
    },
    //根据name调用此方法赋值，name为配置数据v-model绑定值
    setValueByName(name, value) {
      let isOwn = this.searchParmas.hasOwnProperty(name);
      if (isOwn) {
        this.searchParmas[name] = value;
      } else {
        this.$message.warning({ message: "属性值不匹配！" });
      }
    },
    //根据name调用此方法取对应值，name为配置数据v-model绑定值
    getValueByName(name) {
      let isOwn = this.searchParmas.hasOwnProperty(name);
      if (isOwn) {
        return this.searchParmas[name];
      } else {
        this.$message.warning({ message: "属性值不匹配！" });
      }
    },
    //获取整个params
    getSearchParmas() {
      let params = {};
      Object.keys(this.searchParmas).forEach((key) => {
        if (this.searchParmas[key] || this.searchParmas[key] === 0) {
          params[key] = this.searchParmas[key];
        }
      });
      return params;
    },
  },
};
</script>
<style lang="scss" scoped src="./style.scss">

</style>
