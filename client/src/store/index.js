import { createStore } from "vuex";
import category from "./modules/category.module";
import product from "./modules/product.module";
import orders from "./modules/orders.module";
import customer from "./modules/customer.module";
import discount from "./modules/discount.module";

const store = createStore({
  modules: {
    category,
    product,
    orders,
    customer,
    discount,
  },
});

export default store;