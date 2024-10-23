<template>
  <div class="fixed inset-0 bg-gray-950 bg-opacity-50 flex justify-center items-center">
    <div className="w-1/4 h-screen fixed top-0 left-0">
      <Sidebar />
    </div>

    <!-- {/* thông tin đơn hàng */} -->
    <div className="bg-white flex-1 p-10 ml-64">
      <div className="flex justify-center text-center">
        <button @click="closeForm" className="text-blue-500 mb-5 hover:text-blue-700 transition-colors">
          Back
        </button>
      </div>
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Thông tin đơn hàng</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Mã đơn hàng:</strong> {{ props.new.id }}</p>
          <p>
            <strong>Tổng tiền (cả ship):</strong>
            {{formatVND(total( props.new)+ props.new.ship)}}
          </p>
          <p>
            <strong>Tên người nhận:</strong> {{ props.new.name }}
          </p>
          <p>
            <strong>Số người nhận:</strong> {{ props.new.phone }}
          </p>
          <p>
            <strong>Địa chỉ người nhận:</strong>
            {{ props.new.address }}
          </p>
          <p><strong>Ghi chú:</strong> {{ props.new.note }}</p>
          <p>
            <strong>Trạng thái:</strong>
            <select  v-model="statusOrder" className="border border-gray-300 ml-2 p-1 rounded" :disabled="props.new.status=='daGui'">
              <option value="choDuyet" :disabled="props.new.status=='daDuyet'">Chờ duyệt</option>
              <option value="daDuyet">Đã duyệt</option>
              <option value="daGui">Đã gửi</option>
            </select>
          </p>
          <p>
            <strong>Thời gian đặt hàng:</strong>
            {{ props.new.created_at }}
          </p>
          <p>
            <strong>Phương thức thanh toán:</strong>
            {{
              props.new.payTo === "NhanHang"
                ? "Trả tiền khi nhận hàng"
                : "Trả tiền qua chuyển khoản"
            }}
          </p>
          <p>
            <strong>Mã Giảm giá:</strong>
            {{
              props.new.sale
            }}
          </p>
        </div>
        <button @click="handleStatus(props.new)" className="bg-blue-500 text-white px-4 py-2 rounded mt-5" v-if="props.new.status!=='daGui'">
          Cập nhật
        </button>
      </div>

      <!-- {/* hiển thị sản phẩm */} -->
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">STT</th>
            <th className="px-4 py-2 border">Ảnh</th>
            <th className="px-4 py-2 border">Tên sản phẩm</th>
            <th className="px-4 py-2 border">Số lượng</th>
            <th className="px-4 py-2 border">Giá sản phẩm</th>
            <th className="px-4 py-2 border">Tổng đơn</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in props.new.cart" :key="item.id">
          <tr>
            <td className="px-4 py-2 border text-center">{{ index + 1 }}</td>
            <td className="px-4 py-2 border">
              <img :src="item.image" alt="{item.name}" className="w-20 h-20 object-cover mx-auto" />
            </td>
            <td className="px-4 py-2 border">{{ item.name }}</td>
            <td className="px-4 py-2 border text-center">
              {{ item.quantity }}
            </td>
            <td className="px-4 py-2 border">
              {{ formatVND(item.price) }}

            </td>
            <td className="px-4 py-2 border">
              {{ formatVND(item.price * item.quantity) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import apiClient from "@/api/instance";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const props = defineProps(["new"]);
const store = useStore();
const emit = defineEmits(["onClose"]);
const closeForm = () => {
  emit("onClose");
};
const statusOrder=ref(props.new.status)
// format tiền
const formatVND = (price) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
const sales = ref([])
const fetchData = async () => {
  try {
    const response2 = await apiClient.get("sales")
    sales.value = response2.data
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  fetchData()
})
// hàm tính tổng tiền 
const total = (item) => {
  console.log(999999999,item);
  
  let sum = 0;
  item.cart.forEach(i => {
    sum += i.price * i.quantity;
  });
  // Kiểm tra nếu đơn hàng có mã giảm giá và áp dụng phần trăm giảm giá
  if (item.sale) {
    const sale = sales.value.find(sale => sale.name === item.sale && sale.status);
    if (sale) {
      sum = sum - (sum * sale.down / 100); // Áp dụng giảm giá cho tổng tiền sản phẩm
    }
  }
  return sum; // Trả về tổng tiền sản phẩm sau khi áp dụng mã giảm giá
};

const handleStatus=()=>{
  props.new.status = statusOrder.value
  store.dispatch("apiEditOrder", props.new);
  emit("onClose");
}
</script>

<style></style>