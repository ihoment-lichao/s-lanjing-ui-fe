<template>
  <div class="search-views-demo">
    <SljSearch
      ref="demoSearchId"
      :list="searchList"
      @search="searchHandle"
      @changeSelect="changeSelect"
    ></SljSearch>
  </div>
</template>

<script>
import * as confData from "./config.js";
import SljSearch from "@/components/s-lanjing-search/index.vue";
export default {
  name: "搜索栏",
  data() {
    return {
      searchList:confData.searchList
    };
  },
  components: { SljSearch },
  methods: {
    //搜索按钮回调
    searchHandle(params) {
      console.log(params);
    },
    //下拉回调
    changeSelect(value, params) {
      console.log(value);
      console.log(params);
    },
  },
};
</script>

<style scoped lang="scss"></style>
