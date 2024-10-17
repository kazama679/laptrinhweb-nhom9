import { apiEDITCustomers } from "@/api/instance";

const CustomersModule = {
  // Đây là nơi khởi tạo các state của post Module
  state: {
    data: [],
  },

  // Chứa các hàm đồng bộ để cập nhật lại state
  mutations: {
    getCustomers(state, payload) {
      state.data = payload;
    },
    addCustomers(state, payload) {
      state.data.push(payload);
    },
    deleteCustomers(state, payload) {
      state.data.push(payload);
    },
    editCustomers(state, payload) {
      state.data.push(payload);
    },
  },

  // Chứa các hàm bất đồng bộ: gọi API tương tác với dữ liệu
  actions: {
    async apiGetCustomers({ commit }) {
      try {
        const data = await getAPI(); // Sử dụng await để đợi API trả về
        commit("getCustomers", data);
      } catch (error) {
        console.log("Error fetching Customers data:", error);
      }
    },
    async apiAddCustomers({ commit }, payload) {
      try {
        await apiADD(payload); // Đợi API thêm mới hoàn thành
        await commit("addCustomers", payload);
        commit('getCustomers')
      } catch (error) {
        console.log("Error adding Customers:", error);
      }
    },
    async apiDeleteCustomers({ commit }, payload) {
      try {
        await apiDELETE(payload); // Đợi API thêm mới hoàn thành
        await commit("deleteCustomers", payload);
        commit('getCustomers')
      } catch (error) {
        console.log("Error adding Customers:", error);
      }
    },
    async apiEDITCustomers({ commit }, payload) {
      try {
        await apiEDIT(payload); // Đợi API thêm mới hoàn thành
        await commit("editCustomers", payload);
        commit('getCustomers')
      } catch (error) {
        console.log("Error adding Customers:", error);
      }
    },
  },
};

export default CustomersModule;