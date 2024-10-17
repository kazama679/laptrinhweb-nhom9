import { apiADDCategory, apiDELETECategory, apiEDITCategory, getAPICategory } from "@/api/instance";

const ProductsModule = {
  // Đây là nơi khởi tạo các state của post Module
  state: {
    data: [],
  },

  // Chứa các hàm đồng bộ để cập nhật lại state
  mutations: {
    getProducts(state, payload) {
      state.data = payload;
    },
    addProducts(state, payload) {
      state.data.push(payload);
    },
    deleteProducts(state, payload) {
      state.data.push(payload);
    },
    editProducts(state, payload) {
      state.data.push(payload);
    },
  },

  // Chứa các hàm bất đồng bộ: gọi API tương tác với dữ liệu
  actions: {
    async apiGetProducts({ commit }) {
      try {
        const data = await getAPI(); // Sử dụng await để đợi API trả về
        commit("getProducts", data);
      } catch (error) {
        console.log("Error fetching Products data:", error);
      }
    },
    async apiAddProducts({ commit }, payload) {
      try {
        await apiADD(payload); // Đợi API thêm mới hoàn thành
        await commit("addProducts", payload);
        commit('getProducts')
      } catch (error) {
        console.log("Error adding Products:", error);
      }
    },
    async apiDeleteProducts({ commit }, payload) {
      try {
        await apiDELETE(payload); // Đợi API thêm mới hoàn thành
        await commit("deleteProducts", payload);
        commit('getProducts')
      } catch (error) {
        console.log("Error adding Products:", error);
      }
    },
    async apiEditProducts({ commit }, payload) {
      try {
        await apiEDIT(payload); // Đợi API thêm mới hoàn thành
        await commit("editProducts", payload);
        commit('getProducts')
      } catch (error) {
        console.log("Error adding Products:", error);
      }
    },
  },
};

export default ProductsModule;