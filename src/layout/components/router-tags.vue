<template>
  <div id="tapsParentView" class="tags-view-container">
    <draggable
      class="dragg-view"
      v-model="visitedViews"
      item-key="path"
      filter=".link-fixed"
      @start="dragAble = true"
      @end="dragAble = false"
      :move="onMove"
    >
      <template #item="{ element, index }">
        <router-link
          refs="routerTagId"
          :key="element.path"
          :class="[
            'link-tag-item',
            { 'link-over-flow': isOverFlow() },
            { 'link-active': isActiveTag(element) },
            { 'link-fixed': isFixedTag(element) },
          ]"
          :to="{
            path: element.path,
            query: element.query,
          }"
          @contextmenu.prevent.stop="tagContextHandle(element, index, $event)"
        >
          <span :class="['tag-content', { 'tag-icon-none': isIconHidden }]">
            <!-- 'menu-icon-' + element.path.split('/')[1], -->

            <span
              :class="[
                'tag-icon',
                'menu-icon-board',
                { active: isActiveTag(element) },
              ]"
            ></span>
            <el-tooltip
              v-if="isOverFlow()"
              placement="bottom"
              effect="customized"
              :content="element.title"
            >
              <span class="tag-title">{{ element.title }}</span>
            </el-tooltip>
            <span v-else class="tag-title">{{ element.title }}</span>
          </span>
          <span
            class="close-btn option-btn option-btn-close-blue"
            v-if="!isFixedTag(element) && isActiveTag(element)"
            @click.prevent.stop="closeSelectedTag(element)"
          >
          </span>
          <span
            class="close-btn option-btn option-btn-close-white close-icon-visible"
            @click.prevent.stop="closeSelectedTag(element)"
          ></span>
        </router-link>
      </template>
    </draggable>
    <div
      v-show="contextVisible"
      ref="tagContextMenu"
      id="tagContextMenu"
      class="tag-context-menu"
      :style="{ left: contextLeft + 'px', top: contextTop + 'px' }"
    >
      <el-button
        text
        size="small"
        class="button"
        v-for="(item, index) in contextMenuList"
        :key="index"
        :disabled="item.disabled"
        @click="centextClick(index)"
        >{{ item.name }}</el-button
      >
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      dragAble: false,
      tagBaseWidth: 150,
      contextVisible: false,
      contextLeft: 0,
      contextTop: 0,
      inContextTag: "",
      inContextIndex: 0,
      contextMenuList: [
        {
          name: "刷新",
          disabled: false,
        },
        {
          name: "前进",
          disabled: false,
        },
        {
          name: "后退",
          disabled: false,
        },
        {
          name: "关闭左侧",
          disabled: false,
        },
        {
          name: "关闭右侧",
          disabled: false,
        },
        {
          name: "关闭其他",
          disabled: false,
        },
      ],
    };
  },
  components: { draggable },
  computed: {
    //监听sotre
    visitedViews: {
      get() {
        return this.$store.state.tagsView.visitedViews;
      },
      set(value) {
        this.$store.commit("tagsView/UPDATE_DRAG_VIEWS", value);
      },
    },
    isIconHidden() {
      return this.visitedViews.length >= 14;
    },
  },
  watch: {
    $route() {
      this.addTags();
    },
  },

  methods: {
    //标签右键句柄
    tagContextHandle(tag, index, evt) {
      console.log(evt);
      this.inContextTag = tag;
      this.inContextIndex = index;
      this.contextMenuList.map((item, inx) => {
        item.disabled = false;
        //第一个不前进
        if (
          this.inContextIndex === 0 &&
          (item.name === "前进" || item.name === "关闭左侧")
        ) {
          item.disabled = true;
        }
        //最后一个不后退
        if (
          this.inContextIndex === this.visitedViews.length - 1 &&
          (item.name === "后退" || item.name === "关闭右侧")
        ) {
          item.disabled = true;
        }
        //只有一个时，只保留刷新
        if (this.visitedViews.length === 1) {
          if (item.name !== "刷新") {
            item.disabled = true;
          }
        }
      });
      this.contextLeft = evt.pageX;
      this.contextTop = 40;
      this.contextVisible = true;
    },
    centextClick(type) {
      this.contextVisible = false;
      if (type === 0) {
        window.location.reload(); //刷新
        // this.$store
        //   .dispatch("tagsView/delCachedView", this.inContextTag)
        //   .then(() => {
        //     const { fullPath, path } = this.inContextTag;
        //     this.$nextTick(() => {
        //       this.$router.replace({
        //         path: "/redirect" + fullPath || path,
        //       });
        //     });
        //   });
      }
      let activeIndex = this.visitedViews.findIndex((item) => {
        return item.path === this.$route.path;
      });
      if (type === 1) {
        let preView = this.visitedViews[activeIndex - 1];
        if (preView) this.$router.push(preView.fullPath);
      }
      if (type === 2) {
        let afterView = this.visitedViews[activeIndex + 1];
        if (afterView) this.$router.push(afterView.fullPath);
      }
      if (type === 3 || type === 4) {
        let copyView = this.$deepClone(this.visitedViews);
        if (type === 3) {
          // 关闭左侧
          this.$store.commit(
            "tagsView/UPDATE_DRAG_VIEWS",
            copyView.slice(this.inContextIndex)
          );
        }
        if (type === 4) {
          //关闭右侧
          this.$store.commit(
            "tagsView/UPDATE_DRAG_VIEWS",
            copyView.slice(0, this.inContextIndex + 1)
          );
        }
        this.$nextTick(() => {
          if (!this.isActiveTag(this.inContextTag)) {
            this.$router.push(this.inContextTag.fullPath);
          }
        });
      }
      if (type === 5) {
        //关闭其他
        this.$store.commit("tagsView/UPDATE_DRAG_VIEWS", [this.inContextTag]);
        this.$nextTick(() => {
          if (!this.isActiveTag(this.inContextTag)) {
            this.$router.push(this.inContextTag.fullPath);
          }
        });
      }
    },
    onMove(e) {
      //固定标签不可拖动,禁止拖动到固定标签
      if (e.relatedContext.element.meta.fixed) return false;
      return true;
    },
    //标签溢出处理
    isOverFlow() {
      let parentWidth =
        (document.getElementById("tapsParentView") &&
          document.getElementById("tapsParentView").clientWidth) ||
        1000;
      if (this.tagBaseWidth * (this.visitedViews.length + 1) >= parentWidth) {
        return true;
      } else {
        return false;
      }
    },
    //是否是当前激活路由标签
    isActiveTag(route) {
      return route.path === this.$route.path;
    },
    //是否固定路由
    isFixedTag(route) {
      return route.meta && route.meta.fixed;
    },
    //增加路由
    addTags() {
      //后续需要手动过滤登陆、404等路由
      const { name, meta } = this.$route;
      if (name && meta.caches) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
    },
    //关闭标签，定向到最后一个标签
    closeSelectedTag(view) {
      this.$store
        .dispatch("tagsView/delView", view)
        .then(({ visitedViews }) => {
          if (this.isActiveTag(view)) {
            this.toLastView(visitedViews, view);
          }
        });
    },
    //定向最后一个路由
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        //没有则定向到默认首页
        this.$router.push("/board");
      }
    },
  },
  mounted() {
    this.addTags();
    window.addEventListener("resize", (e) => {
      this.$nextTick(() => {
        this.isOverFlow();
      });
    });
    window.addEventListener("click", (e) => {
      this.$nextTick(() => {
        this.contextVisible = false;
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  flex: 1;
  overflow: inherit;
  position: relative;
  align-content: center;
  justify-content: flex-start;
  width: calc(100% - 60px) !important;
}
.tag-context-menu {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
  background: #fff;
  z-index: 111000;
  border-radius: 6px;
  padding: 6px;
  font-size: 12px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
.tag-context-menu .button {
  width: 80px;
  padding: 5px !important;
  border: none !important;
  margin-left: 0 !important;
  justify-content: flex-start !important;
}
.dragg-view {
  display: flex !important;
  height: 100% !important;
  width: 100% !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
}
.dragg-view::-webkit-scrollbar {
  width: 0;
  height: 0 !important;
}
.link-tag-item {
  border: none;
  display: block;
  position: relative;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  color: $page-back-color;
  background: #3375f5;
  padding: 0 4px;
  width: 150px;
  &.link-active {
    color: #3375f5;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: $page-back-color;
  }
  &.link-over-flow {
    flex: 1;
    width: auto;
  }
}
.tag-content {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  .tag-title {
    margin-left: 4px;
    display: block;
    overflow: hidden;
    word-break: keep-all;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
.tag-content.tag-icon-none .tag-icon {
  display: none;
}
.link-over-flow .tag-content .tag-title {
  width: 24px;
  overflow: hidden;
}
.close-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  margin-top: -8px;
}
.close-icon-visible {
  display: none;
}
.link-fixed .close-icon-visible {
  display: none !important;
}
.link-tag-item:hover .close-icon-visible {
  display: block;
}
.link-tag-item.link-active:hover .close-icon-visible {
  display: none;
}
//动画
.tag-icon.active {
  animation: iconBreath 1.5s infinite alternate;
}
.close-icon-visible:hover,
.close-btn.option-btn-close-blue:hover {
  animation: iconRotate 1s;
}
</style>
