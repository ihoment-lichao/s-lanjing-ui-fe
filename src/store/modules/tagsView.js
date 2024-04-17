const tagsView = {
  namespaced: true,
  state: {
    visitedViews: [], //访问/标签路由
    cachedViews: [], //缓存路由
    opneView: "",
    menuCollapse: true, //菜单展开状态
  },

  mutations: {
    //更新打开路由
    UPDATE_MENU_COLLAPSE: (state, isCollapse) => {
      state.menuCollapse = !isCollapse;
    },
    //缓存路由
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return;
      if (view.meta.caches) {
        state.cachedViews.push(view.name);
      }
    },
    //标签路由,path相同，fullpath不相同时特殊处理
    ADD_VISITED_VIEW: (state, view) => {
      let tempView = Object.assign({}, view, {
        title: view.meta.title || view.name,
      });
      let hasIndex = state.visitedViews.findIndex((item) => {
        return item.path === view.path;
      });
      //不存在相同路由
      if (hasIndex < 0) {
        //重新处理固定路由在第一
        if (tempView.meta.fixed && tempView.meta.caches) {
          state.visitedViews.unshift(tempView);
        } else {
          //新路由排最后
          state.visitedViews.push(tempView);
        }
      } else {
        //1、存在相同路由，先删除原来，使用最新的(解决详情参数页不更新),
        // state.visitedViews.splice(hasIndex, 1);
        // state.visitedViews.push(tempView);
        //2、或者直接替换不产生标签位置变化
        state.visitedViews[hasIndex] = tempView;
      }
    },
    //拖拽更新
    UPDATE_DRAG_VIEWS: (state, list) => {
      state.visitedViews = list;
    },
    //删除高亮路由
    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    //删除缓存路由
    DEL_CACHED_VIEW: (state, view) => {
      const index = state.cachedViews.indexOf(view.name);
      index > -1 && state.cachedViews.splice(index, 1);
    },
  },
  actions: {
    //增加路由2个派发
    addView({ dispatch }, view) {
      dispatch("addVisitedView", view);
      dispatch("addCachedView", view);
    },
    //增加缓存路由
    addCachedView({ commit }, view) {
      commit("ADD_CACHED_VIEW", view);
    },
    //增加已访问路由
    addVisitedView({ commit }, view) {
      commit("ADD_VISITED_VIEW", view);
    },
    //删除路由2个派发
    delView({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch("delVisitedView", view);
        dispatch("delCachedView", view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        });
      });
    },
    //删除已访问路由
    delVisitedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_VISITED_VIEW", view);
        resolve([...state.visitedViews]);
      });
    },
    //删除缓存路由
    delCachedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_CACHED_VIEW", view);
        resolve([...state.cachedViews]);
      });
    },
  },
};

export default tagsView;
