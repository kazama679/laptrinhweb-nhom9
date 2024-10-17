import axios from 'axios';

// Tạo instance axios với cấu hình sẵn
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

// Hàm GET để lấy dữ liệu từ API
export const getAPI = async () => {
  try {
    const res = await apiClient.get('/classify');  // Sử dụng apiClient thay vì axios trực tiếp
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Đảm bảo lỗi được ném ra để xử lý
  }
};

// Hàm POST để thêm dữ liệu vào API
export const apiADD = async (item) => {
  try {
    const res = await apiClient.post('/classify', item);  // Sử dụng apiClient thay vì axios trực tiếp
    return res.data;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error; // Đảm bảo lỗi được ném ra để xử lý
  }
};

// Hàm DELETE để xóa dữ liệu vào API
export const apiDELETE = async (id) => {
  try {
    const res = await apiClient.delete(`/classify/${id}`);  // Sử dụng apiClient thay vì axios trực tiếp
    return res.data;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error; // Đảm bảo lỗi được ném ra để xử lý
  }
};

export const apiEDIT = async (category) => {
  try {
    const res = await apiClient.put(`/classify/${category.id}`, category);  // Sử dụng apiClient thay vì axios trực tiếp
    return res.data;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error; // Đảm bảo lỗi được ném ra để xử lý
  }
}
