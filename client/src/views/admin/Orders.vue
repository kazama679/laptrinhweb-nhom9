<template>
  <div className="flex">
    <main className="flex-1 p-5 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <select className="border px-4 py-2 rounded">
              <option value="">Sắp xếp theo ngày</option>
              <option value="moi">Sắp xếp từ cũ đến mới</option>
              <option value="cu">Sắp xếp từ mới đến cũ</option>
            </select>
            <select className="border px-4 py-2 rounded">
              <option value="">Lọc theo trạng thái</option>
              <option value="choDuyet">Chờ duyệt</option>
              <option value="daDuyet">Đã duyệt</option>
              <option value="daGui">Giao hàng thành công</option>
            </select>
          </div>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Mã đơn hàng</th>
              <th className="px-4 py-2 border">Tên người nhận</th>
              <th className="px-4 py-2 border">Địa chỉ nhận</th>
              <th className="px-4 py-2 border">Số người nhận</th>
              <th className="px-4 py-2 border">Trạng thái</th>
              <th className="px-4 py-2 border">Tổng tiền</th>
              <th className="px-4 py-2 border">Ngày tạo</th>
              <th className="px-4 py-2 border">Note</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody v-for="item in orders" :key="item.id">
            <tr>
              <td className="px-4 py-2 border">{{ item.id }}</td>
              <td className="px-4 py-2 border">{{ item.name }}</td>
              <td className="px-4 py-2 border">{{ item.address }}</td>
              <td className="px-4 py-2 border">{{ item.phone }}</td>
              <td className="px-4 py-2 border">
                {{ item.status === "choDuyet" ? "Chưa duyệt" : item.status === "daDuyet" ? "Đã duyệt" : "Đã gửi" }}
              </td>
              <td className="px-4 py-2 border">{{ formatVND(total(item) + item.ship) }}</td>
              <td className="px-4 py-2 border">{{ item.created_at }}</td>
              <td className="px-4 py-2 border">{{ item.note }}</td>
              <td className="px-4 py-2 border">
                <button @click="handleShowOrder(item)" className="bg-green-500 text-white px-3 py-1 rounded">
                  Chi tiết
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <FormOrder v-if="isShow" @onClose="handleClose" :new="editCategory"></FormOrder>
    </main>
  </div>
</template>

<script setup>
import apiClient from '@/api/instance';
import FormOrder from '@/components/FormOrder.vue';
import { onMounted, ref } from 'vue';

const editCategory=ref();
const isShow = ref(false)
const handleShowOrder = (item) => {
  isShow.value = true
  editCategory.value=item
}
const handleClose = () => {
  isShow.value = false
}
const orders = ref([])
const sales = ref([])
const fetchData = async () => {
  try {
    const response = await apiClient.get("orders")
    const response2 = await apiClient.get("sales")
    orders.value = response.data
    sales.value = response2.data
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  fetchData()
})

// format tiền
const formatVND = (price) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

// hàm tính tổng tiền bao gồm mã giảm giá
const total = (item) => {
  let sum = 0;
  item.cart.forEach(i => {
    sum += i.price * i.quantity;
  });
  // Kiểm tra nếu đơn hàng có mã giảm giá và áp dụng phần trăm giảm giá
  if (item.sale) {
    const sale = sales.value.find(sale => sale.name === item.sale && sale.status);
    if (sale) {
      sum = sum - (sum * sale.down / 100);
    }
  }
  return sum;
};

</script>

<style></style>