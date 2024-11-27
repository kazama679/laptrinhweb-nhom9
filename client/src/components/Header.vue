<template>
  <div>
    <div class="bg-slate-950 flex justify-center items-center h-12 text-sm text-gray-400 gap-12">
      <div class="flex items-center gap-2">+83 349 199 812</div>
      <div class="flex items-center gap-2">27 Tân Triều, Hà Đông, Hà Nội</div>
      <div class="flex items-center gap-2">Work Hours</div>
      <div class="ml-24 flex gap-6"></div>

      <!-- Phần kiểm tra userLocal -->
      <div class="relative inline-block hover:text-gray-500">
        <div v-if="userLocal && currentUser" class="flex gap-2 items-center cursor-pointer" @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave">
          <img class="w-8 h-8 rounded-full bg-black p-1" :src="currentUser.avatar" alt="User Avatar" />
          <div>{{ currentUser.name }}</div>
        </div>
        <a class="cursor-pointer" v-else @click="handleLogin">Đăng nhập?</a>

        <!-- Phần menu hiển thị khi hover -->
        <div v-if="showMenu"
          class="absolute bg-gray-100 min-w-[140px] shadow-lg top-12 left-0 z-20 text-gray-600 p-4 mt-[-15px]"
          @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
          <p class="py-2 hover:text-teal-500 cursor-pointer flex justify-center text-center" @click="handleProfile">
            Tài khoản của tôi
          </p>
          <p class="py-2 hover:text-teal-500 cursor-pointer flex justify-center text-center" @click="handleMyOrder">
            Đơn mua
          </p>
          <p class="py-2 hover:text-teal-500 cursor-pointer flex justify-center text-center" @click="handleMyLike">
            Yêu thích
          </p>
          <p class="py-2 hover:text-red-500 cursor-pointer flex justify-center text-center" @click="handleLogout">
            Đăng xuất
          </p>
        </div>
      </div>

      <!-- Phần menu điều hướng chính -->
      <div :class="['menu', isScrollingDown ? 'menu-hidden' : 'menu-visible']"
        class="bg-gray-500 bg-opacity-50 fixed top-0 z-10 w-full flex justify-around items-center text-white py-3">
        <div class="italic text-4xl">Laptops</div>
        <div class="flex gap-5">
          <div class="hover:border-b-2 border-blue-400 cursor-pointer" @click="nextHome">
            TRANG CHỦ
          </div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">
            DANH MỤC
          </div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">
            DỊCH VỤ CỦA CHÚNG TÔI
          </div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">
            BLOG
          </div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">
            MEGA MENU
          </div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">
            CỬA HÀNG
          </div>
          <div class="hover:border-b-2 border-blue-400 cursor-pointer">
            TRANG
          </div>
        </div>
        <div class="relative text-4xl text-blue-500 cursor-pointer" @click="nextCart">
          <i class="fa-solid fa-cart-shopping"></i>
          <div
            class="absolute text-xs text-white bg-black rounded-full w-5 h-5 flex items-center justify-center -top-2 -right-2">
            {{ currentUser?.cart?.length || 0 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const showMenu = ref(false);
const userLocal = JSON.parse(localStorage.getItem("userLogin") || "null");
const listCustomer = computed(() => store.state.customer?.data || []);
const currentUser = computed(() => listCustomer.value.find((item) => item?.id === userLocal?.id) || null);

// Hàm lấy dữ liệu người dùng từ API
const fetchData = async () => {
  try {
    // Đợi API hoàn tất
    await store.dispatch("apiGetCustomer");
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

onMounted(fetchData);

// Ẩn hiện thanh
const lastScrollTop = ref(0);
const isScrollingDown = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  isScrollingDown.value = currentScroll > lastScrollTop.value;
  lastScrollTop.value = currentScroll <= 0 ? 0 : currentScroll;
};

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
  router.push("/login");
};

// Điều hướng đến các trang khác
const handleProfile = () => router.push("/profile");
const handleMyOrder = () => router.push("/myOrder");
const handleMyLike = () => router.push("/myLike");
const handleLogout = () => {
  localStorage.removeItem("userLogin");
  router.push("/login");
};
const nextHome = () => router.push("/");
const nextCart = () => {
  if (userLocal) {
    router.push("/cart");
  } else {
    router.push("/login");
  }
};
</script>

<style>
.menu {
  margin-top: 48px;
  transition: transform 0.8s ease;
}

.menu-hidden {
  transform: translateY(-175%); /* Ẩn menu bằng cách đẩy nó ra khỏi khung nhìn */
}

.menu-visible {
  transform: translateY(0); /* Hiện menu */
}
</style>