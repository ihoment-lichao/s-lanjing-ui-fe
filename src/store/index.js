import { createStore } from "vuex";
import local from "@/store/modules/local.js";
import tagsView from "@/store/modules/tagsView.js";



const store = createStore({
  modules: {
    local,
    tagsView,
  },
});
1;

export default store;
