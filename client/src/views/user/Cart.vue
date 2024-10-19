<template>
  <div>
    <Header></Header>
    <!-- cart -->
    <div class="shopping-cart p-5 font-sans border-gray-200 mb-4">
      <div class="shopping-cart__header mt-16 text-center mb-5">
        <h2 class="shopping-cart__header-h2 inline-block relative text-2xl font-bold pb-2">
          Giỏ hàng của bạn
          <span class="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-gray-500"></span>
        </h2>
      </div>
      <div class="shopping-cart-child flex justify-center gap-6">
        <div v-if="user?.cart.length!==0" class="shopping-cart__items mt-5 w-[650px] p-2 bg-white">
          <div class="shopping-cart__items-p bg-gray-100 flex gap-1 py-4 px-5 -mt-2 mb-4">
            <p class="text-lg">
              Bạn đang có <b>{{ user?.cart.length }} sản phẩm</b> trong giỏ hàng
            </p>
          </div>
          <div v-for="item in user?.cart" :key="item.id">
            <div class="item py-2 flex justify-between items-center">
              <div class="item-card flex items-center">
                <img class="shopping-cart__item-img w-20 h-20 mb-5 mr-5 shadow-md" :src='item.image' />
                <div class="shopping-cart__details flex flex-col items-start text-left">
                  <b class="shopping-cart__name font-serif">{{ wordProduct(item.name) }}</b>
                  <div class="counter mt-2 mb-2 flex justify-center">
                    <button @click="downQuantity(item)" :disabled="item.quantity==1" class="w-6 h-6 flex items-center justify-center bg-gray-200 border-none">
                      -
                    </button>
                    <input type="text" class="w-9 h-6 text-center border border-gray-200" v-model="item.quantity" @input="handleQuantityChange(item)" />
                    <button @click="upQuantity(item)" class="w-6 h-6 flex items-center justify-center bg-gray-200 border-none">
                      +
                    </button>
                  </div>
                  <b>{{ formatVND(item.price) }}</b>
                </div>
              </div>
              <div>
                <i @click="handleDelete(item)" class="fa-solid fa-trash icon-delete w-6 text-xl text-gray-500 cursor-pointer hover:text-red-500"></i>
              </div>
            </div>
            <div class="shopping-cart__price flex justify-between items-center border-b border-gray-300 pb-2">
              <b>Thành tiền:</b>
              <b className="shopping-cart__price-number text-red-600">{{ formatVND(item.price * item.quantity) }}</b>
            </div>
          </div>
          <div class="shopping-cart__notes mt-5">
            <textarea class="w-full h-24 p-2 border border-gray-300" placeholder="Ghi chú đơn hàng"></textarea>
          </div>

          <!-- <div class="text-red-500 text-center mt-4">hết hàng</div> -->

          <button @click="handleClearCart"
            class="shopping-cart__clear-all w-2/5 rounded py-2 bg-red-600 text-white text-center border-none cursor-pointer mt-5">
            Xóa tất cả sản phẩm trong giỏ
          </button>
        </div>
        <div v-else class="shopping-cart-zero flex justify-center mt-12 text-lg text-black w-[44%]">
          Giỏ hàng của bạn đang trống
        </div>
        <div class="shopping-cart__summary mt-5 border border-gray-300 w-[20%] h-[217px] p-4">
          <b class="shopping-cart__summary-b border-b border-gray-300 pb-4 pt-2 block">
            Thông tin đơn hàng
          </b>
          <div class="shopping-cart__summary__child flex justify-between items-center border-b border-gray-300 pb-2 mt-4 mb-2">
            <b>Tổng tiền: </b>
            <div class="shopping-cart__summary__child2 text-2xl text-red-600">{{ user?.cart?.length ? formatVND(calculateTotalPrice()) : '0 VND' }}</div>
          </div>
          <div class="shopping-cart__summary-t text-gray-500 text-xs mb-2">
            Bạn có thể nhập mã giảm giá ở trang thanh toán
          </div>

          <button v-if="user?.cart.length!==0" @click="handlePay"
            class="shopping-cart__checkout w-full py-2 bg-red-600 text-white text-center border-none">
            Thanh toán
          </button>
          <div v-else class="text-center text-red-600 font-bold mt-4">
            Bạn không có sản phẩm nào!
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 my-4"></div>

      <div class="shopping-cart__actions flex flex-col items-center mt-2">
        <button class="shopping-cart__continue w-[50%] py-2 bg-white border border-gray-300 rounded-md text-center cursor-pointer mt-5 font-serif text-xl font-bold hover:bg-gray-100 transition-all" @click="nextHome">
          Quay lại Trang chủ
        </button>
      </div>
    </div>
    <Delete v-if="showDelete" @deleteConfirm="handleDeleteConfirm" @close="handleClose" :text1="act1" :text2="act2" @deleteAllConfirm="handleDeleteAll"></Delete>
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import Contact from '@/components/Contact.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue'
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api/instance';
import { useStore } from 'vuex';
import Delete from '@/components/Delete.vue'

