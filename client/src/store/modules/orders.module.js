import { apiADDCategory, apiDELETECategory, apiEDITCategory, getAPICategory } from "@/api/instance";

const OrdersModule = {
  // Đây là nơi khởi tạo các state của post Module
  state: {
    data: [],
  },

  // Chứa các hàm đồng bộ để cập nhật lại state
  mutations: {
    getOrders(state, payload) {
      state.data = payload;
    },
    addOrders(state, payload) {
      state.data.push(payload);
    },
    editOrders(state, payload) {
      state.data.push(payload);
    },
  },

  // Chứa các hàm bất đồng bộ: gọi API tương tác với dữ liệu
  actions: {
    async apiGetOrders({ commit }) {
      try {
        const data = await getAPI(); // Sử dụng await để đợi API trả về
        commit("getOrders", data);
      } catch (error) {
        console.log("Error fetching Orders data:", error);
      }
    },
    async apiAddOrders({ commit }, payload) {
      try {
        await apiADD(payload); // Đợi API thêm mới hoàn thành
        await commit("addOrders", payload);
        commit('getOrders')
      } catch (error) {
        console.log("Error adding Orders:", error);
      }
    },
    async apiEditOrders({ commit }, payload) {
      try {
        await apiEDIT(payload); // Đợi API thêm mới hoàn thành
        await commit("editOrders", payload);
        commit('getOrders')
      } catch (error) {
        console.log("Error adding Orders:", error);
      }
    },
  },
};

export default OrdersModule;