<template>
  <div>
    <form @submit.prevent="addUser">
      <div class="containerRegister">
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="center">
          <h2>Please Register</h2>
          
          <input v-model="newUser.name" type="text" placeholder="Tên đăng nhập" />
          <div v-if="err.noName" class="text-red-500 text-xs">Tên đăng nhập không được để trống</div>

          <input v-model="newUser.email" type="email" placeholder="Email" />
          <div v-if="err.noEmail" class="text-red-500 text-xs">Email không được để trống</div>
          <div v-if="err.sameEmail" class="text-red-500 text-xs">Email không hợp lệ hoặc đã tồn tại</div>

          <input v-model="newUser.password" type="password" placeholder="Mật khẩu" />
          <div v-if="err.noPassword" class="text-red-500 text-xs">Mật khẩu không được để trống</div>
          <div v-if="err.passwordTooShort" class="text-red-500 text-xs">Mật khẩu phải có ít nhất 6 ký tự</div>

          <input v-model="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" />
          <div v-if="err.passwordMismatch" class="text-red-500 text-xs">Mật khẩu không trùng</div>

          <input v-model="newUser.phone" type="text" placeholder="Số điện thoại" />
          <div v-if="err.phone" class="text-red-500 text-xs">Số điện thoại không hợp lệ</div>
          <div v-if="err.phone2" class="text-red-500 text-xs">Số điện thoại không được trùng</div>

          <button type="submit" class="mt-2 bg-pink-600 text-white rounded-full px-8 py-1 uppercase font-bold hover:bg-black transition">
            Đăng ký
          </button>
          
          <a @click="toLogin" class="text-blue-500 text-sm mt-2 cursor-pointer hover:text-red-600">
            Bạn đã có tài khoản?
          </a>

          <div v-if="successMessage" class="text-green-500 text-xs mt-2">{{ successMessage }}</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import apiClient from "@/api/instance";
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const users = ref([]);

// Tải dữ liệu người dùng (giả lập)
const fetchData = async () => {
  const response = await apiClient('users');
  users.value = response.data;
};

onMounted(() => {
  fetchData();
});

// Chuyển hướng đến trang đăng nhập
const toLogin = () => {
  router.push("/login");
};

// Lấy ngày hiện tại
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

// Biến lưu trữ thông tin lỗi
const err = reactive({
  noName: false,
  noEmail: false,
  sameEmail: false,
  noPassword: false,
  passwordTooShort: false,
  passwordMismatch: false,
  phone: false,
  phone2: false,
});

// Biến lưu mật khẩu nhập lại
const confirmPassword = ref("");

// Biến thông báo thành công
const successMessage = ref("");

// reset thông báo trong 3s
const resetErr=()=>{
  setTimeout(() => {
      err.noName = '';
      err.noEmail = '';
      err.sameEmail = '';
      err.noPassword = '';
      err.passwordTooShort = ''; 
      err.passwordMismatch = '';
      err.phone = '';
      err.phone2 = '';
    }, 3000);
}

// Biến lưu thông tin người dùng
const newUser = reactive({
  id: Math.ceil(Math.random() * 9999999),
  name: "",
  email: "",
  status: true,
  password: "",
  role: false,
  avatar: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
  phone: "",
  address: "",
  created_at: getCurrentDate(),
  cart: [],
  like: [],
  contact:[],
  save:0
});

// Thêm người dùng
const addUser = () => {
  // Reset tất cả các lỗi trước khi kiểm tra lại
  err.noName = false;
  err.noEmail = false;
  err.sameEmail = false;
  err.noPassword = false;
  err.passwordTooShort = false;
  err.passwordMismatch = false;
  err.phone = false;
  err.phone2 = false;

  // Kiểm tra tên đăng nhập
  if (newUser.name === "") {
    err.noName = true;
    resetErr()
    return;
  }

  // Kiểm tra email
  if (newUser.email === "") {
    err.noEmail = true;
    resetErr()
    return;
  } else if (!validateEmail(newUser.email)) {
    err.sameEmail = true;
    resetErr()
    return;
  } else if (users.value.some((user) => user.email === newUser.email)) {
    err.sameEmail = true;
    resetErr()
    return;
  }

  // Kiểm tra mật khẩu
  if (newUser.password === "") {
    err.noPassword = true;    
    resetErr()
    return;
  } else if (newUser.password.length < 6) { // Kiểm tra độ dài mật khẩu
    err.passwordTooShort = true;
    resetErr()
    return;
  }

  // Kiểm tra mật khẩu nhập lại có khớp không
  if (newUser.password !== confirmPassword.value) {
    err.passwordMismatch = true;
    resetErr()
    return;
  }

  // Kiểm tra số điện thoại (phải bắt đầu bằng số 0 và có đúng 10 số)
  if (!/^0\d{9}$/.test(newUser.phone)) {
    err.phone = true;
    resetErr();
    return;
  } else if (users.value.some((user) => user.phone === newUser.phone)) {
    // Kiểm tra số điện thoại có trùng không
    err.phone2 = true;
    resetErr();
    return;
  }

  // Nếu có lỗi thì không tiếp tục
  if (
    err.noName ||
    err.noEmail ||
    err.sameEmail ||
    err.noPassword ||
    err.passwordTooShort ||
    err.passwordMismatch ||
    err.phone||
    err.phone2
  ) {
    resetErr()
    return;
  }

  // Nếu không có lỗi, tiếp tục đăng ký
  successMessage.value = "Đăng ký thành công!";
  setTimeout(() => {
    successMessage.value = ""; // Ẩn thông báo sau 3 giây
    router.push('/login')
  }, 2000);

  store.dispatch('apiAddCustomer', newUser);
};

// Hàm kiểm tra email hợp lệ
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(email.toLowerCase());
};
</script>



<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700");
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  font-family: "Raleway", sans-serif;
}

.containerRegister {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.containerRegister:hover .top:before,
.containerRegister:hover .top:after,
.containerRegister:hover .bottom:before,
.containerRegister:hover .bottom:after,
.containerRegister:active .top:before,
.containerRegister:active .top:after,
.containerRegister:active .bottom:before,
.containerRegister:active .bottom:after {
  margin-left: 275px;
  transform-origin: -275px 50%;
  transition-delay: 0s;
}
.containerRegister:hover .center,
.containerRegister:active .center {
  opacity: 1;
  transition-delay: 0.2s;
}

.top:before,
.top:after,
.bottom:before,
.bottom:after {
  content: "";
  display: block;
  position: absolute;
  width: 200vmax;
  height: 200vmax;
  top: 50%;
  left: 50%;
  margin-top: -100vmax;
  transform-origin: 0 50%;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  z-index: 10;
  opacity: 0.65;
  transition-delay: 0.2s;
}

.top:before {
  transform: rotate(45deg);
  background: #e46569;
}
.top:after {
  transform: rotate(135deg);
  background: #ecaf81;
}

.bottom:before {
  transform: rotate(-45deg);
  background: #60b8d4;
}
.bottom:after {
  transform: rotate(-135deg);
  background: #3745b5;
}

.center {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;
}
.center input {
  width: 100%;
  padding: 10px;
  margin: 5px;
  border-radius: 1px;
  border: 1px solid #ccc;
  font-family: inherit;
}
.fade-out {
  transition: opacity 1s ease-out;
  opacity: 1;
}

.fade-out.hide {
  opacity: 0;
}
</style>
