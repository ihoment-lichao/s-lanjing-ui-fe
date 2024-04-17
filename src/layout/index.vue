<template>
  <ElContainer style="height: 100%">
    <div class="layout-menu">
      <div class="layout-logo">
        <a href="javascript:location.reload()" class="app-logo"></a>
        <div v-if="menuCollapse" class="app-title">蓝鲸组件系统</div>
      </div>
      <LayoutMenu />
    </div>
    <ElContainer>
      <ElHeader :style="headerStyle">
        <RouterTags />
      </ElHeader>
      <ElMain
        :style="{
          margin: '0',
          padding: '8px',
          background: '#EEF3FA',
          'overflow-y': 'auto',
        }"
      >
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade-transform" mode="out-in">
          <KeepAlive :include="cachedViews">
            <component :is="Component" :key="route.path" />
          </KeepAlive>
          </Transition>
        </RouterView>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
<script>
import RouterTags from "./components/router-tags.vue";
import LayoutMenu from "./components/layout-menu.vue";
import { mapState } from "vuex";
export default {
  name: "layout-index",
  components: {
    RouterTags,
    LayoutMenu,
  },
  computed: {
    ...mapState({
      menuCollapse: (state) => state.tagsView.menuCollapse,
      cachedViews: (state) => state.tagsView.cachedViews.join(","),
    }),
  },
  data() {
    return {
      headerStyle: {
        padding: "0",
        color: "#EEF3FA",
        display: "flex",
        "justify-content": "space-between",
        color: "#fff",
        height: "40px",
        width: "100%",
        "line-height": "40px",
        "background-color": "#3375F5",
      },
    };
  },
};
</script>
<style scope lang="scss">
.layout-menu {
  height: 100%;
  position: relative;
  width: auto;
  display: flex;
  flex-direction: column;
}
.layout-logo {
  display: flex;
  // overflow: hidden;
  // padding-top: 12px;
  align-items: center;
  justify-content: center;
  background-color: #1e282c;
  .app-title {
    padding-left: 12px;
    color: #b8c7ce;
    font-weight: 600;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
  }
}
.footer-style {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $split-line-color;
}
.site-layout .site-layout-background {
  background: #fff;
}
.el-sub-menu .el-menu-item {
  min-width: 160px;
}
</style>
