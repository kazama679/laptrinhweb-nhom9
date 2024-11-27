<template>
  <div>
    <div className="profile-container mx-auto mt-12 p-6 bg-white border border-gray-300 rounded-lg max-w-lg">
      <div className="profile-container-out flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Hồ Sơ Của Tôi</h1>
        <div className="profile-container-out-icon cursor-pointer">
          <i @click="nextHome" class="fa-solid fa-x hover:text-red-500"></i>
        </div>
      </div>
      <p className="mb-6 text-gray-600">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>

      <div v-if="user" className="form-group flex flex-col mb-4">
        <label htmlFor="name" className="text-sm font-semibold">Tên</label>
        <input
          type="text"
          id="name"
          v-model="ChangeUser.name"
          className="w-full p-3 border border-gray-300 rounded-md h-10"
        />
      </div>

      <div className="form-group flex flex-col mb-4">
        <label htmlFor="phone" className="text-sm font-semibold">Số điện thoại</label>
        <input
          type="text"
          id="phone"
          v-model="ChangeUser.phone"
          className="w-full p-3 border border-gray-300 rounded-md h-10"
        />
      </div>

      <div class="col-span-1">
        <label htmlFor="image" class="block text-sm font-medium">Ảnh đại diện</label>
        <input class="mt-1 p-2 border rounded w-full" type="file" @change="handleFileChange" />
        <div class="flex justify-center text-center">
          <!-- Hiển thị ảnh đã lưu trong avatar hoặc ảnh tạm thời nếu có ảnh mới -->
          <img :src="previewImage || ChangeUser.avatar" class="w-16 h-16 mt-4 object-cover" />
        </div>
      </div>

      <div className="form-group flex flex-col mb-4">
        <label htmlFor="oldPassword" className="text-sm font-semibold">Mật khẩu cũ</label>
        <input
          type="password"
          id="oldPassword"
          v-model="oldPassword"
          className="w-full p-3 border border-gray-300 rounded-md h-10"
          placeholder="Nhập mật khẩu cũ"
        />
        <div v-if="passwordErr" class="text-red-500 text-xs mt-1">Mật khẩu cũ không đúng</div>
      </div>

      <div className="form-group flex flex-col mb-4">
        <label htmlFor="oldPassword" className="text-sm font-semibold">Mật khẩu mới</label>
        <input
          type="password"
          id="oldPassword"
          v-model="newPassword"
          className="w-full p-3 border border-gray-300 rounded-md h-10"
          placeholder="Nhập mật khẩu mới"
        />
        <div v-if="passwordTooShort" class="text-red-500 text-xs mt-1">Mật khẩu phải có ít nhất 6 ký tự</div>
        <div v-if="passwordErr2" class="text-red-500 text-xs mt-1">Mật khẩu không được để trống</div>
      </div>
      
      <button
        @click="handleSubmit"
        className="save-button w-full py-3 bg-sky-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center h-10"
      >
        Lưu
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/api/instance';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase";
import { useStore } from 'vuex';

const store=useStore()
const router = useRouter();
const users = ref([]);
const newPassword = ref('');
const oldPassword = ref('');
const passwordTooShort = ref(false);
const passwordErr = ref(false);
const passwordErr2 = ref(false);
const file = ref(null); // Thêm biến để lưu trữ file ảnh được chọn
const previewImage = ref(''); // Biến này lưu URL tạm thời của ảnh mới
const user = ref(null);
const userLocal = JSON.parse(localStorage.getItem('userLogin') || 'null');
const ChangeUser = reactive({
  id: '',
  name: '',
  email: '',
  status: '',
  password: '',
  role: '',
  avatar: '', // Ảnh cũ của người dùng
  phone: '',
  created_at: '',
  cart: [],
  like: [],
  contact: [],
  save: []
});

