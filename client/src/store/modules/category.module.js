import { apiADD, apiDELETE, apiEDIT, getAPI } from "@/api/instance";

const postModule = {
  // Đây là nơi khởi tạo các state của post Module
  state: {
    data: [],
  },

  // Chứa các hàm đồng bộ để cập nhật lại state
  mutations: {
    getCategory(state, payload) {
      state.data = payload;
    },
    addCategory(state, payload) {
      state.data.push(payload);
    },
    deleteCategory(state, payload) {
      state.data.push(payload);
    },
    editCategory(state, payload) {
      state.data.push(payload);
    },
  },

  // Chứa các hàm bất đồng bộ: gọi API tương tác với dữ liệu
  actions: {
    async apiGetCategory({ commit }) {
      try {
        const data = await getAPI(); // Sử dụng await để đợi API trả về
        commit("getCategory", data);
      } catch (error) {
        console.log("Error fetching category data:", error);
      }
    },
    async apiAddCategory({ commit }, payload) {
      try {
        await apiADD(payload); // Đợi API thêm mới hoàn thành
        await commit("addCategory", payload);
        commit('getCategory')
      } catch (error) {
        console.log("Error adding category:", error);
      }
    },
    async apiDeleteCategory({ commit }, payload) {
      try {
        await apiDELETE(payload); // Đợi API thêm mới hoàn thành
        await commit("deleteCategory", payload);
        commit('getCategory')
      } catch (error) {
        console.log("Error adding category:", error);
      }
    },
    async apiEditCategory({ commit }, payload) {
      try {
        await apiEDIT(payload); // Đợi API thêm mới hoàn thành
        await commit("editCategory", payload);
        commit('getCategory')
      } catch (error) {
        console.log("Error adding category:", error);
      }
    },
  },
};

export default postModule;
