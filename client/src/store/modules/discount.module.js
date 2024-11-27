import { apiADD, apiDELETE, apiEDIT, apiGET } from "@/api/instance";

const moduleDiscount = {
  // Đây là nơi khởi tạo các state của post Module
  state: {
    data: [],
  },

  // Chứa các hàm đồng bộ để cập nhật lại state
  mutations: {
    getDiscount(state, payload) {
      state.data = payload;
    },
    addDiscount(state, payload) {
      state.data.push(payload);
    },
    deleteDiscount(state, payload) {
      state.data.push(payload);
    },
    editDiscount(state, payload) {
      state.data.push(payload);
    },
  },

  // Chứa các hàm bất đồng bộ: gọi API tương tác với dữ liệu
  actions: {
    async apiGetDiscount({ commit }) {
      try {
        const data = await apiGET('sales'); // Sử dụng await để đợi API trả về
        commit("getDiscount", data);
      } catch (error) {
        console.log("Error fetching Discount data:", error);
      }
    },
    async apiAddDiscount({ commit }, payload) {
      try {
        await apiADD(payload,'sales'); // Đợi API thêm mới hoàn thành
        await commit("addDiscount", payload);
        commit('getDiscount')
      } catch (error) {
        console.log("Error adding Discount:", error);
      }
    },
    async apiDeleteDiscount({ commit }, payload) {
      try {
        await apiDELETE(payload,'sales'); // Đợi API thêm mới hoàn thành
        await commit("deleteDiscount", payload);
        commit('getDiscount')
      } catch (error) {
        console.log("Error adding Discount:", error);
      }
    },
    async apiEditDiscount({ commit }, payload) {
      try {
        await apiEDIT(payload,'sales'); // Đợi API thêm mới hoàn thành
        await commit("editDiscount", payload);
        commit('getDiscount')
      } catch (error) {
        console.log("Error adding Discount:", error);
      }
    },
  },
};

export default moduleDiscount;