const store = useStore()
const router = useRouter();
const users = ref([]);
const userLocal = JSON.parse(localStorage.getItem('userLogin') || 'null');
const showDelete=ref(false)
// Điều hướng nếu chưa đăng nhập
if (!userLocal) {
  router.push('/login');
}

// Hàm lấy dữ liệu người dùng từ API
const fetchData = async () => {
  try {
    const response = await apiClient.get('users');
    users.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
  }
};

// Gọi API khi component được mounted
onMounted(() => {
  fetchData();
});

const user = ref(null);

watch(users, (newUsers) => { // Khi giá trị users thay đổi, newUsers sẽ đc cập nhập
  if (newUsers.length > 0) {
    user.value = newUsers.find(item => item.id === userLocal.id);
    console.log('user: ', user.value);
  }
});

const nextHome=()=>{
  router.push('/')
}

const handlePay=()=>{
  router.push('/pay')
}

// Hàm tính tổng tiền giỏ hàng
const calculateTotalPrice = () => {
  if (user.value && user.value.cart) {
    return user.value.cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  return 0;
};

// Hàm format tiền
const formatVND = (price) => {
  if (!price || isNaN(price)) {
    return "0 VND";
  }
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const wordProduct = (name) => {
  const words = name.split(' '); // Tách chuỗi theo khoảng trắng
  return words.slice(0, 4).join(' '); // Lấy 4 từ đầu tiên và ghép lại bằng dấu cách
};

const idDelete=ref(null)
// hàm xóa sản phẩm
const handleDelete = (product) => {
  idDelete.value=product.id
  showDelete.value=true
};

const handleDeleteConfirm = () => {
  const newCart = user.value?.cart.filter(item => item.id !== idDelete.value);
  user.value = { ...user.value, cart: newCart };
  store.dispatch('apiEditCustomer', user.value);
  showDelete.value = false;
}

const handleClose=()=>{
  act1.value=''
  act2.value=''
  showDelete.value=false
}
const act1=ref('')
const act2=ref('')
const handleClearCart=()=>{
  act1.value='Xác nhận xóa tất cả'
  act2.value='Bạn có chắc chắn xóa tất cả sản phẩm trong giỏ hàng?'
  showDelete.value = true;
}
// xóa tất cả
const handleDeleteAll = () => {
  user.value = { ...user.value, cart: [] };
  store.dispatch('apiEditCustomer', user.value);
  act1.value=''
  act2.value=''
  showDelete.value = false;
}

// tăng số lượng sản phẩm
const upQuantity = (product) => {
  const indexProduct = user.value?.cart.findIndex(item => item.id === product.id);
  if(indexProduct!=-1){
    user.value.cart[indexProduct].quantity++
    store.dispatch('apiEditCustomer', user.value);
  }
};

// giảm số lượng sản phẩm
const downQuantity=(product)=>{
  const indexProduct = user.value?.cart.findIndex(item => item.id === product.id);
  if(indexProduct!=-1){
    user.value.cart[indexProduct].quantity--
    store.dispatch('apiEditCustomer', user.value);
  }
}

// Hàm để xử lý khi số lượng thay đổi trong input
const handleQuantityChange = (product) => {
  const indexProduct = user.value?.cart.findIndex(item => item.id === product.id);
  if (indexProduct !== -1) {
    // Chuyển đổi giá trị từ input thành số nguyên
    let newQuantity = parseInt(user.value.cart[indexProduct].quantity, 10);
    // Kiểm tra nếu giá trị nhỏ hơn 1, đặt lại thành 1
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }
    user.value.cart[indexProduct].quantity = newQuantity;
    store.dispatch('apiEditCustomer', user.value);
  }
};
</script>

<style></style>