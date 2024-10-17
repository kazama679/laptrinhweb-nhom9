import { createStore } from "vuex";
import category from "./modules/category.module";

const store = createStore({
  modules: {
    category,
  },
});

export default store;