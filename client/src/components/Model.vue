<template>
    <div class="modal-overlay">
        <div class="flex justify-center items-center p-5 w-2/5 h-1/5">
            <div class="shipping-newContact-child w-full p-6 bg-white rounded">
                <div class="flex justify-between">
                    <h1 class="text-2xl flex mb-4">Thông tin nhận hàng</h1>
                    <i @click="handleClose" class="fa-solid fa-x cursor-pointer hover:text-red-500"></i>
                </div>
                <form @submit.prevent="handleSubmit" class="flex flex-col ml-14 gap-2 w-[80%]">
                    <input type="text" placeholder="Họ và tên" v-model="newContact.name"
                        class="w-full p-2 border border-gray-300 h-10 text-center" />
                    <div v-if="err.noName" class="text-red-500 text-sm">Vui lòng nhập tên người nhận hàng!</div>
                    
                    <input type="tel" placeholder="Số điện thoại" v-model="newContact.phone"
                        class="w-full p-2 border border-gray-300 h-10 text-center" />
                    <div v-if="err.noPhone" class="text-red-500 text-sm">Vui lòng nhập số điện thoại!</div>
                    <div v-if="err.phoneErr" class="text-red-500 text-sm">Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số!</div>

                    <!-- Chọn thành phố -->
                    <select v-model="selectedCity"
                        class="select w-full p-2 border border-gray-300 cursor-pointer h-10 text-center">
                        <option value="">Chọn tỉnh / thành</option>
                        <option v-for="city in cities" :key="city.code" :value="city.code">
                            {{ city.name }}
                        </option>
                    </select>
                    <div v-if="err.noCity" class="text-red-500 text-sm">Vui lòng chọn tỉnh / thành!</div>

                    <!-- Chọn quận / huyện -->
                    <select v-model="selectedDistrict"
                        class="w-full p-2 border border-gray-300 cursor-pointer h-10 text-center"
                        :disabled="districts.length === 0">
                        <option value="">Chọn quận / huyện</option>
                        <option v-for="district in districts" :key="district.code" :value="district.code">
                            {{ district.name }}
                        </option>
                    </select>
                    <div v-if="err.noDistrict" class="text-red-500 text-sm">Vui lòng chọn quận / huyện!</div>

                    <!-- Chọn phường / xã -->
                    <select v-model="selectedCommune"
                        class="w-full p-2 border border-gray-300 cursor-pointer h-10 text-center"
                        :disabled="communes.length === 0">
                        <option value="">Chọn phường / xã</option>
                        <option v-for="commune in communes" :key="commune.code" :value="commune.code">
                            {{ commune.name }}
                        </option>
                    </select>
                    <div v-if="err.noCommune" class="text-red-500 text-sm">Vui lòng chọn phường / xã!</div>

                    <!-- Địa chỉ -->
                    <input type="text" placeholder="Địa chỉ" v-model="newContact.address"
                        class="w-full p-2 border border-gray-300 h-10 text-center" />
                    <div v-if="err.noAddress" class="text-red-500 text-sm">Vui lòng nhập địa chỉ chi tiết, như số nhà, đường</div>
                    
                    <button type="submit" class="w-full p-2 bg-blue-500 text-white cursor-pointer h-10 flex justify-center items-center text-center">
                        Thanh toán
                    </button>
                    <div v-if="err.someContact" class="text-red-500 text-sm flex justify-center">Thông tin của bạn đã tồn tại, vui lòng thay đổi</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import axios from 'axios';
