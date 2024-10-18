import { apiADD, apiEDIT, apiGET } from "@/api/instance";

const moduleCustomer = {
  // Đây là nơi khởi tạo các state của post Module
  state: {
    data: [],
  },

  // Chứa các hàm đồng bộ để cập nhật lại state
  mutations: {
    getCustomer(state, payload) {
      state.data = payload;
    },
    addCustomer(state, payload) {
      state.data.push(payload);
    },
    editCustomer(state, payload) {
      state.data.push(payload);
    },
  },

  // Chứa các hàm bất đồng bộ: gọi API tương tác với dữ liệu
  actions: {
    async apiGetCustomer({ commit }) {
      try {
        const data = await apiGET('users'); // Sử dụng await để đợi API trả về
        commit("getCustomer", data);
      } catch (error) {
        console.log("Error fetching Customer data:", error);
      }
    },
    async apiAddCustomer({ commit }, payload) {
      try {
        await apiADD(payload,'users'); // Đợi API thêm mới hoàn thành
        await commit("addCustomer", payload);
        commit('getCustomer')
      } catch (error) {
        console.log("Error adding Customer:", error);
      }
    },

    async apiEditCustomer({ commit }, payload) {
      try {
        await apiEDIT(payload,'users'); // Đợi API thêm mới hoàn thành
        await commit("editCustomer", payload);
      } catch (error) {
        console.log("Error adding Customer:", error);
      }
    },

    // async apiEditCustomer({ commit }, payload) {
    //   try {
    //     await apiEDIT(payload,'users'); // Đợi API thêm mới hoàn thành
    //     await commit("editCustomer", payload);
    //     commit('getCustomer')
    //   } catch (error) {
    //     console.log("Error adding Customer:", error);
    //   }
    // },
  },
};

export default moduleCustomer;