<template>
  <div>
    <div class="bg-slate-950 flex justify-center items-center h-12 text-sm text-gray-400 gap-12">
      <div class="flex items-center gap-2">
         +83 349 199 812
      </div>
      <div class="flex items-center gap-2">
         27 Tân Triều, Hà Đông, Hà Nội
      </div>
      <div class="flex items-center gap-2">
         Work Hours
      </div>
      <div class="ml-24 flex gap-6">
        <!-- <FaFacebook />
        <FaInstagram />
        <FaTwitch />
        <FaGoogle /> -->
      </div>

      <!-- Phần kiểm tra userLocal -->
      <div class="relative inline-block hover:text-gray-500">
        <div v-if="userLocal" class="flex gap-2 items-center cursor-pointer" @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave">
          <img class="w-8 h-8 rounded-full bg-black p-1" :src="users.find(item => item.id === userLocal.id)?.avatar" />
          <div>{{ users.find(item => item.id === userLocal.id)?.name }}</div>
        </div>
        <a class="cursor-pointer" v-else @click="handleLogin">Đăng nhập?</a>

        <!-- Phần menu hiển thị khi hover -->
        <div v-if="showMenu"
          class="absolute bg-gray-100 min-w-[140px] shadow-lg top-12 left-0 z-20 text-gray-600 p-4 mt-[-15px]"
          @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
          <p class="py-2 hover:text-teal-500 cursor-pointer flex justify-center text-center"
            @click="handleProfile">Tài khoản của tôi</p>
          <p class="py-2 hover:text-teal-500 cursor-pointer flex justify-center text-center"
            @click="handleMyOrder">Đơn mua</p>
          <p class="py-2 hover:text-teal-500 cursor-pointer flex justify-center text-center"
            @click="handleMyLike">Yêu thích</p>
          <p class="py-2 hover:text-red-500 cursor-pointer flex justify-center text-center"
            @click="handleLogout">Đăng xuất</p>
        </div>
      </div>

      <!-- Phần menu điều hướng chính -->
      <div class="bg-gray-500 bg-opacity-50 fixed top-0 z-10 w-full flex justify-around items-center mt-12 text-white py-3 transition-transform duration-700 ease-in-out translate-y-0">
        <div class="italic text-4xl">Laptops</div>
        <div class="flex gap-5">
          <div class="hover:border-b-2 border-blue-400 cursor-pointer" @click="nextHome">TRANG CHỦ</div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">DANH MỤC</div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">DỊCH VỤ CỦA CHÚNG TÔI</div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">BLOG</div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">MEGA MENU</div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">CỬA HÀNG</div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">TRANG</div>
        </div>
        <div class="relative text-4xl text-blue-500 cursor-pointer" @click="nextCart">
          <i class="fa-solid fa-cart-shopping"></i>
          <div class="absolute text-xs text-white bg-black rounded-full w-5 h-5 flex items-center justify-center -top-2 -right-2">
            {{ user?.cart.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api/instance';

const router = useRouter();
const users = ref([]);
const user = ref(null);
const showMenu = ref(false);
const userLocal = JSON.parse(localStorage.getItem('userLogin') || 'null');

// Hàm lấy dữ liệu người dùng từ API
const fetchData = async () => {
  try {
    const response = await apiClient.get('users');
    users.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
  }
};
watch(users, (newUsers) => { // Khi giá trị users thay đổi, newUsers sẽ đc cập nhập
  if (newUsers.length > 0) {
    user.value = newUsers.find(item => item.id === userLocal.id);
    fetchData();
  }
});

onMounted(() => {
  fetchData();
});

// Hiển thị menu
const handleMouseEnter = () => {
  showMenu.value = true;
};

// Ẩn menu
const handleMouseLeave = () => {
  showMenu.value = false;
};

// Chuyển hướng đến trang đăng nhập
const handleLogin = () => {
  router.push('/login');
};

const handleProfile = () => {
  router.push('/profile');
};
const handleMyOrder = () => {
  router.push('/myOrder');
};
const handleMyLike = () => {
  router.push('/myLike');
};
const handleLogout = () => {
  localStorage.removeItem('userLogin');
  router.push('/login');
};

const nextHome = () => {
  router.push('/');
};

const nextCart = () => {
  if(userLocal){
    router.push('/cart');
  }else{
    router.push('/login');
  }
};
</script>

<style></style>