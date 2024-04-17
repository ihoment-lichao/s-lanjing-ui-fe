<template>
  <el-menu
    class="el-menu-vertical-demo"
    router
    unique-opened
    background-color="#1e282c"
    active-text-color="#FFFFFF"
    text-color="#a5aeba"
    :default-active="defaultActive"
    :collapse-transition="false"
    :collapse="isCollapse"
  >
    <template v-for="item in localMenuList">
      <template v-if="item.children">
        <el-sub-menu
        :key="item.key"
          :popper-offset="0"
          :index="item.key"
          :show-timeout="30"
          :hide-timeout="30"
          popper-class="custom-menu-popper"
        >
          <template #title>
            <div :class="['menu-contend-flex', { 'flex-clounm': isCollapse }]">
              <i v-if="item.icon" class="menu-icon" :class="item.icon"></i>
              <i v-else class="menu-icon-product"></i>
              <span class="menu-custom-title">{{ item.title }}</span>
            </div>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.key"
            :index="child.key"
          >
            <template #title>{{ child.title }}</template>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.key" :key="item.key">
          <el-icon :size="elIcon.size" :color="elIcon.color">
            <Menu />
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </template>
    <div
    :class="['collapse-block', { visible: isCollapse }]"
    :title="isCollapse ? '展开' : '收起'"
    @click="toggleCollapse"
  ></div>
  </el-menu>
</template>

<script>
import localMenuList from "../menu.js";
export default {
  name: "layout-menu",
  data() {
    return {
      localMenuList,
      defaultActive: "/sljTable",
      isCollapse: false,
    };
  },
  watch: {
    $route(router) {
      this.defaultActive = router.path;
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$store.commit("tagsView/UPDATE_MENU_COLLAPSE", this.isCollapse);
    },
  },
  mounted() {
    //刷新页面重置active
    const { fullPath } = this.$route;
    if (fullPath !== this.defaultActive) {
      this.defaultActive = fullPath;
    }
    this.$store.commit("tagsView/UPDATE_MENU_COLLAPSE", this.isCollapse);
  },
};
</script>
<style scoped lang="scss">
.menu-contend-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.menu-contend-flex.flex-clounm {
  flex-direction: column;
  line-height: 16px;
}
.menu-contend-flex.flex-clounm .menu-custom-title {
  margin: 0;
}
.el-menu-vertical-demo {
  border: none;
  height: 100%;
  font-family: PingFangSC-Regular, PingFang SC;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  border: none;
}
.el-menu-vertical-demo .el-sub-menu .el-sub-menu__title {
  padding: 0;
  position: relative;
  line-height: 0 !important;
}
.menu-custom-title {
  margin-left: 4px;
  font-size: 14px !important;
}
.el-menu-vertical-demo .el-menu-item {
  font-size: 14px !important;
  color: #8aa4af !important;
  background: #2c3b41 !important;
  min-width: 140px !important;
}
//展开时的样式
.menu-custom-title:hover,
.el-menu--inline .el-menu-item.is-active {
  color: #ffffff !important;
}
//收缩时的样式
.el-menu--collapse.el-menu-vertical-demo
  > .el-sub-menu.is-active
  .menu-custom-title,
.el-menu--collapse.el-menu-vertical-demo
  > .el-sub-menu
  .menu-custom-title:hover {
  color: #ffffff !important;
}
.el-menu--collapse.el-menu-vertical-demo > .el-sub-menu:hover::before,
.el-menu--collapse.el-menu-vertical-demo > .el-sub-menu.is-active::before {
  content: "";
  position: absolute;
  width: 3px;
  left: 0;
  top: 0;
  bottom: 0;
  background: #3375f5;
  z-index: 111;
}

//菜单收缩按钮
.collapse-block {
  cursor: pointer;
  position: absolute;
  top: 200px;
  right: -5px;
  height: 40px;
  width: 0;
  border-radius: 4px;
  border-left: 0;
  border-right: 5px solid #1e282c;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}
.collapse-block.visible {
  border-right: 0;
  border-left: 5px solid #1e282c;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}
</style>