if(userLocal=='null'||!userLocal){
  router.push('/login')
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

// Đồng bộ dữ liệu khi `users` thay đổi
watch(users, (newUsers) => {
  if (newUsers.length > 0) {
    user.value = newUsers.find(item => item.id === userLocal.id);
    if (user.value) {
      // Cập nhật thông tin vào ChangeUser sau khi user đã có dữ liệu
      ChangeUser.id = user.value.id;
      ChangeUser.name = user.value.name;
      ChangeUser.email = user.value.email;
      ChangeUser.status = user.value.status;
      ChangeUser.password = user.value.password;
      ChangeUser.role = user.value.role;
      ChangeUser.avatar = user.value.avatar; // Ảnh cũ của người dùng từ API
      ChangeUser.phone = user.value.phone;
      ChangeUser.created_at = user.value.created_at;
      ChangeUser.cart = user.value.cart;
      ChangeUser.like = user.value.like;
      ChangeUser.contact = user.value.contact;
      ChangeUser.save = user.value.save;
    }
  }
});

onMounted(() => {
  fetchData();
});

// Điều hướng về trang chủ
const nextHome = () => {
  router.push('/');
};

// Hàm lấy file ảnh từ input và hiển thị ảnh đã chọn
const handleFileChange = (event) => {
  file.value = event.target.files[0];
  
  // Sử dụng FileReader để tạo URL tạm thời cho ảnh
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result; // Lưu URL ảnh tạm thời để hiển thị
  };
  reader.readAsDataURL(file.value); // Đọc file và tạo URL
};

const handleSubmit = async () => {
  try {
    // Kiểm tra nếu có file ảnh, upload ảnh lên Firebase trước
    if (file.value) {
      // Tạo đường dẫn trong Firebase Storage cho file ảnh
      const storageReference = storageRef(storage, `avatars/${file.value.name}`);
      
      // Upload ảnh lên Firebase Storage
      await uploadBytes(storageReference, file.value);
      
      // Lấy URL của ảnh sau khi upload
      const urlDownload = await getDownloadURL(storageReference);
      
      // Cập nhật URL của ảnh vào thông tin người dùng
      ChangeUser.avatar = urlDownload;
    }

    // Kiểm tra nếu người dùng nhập mật khẩu cũ
    if (oldPassword.value) {
      // Kiểm tra xem mật khẩu cũ có đúng không
      if (oldPassword.value !== user.value.password) {
        passwordErr.value = true; // Hiển thị thông báo lỗi mật khẩu cũ không đúng
        return;
      } else {
        passwordErr.value = false; // Ẩn thông báo lỗi nếu mật khẩu đúng
      }

      // Kiểm tra nếu mật khẩu mới rỗng
      if (!newPassword.value) {
        passwordErr2.value = true; // Hiển thị thông báo mật khẩu mới không được để trống
        return;
      } else {
        passwordErr2.value = false; // Ẩn thông báo lỗi mật khẩu rỗng
      }

      // Kiểm tra mật khẩu mới phải có ít nhất 6 ký tự
      if (newPassword.value.length < 6) {
        passwordTooShort.value = true; // Hiển thị thông báo lỗi nếu mật khẩu quá ngắn
        return;
      } else {
        passwordTooShort.value = false; // Ẩn thông báo lỗi nếu mật khẩu đủ dài
      }

      // Nếu người dùng nhập mật khẩu mới, cập nhật mật khẩu mới
      ChangeUser.password = newPassword.value;
    }

    // Cập nhật thông tin tên và số điện thoại
    ChangeUser.name = ChangeUser.name || user.value.name;
    ChangeUser.phone = ChangeUser.phone || user.value.phone;

    // Cập nhật thông tin người dùng lên store
    store.dispatch('apiEditCustomer', ChangeUser);

    // Điều hướng về trang chủ hoặc reset form
    router.push('/');
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    alert('Có lỗi xảy ra khi cập nhật thông tin.');
  }
};

</script>

<style scoped></style>