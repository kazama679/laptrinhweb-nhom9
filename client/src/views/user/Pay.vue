<template>
  <div>
    <Header />
    <!-- pay -->
    <div class="shipping-form flex justify-center items-center p-5 w-full h-screen mt-20">
      <div class="shipping-form-child w-[40%] mr-[-65px]">
        <h1 class="text-2xl flex mb-4"><b>Thanh toán</b></h1>
        <h3 class="flex mb-4">Thông tin giao hàng</h3>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-2 w-[80%]">
          <div class="bg-white p-6 rounded-md border shadow-sm min-h-[calc(100vh-570px)]">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-semibold">Địa chỉ của tôi</h2>
              <button type="button" @click.prevent.stop="handleShow" class="text-blue-500 hover:underline">+ Thêm địa chỉ mới</button>
            </div>
            <div class="border-b my-5"></div>

            <!-- Danh sách địa chỉ -->
            <div class="address-list space-y-4" v-for="item in user?.contact" :key="item.id">
              <div class="address-item border flex flex-col gap-2 rounded-md p-4 relative mb-2">
                <div class="flex items-center gap-3">
                  <p class="font-medium text-[18px]">{{ item.name }}</p>
                  <div class="text-gray-500">|</div>
                  <p>{{ item.phone }}</p>
                </div>
                <p class="text-gray-700">{{ item.address }}, {{ item.commune }}, {{ item.district }}, {{ item.city }}</p>
                <div class="absolute top-2 right-2 flex flex-col gap-2">
                  <div class="flex gap-2">
                    <button type="button" @click.prevent.stop="handleSave(item.id)" class="text-blue-500 hover:text-blue-600">
                      <i class="fa-regular fa-floppy-disk"></i>
                    </button>
                    <button type="button" @click.prevent.stop="handleDelete(item.id)" class="text-red-500 hover:text-red-600">
                      <i class="fa-solid fa-x"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!error2 && !user?.contact?.length" class="text-black mt-4">Bạn chưa có địa chỉ nào.</div>
            <div v-if="error2" class="text-red-500 text-sm">Vui lòng thêm địa chỉ rồi mới thanh toán</div>
          </div>
          <div v-if="error4" class="text-green-500 text-sm flex justify-center mt-[-35px] mb-2">Đã đặt địa chỉ thành mặc định</div>

          <select v-model="payTo"
            class="select w-full p-2 border border-gray-300 cursor-pointer h-10 text-center">
            <option value="">Chọn phương thức thanh toán</option>
            <option value="NhanHang">Trả tiền khi nhận hàng</option>
            <option value="ChuyenKhoan">Chuyển khoản</option>
          </select>
          <div v-if="error" class="text-red-500 text-sm">Vui lòng chọn phương thức thanh toán</div>

          <!-- Input mã giảm giá -->
          <div class="border-b border-gray-300">
            <div class="down flex justify-between items-center pb-5 mb-2">
              <input v-model="salesInput" type="text" class="w-[calc(90%-57px)] h-[35px] border border-gray-300 pl-2" placeholder="Mã giảm giá" />
              <button type="button" @click.prevent.stop="applySales" class="h-[35px] w-[100px] bg-gray-500 text-white flex justify-center items-center">
                Sử dụng
              </button>
            </div>
            <div v-if="error3" class="text-red-500 text-sm mt-[-24px] mb-1">Mã giảm giá không đúng!</div>
            <div v-if="discount > 0" class="text-green-500 text-sm mt-[-24px] mb-1">Đã áp dụng giảm giá: {{ discount }}%</div>
          </div>

          <button v-if="user?.cart?.length != 0" type="submit"
            class="w-full p-2 bg-blue-500 text-white cursor-pointer h-10 flex justify-center items-center text-center">
            Thanh toán
          </button>
          <button v-if="user?.cart?.length == 0"
            class="w-full p-2 bg-blue-500 text-white cursor-pointer h-10 flex justify-center items-center text-center"
            @click="nextHome">
            Quay lại để mua hàng
          </button>
          <div v-if="showMenu"
            class="flex items-center justify-center p-12 bg-green-100 border border-green-200 rounded shadow-md max-w-[300px] mx-auto fixed top-[35%] left-1/2 transform -translate-x-1/2 z-[1002]">
            <div class="text-green-500 text-2xl mr-2 flex justify-center">✔</div>
            <div class="text-gray-600 text-lg">Đã đặt hàng thành công</div>
          </div>
        </form>
      </div>
      <div class="shipping-form-2 h-screen border-l border-gray-300 pl-12 flex items-center">
        <div class="cart-summary w-full">
          <!-- Hiển thị số lượng sản phẩm mua -->
          <div v-for="item in user?.cart" :key="item.id" class="item flex justify-between items-center py-2">
            <img :src='item.image' class="w-[65px] h-[65px] shadow-md" />
            <div
              class="item-div bg-gray-500 text-white text-sm w-[20px] h-[20px] flex justify-center items-center mt-[-65px] ml-[-10px]">
              {{ item.quantity }}
            </div>
            <span class="item-span1 w-[200px] mr-10 truncate overflow-hidden text-ellipsis">{{ item.name }}</span>
            <span class="item-span2 text-lg">{{ formatVND(item.price) }}</span>
          </div>

          <!-- Tạm tính và phí vận chuyển -->
          <div class="total flex justify-between py-2">
            <span>Tạm tính</span>
            <span>{{ user?.cart?.length ? formatVND(calculateTotalPrice()) : '0 VND' }}</span>
          </div>
          <div class="shipping-fee flex justify-between py-2">
            <span>Phí vận chuyển</span>
            <span v-if="user?.contact && user?.contact[user?.save]">
              {{ formatVND(user?.contact[user?.save]?.city === "Thành phố Hà Nội" ? 30000 : 50000) }}
            </span>
            <span v-else>{{ formatVND(0)}}</span>
          </div>
          <div class="grand-total flex justify-between py-2 border-t border-gray-300 mt-3 pt-3">
            <b>Tổng cộng</b>
            <span class="text-red-600 text-2xl">{{ user?.cart?.length ? formatVND(calculateGrandTotal()) : '0VND' }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- end-pay -->
    <Model v-if="show" @close="closeForm"></Model>
    <Contact />
    <Footer />
    <Delete v-if="showDelete" @close="handleCloseDelete" @deleteConfirm="handleDeleteConfirm"></Delete>
  </div>
</template>

<script setup>
import Contact from '@/components/Contact.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Delete from '@/components/Delete.vue';
import { ref, onMounted, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api/instance';
import Model from '@/components/Model.vue';
import { useStore } from 'vuex';

const error = ref(false);
const error2 = ref(false);
const error3 = ref(false);
const error4 = ref(false);
const show = ref(false);
const showDelete = ref(false);
const payTo = ref('');
const router = useRouter();
const store = useStore();
const users = ref([]);
const user = ref({
  cart: [] // Khởi tạo cart là một mảng rỗng
});

const salesInput = ref('');
const discount = ref(0); // Phần trăm giảm giá

const showMenu = ref(false);
const userLocal = JSON.parse(localStorage.getItem('userLogin') || 'null');
const newOrder = reactive({
  id: Math.ceil(Math.random() * 9999999),
  name: '',
  phone: '',
  address: '',
  status: "choDuyet",
  cart: [],
  ship: 0,
  payTo: '',
  isUser: [],
  created_at: getCurrentDate(),
  sale: '' // Giá trị mã giảm giá
});

// Danh sách mã giảm giá
const sales = ref([]);
const products = ref([]);

// Hàm lấy ngày hiện tại
function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

// Hàm lấy dữ liệu người dùng từ API
const fetchData = async () => {
  try {
    const response = await apiClient.get('users');
    const response2 = await apiClient.get('sales');
    const response3 = await apiClient.get('products');
    users.value = response.data;
    sales.value = response2.data;
    products.value = response3.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
  }
};

// Cập nhật thông tin người dùng khi dữ liệu thay đổi
watch(users, (newUsers) => {
  if (newUsers.length > 0) {
    user.value = newUsers.find(item => item.id === userLocal.id) || { cart: [] };
  }
});

// Hàm định dạng tiền tệ
const formatVND = (price) => {
  if (price) {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }
};

// Hàm tính tổng tiền giỏ hàng
const calculateTotalPrice = () => {
  if (user.value && user.value.cart) {
    let total = user.value.cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Áp dụng giảm giá nếu có
    if (discount.value > 0) {
      total = total - (total * discount.value / 100);
    }

    return total;
  }
  return 0;
};

// Tính tổng cộng bao gồm ship
const calculateGrandTotal = () => {
  const totalPrice = calculateTotalPrice();
  const shippingFee = user?.contact && user?.contact[user?.save]?.city === "Thành phố Hà Nội" ? 30000 : 50000;
  return totalPrice + shippingFee;
};

// Áp dụng mã giảm giá
const applySales = () => {
  const foundSale = sales.value.find(sale => sale.name === salesInput.value && sale.status);
  if (foundSale) {
    discount.value = foundSale.down;
    error3.value = false;
    newOrder.sale = salesInput.value; // Lưu mã giảm giá vào đơn hàng
  } else {
    discount.value = 0;
    error3.value = true;
    setTimeout(() => {
      error3.value = false;
    }, 3000);
    newOrder.sale = ''; 
  }
};

onMounted(() => {
  fetchData();
});

// Hàm mở form thêm địa chỉ
const handleShow = () => {
  show.value = true;
}

// Hàm đóng form và refresh lại dữ liệu
const closeForm = () => {
  show.value = false;
  fetchData();
}

// Hàm chọn địa chỉ mặc định
const handleSave = (id) => {
  error4.value=true
  user.value.save = user.value.contact.findi(item => item.id === id);
  store.dispatch('apiEditCustomer', user.value);
  fetchData();
  setTimeout(() => {
    error4.value=false
  }, 2000);
}

// Hàm xử lý thanh toán
// Hàm xử lý thanh toán
const handleSubmit = async () => {
  error3.value = false;
  if (user.value.contact && user.value.contact.length > 0) {
    error2.value = false;
    if (payTo.value === '') {
      error.value = true;
      setTimeout(() => {
        error.value = false;
      }, 2000);
    } else {
      error.value = false;
      const selectedContact = user.value.contact[user.value.save];
      if (selectedContact) {
        newOrder.name = selectedContact.name || '';
        newOrder.phone = selectedContact.phone || '';
        newOrder.address = `${selectedContact.address}, ${selectedContact.commune}, ${selectedContact.district}, ${selectedContact.city}` || '';
        newOrder.payTo = payTo.value;
        newOrder.cart = user.value.cart;
        newOrder.isUser = user.value.id;
        newOrder.ship = selectedContact.city === "Thành phố Hà Nội" ? 30000 : 50000;

        // Giảm stock và tăng sales cho từng sản phẩm
        newOrder.cart.forEach(cartItem => {
          // Tìm sản phẩm tương ứng trong danh sách products
          const product = products.value.find(p => p.id === cartItem.id);
          if (product) {
            // Giảm stock và tăng sales theo số lượng trong cart
            product.stock -= cartItem.quantity;
            product.sales += cartItem.quantity;

            // Gửi cập nhật lên server
            store.dispatch('apiEditProduct', product)
              .then(() => {
                console.log(`Đã cập nhật sản phẩm: ${product.name}`);
              })
              .catch(error => {
                console.error(`Lỗi khi cập nhật sản phẩm: ${product.name}`, error);
              });
          }
        });
        user.value.cart = []
        store.dispatch('apiEditCustomer', user.value)
        // Thực hiện thêm order
        store.dispatch('apiAddOrder', newOrder)
          .then(() => {
            router.push('/');
          })
          .catch(error => {
            console.error('Lỗi khi tạo đơn hàng:', error);
          });
      } else {
        console.error("Không tìm thấy thông tin địa chỉ.");
      }
    }
  } else {
    error2.value = true;
    setTimeout(() => {
      error2.value = false;
    }, 2000);
  }
};
const IdDelete=ref(null)
const handleDelete=(id)=>{
  IdDelete.value=id
  showDelete.value=true
}

const handleCloseDelete=()=>{
  showDelete.value=false
}

// Hàm xóa địa chỉ
const handleDeleteConfirm = () => {
  if (user.value.contact[user.value.save]?.id === IdDelete.value) {
    user.value.save = 0;
  }
  user.value.contact = user.value.contact.filter(item => item.id !== IdDelete.value);
  store.dispatch('apiEditCustomer', user.value)
    .then(() => {
      fetchData()
      showDelete.value=false
    })
    .catch((error) => console.error("Lỗi khi cập nhật dữ liệu người dùng:", error));
}
</script>

<style></style>