import apiClient from '@/api/instance';
import { useStore } from 'vuex';
const users = ref([]);
const user = ref(null);
const userLocal = JSON.parse(localStorage.getItem('userLogin') || 'null');
const store=useStore()
const emit=defineEmits(['close']);
const handleClose=()=>{
    emit('close')
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
watch(users, (newUsers) => { // Khi giá trị users thay đổi, newUsers sẽ đc cập nhập
  if (newUsers.length > 0) {
    user.value = newUsers.find(item => item.id === userLocal.id);
    console.log('user: ', user.value);
  }
});
// Các biến reactive và ref cho form và error
const cities = ref([]);
const districts = ref([]);
const communes = ref([]);
const selectedCity = ref('');
const selectedDistrict = ref('');
const selectedCommune = ref('');

const newContact = reactive({
    id: Math.ceil(Math.random()*9999999),
    name: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    commune: '',
});

const err = reactive({
    noName: false,
    noPhone: false,
    phoneErr: false,
    noCity: false,
    noDistrict: false,
    noCommune: false,
    noAddress: false,
    someContact: false
});

const handleSubmit = () => {
  // Reset các lỗi trước khi validate
  err.noName = !newContact.name;
  err.noPhone = !newContact.phone;
  // Nếu số điện thoại không trống, thì mới kiểm tra định dạng
  if (!err.noPhone) {
    err.phoneErr = !/^0[0-9]{9}$/.test(newContact.phone);
  } else {
    err.phoneErr = false;  // Nếu chưa nhập số, không kiểm tra định dạng
  }
  err.noCity = !selectedCity.value;
  err.noDistrict = !selectedDistrict.value;
  err.noCommune = !selectedCommune.value;
  err.noAddress = !newContact.address;

  // Nếu form hợp lệ, thực hiện logic xử lý
  if (!err.noName && !err.noPhone && !err.phoneErr && !err.noCity && !err.noDistrict && !err.noCommune && !err.noAddress) {
    console.log('Form hợp lệ:', newContact);

    // Kiểm tra xem thông tin người dùng nhập có trùng hoàn toàn với thông tin cũ không
    const checkContact = user.value.contact.some(item => {
      return item.name === newContact.name &&
        item.phone === newContact.phone &&
        item.city === newContact.city &&
        item.district === newContact.district &&
        item.commune === newContact.commune;
    });

    if (checkContact) {
      err.someContact = true; // Nếu thông tin trùng hoàn toàn, báo lỗi
      console.log("Thông tin của bạn đã tồn tại, vui lòng thay đổi ít nhất một mục.");
    } else {
      err.someContact = false;
      user.value.contact.push(newContact);
      store.dispatch('apiEditCustomer', user.value);
      emit('close')
    }
  } else {
    console.log('Form có lỗi, vui lòng kiểm tra lại thông tin.');
  }
};

// Hàm lấy danh sách thành phố
const fetchCities = async () => {
    try {
        const response = await axios.get('https://provinces.open-api.vn/api/p/');
        cities.value = response.data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu thành phố:', error);
    }
};

// Hàm lấy danh sách quận/huyện dựa trên thành phố
const fetchDistricts = async (cityCode) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
        districts.value = response.data.districts;
        communes.value = [];
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu quận/huyện:', error);
    }
};

// Hàm lấy danh sách xã/phường dựa trên quận/huyện
const fetchCommunes = async (districtCode) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        communes.value = response.data.wards;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu xã/phường:', error);
    }
};

// Khi thành phố thay đổi, gọi hàm lấy quận/huyện
watch(selectedCity, (newCity) => {
    if (newCity) {
        const city = cities.value.find(item => item.code === newCity);
        newContact.city = city.name;
        fetchDistricts(newCity);
    }
});

// Khi quận/huyện thay đổi, gọi hàm lấy xã/phường
watch(selectedDistrict, (newDistrict) => {
    if (newDistrict) {
        const district = districts.value.find(item => item.code === newDistrict);
        newContact.district = district.name;
        fetchCommunes(newDistrict);
    }
});

// Khi xã/phường thay đổi
watch(selectedCommune, (newCommune) => {
    if (newCommune) {
        const commune = communes.value.find(item => item.code === newCommune);
        newContact.commune = commune.name;
    }
});

// Khởi tạo lấy danh sách thành phố khi trang load
onMounted(() => {
    fetchCities();
    fetchData()
});
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Màu nền mờ */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Đặt trên tất cả các phần tử khác */
}
</style>