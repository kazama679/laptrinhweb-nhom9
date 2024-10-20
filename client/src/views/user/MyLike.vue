<template>
  <div>
      <Header />
      <div className='flex justify-center text-center pt-28 text-3xl font-bold'>Sản phẩm yêu thích của bạn</div>

      <!-- {/* Hiển thị danh sách sản phẩm yêu thích */} -->
      <div className="profile-container-bot" v-for="product in user?.like" :key="product.id">
          <div className="order-item-all flex justify-center items-center mt-12 mb-5">
            <div className="order-item w-4/5 bg-gray-100 border border-gray-300 rounded-lg p-5 mb-5">
              <div className="order-header flex justify-between items-center mb-5">
                <div>
                  <span className="text-lg font-bold">
                    {{product.name.split(' ').slice(0, 5).join(' ')}}
                  </span>
                </div>
                <div className="price-info text-right">
                  <span className="text-red-500 text-lg">{{formatVND(product.price)}}</span>
                </div>
              </div>
              <div className="order-details flex justify-between items-center mb-5">
                <img :src='product.image' alt={product.name} className="w-[100px] h-[100px] object-cover mr-5 border border-gray-300" />
                <div className="product-info flex-grow">
                  <p className="product-description text-gray-600 mb-1 w-2/5">{{(product.description.split(' ').slice(0, 20).join(' '))}} ...</p>
                </div>
              </div>
              <div className="order-actions flex justify-end items-center mt-[-50px] gap-3">
                <button @click="deleteLike(product)" className="contact-seller-button flex py-2 px-4 rounded-md bg-red-500 text-white">Xóa</button>
                <button className="contact-seller-button flex py-2 px-4 rounded-md bg-orange-500 text-white">Liên hệ người bán</button>
                <button @click="nextCard(product.id)" className="contact-seller-button flex py-2 px-4 rounded-md bg-green-500 text-white">Xem chi tiết sản phẩm</button>
              </div>
            </div>
          </div>
      </div>
      <div v-if="user?.like.length==0" className="order-item-all flex justify-center items-center mt-20 mb-20 text-red-500">Bạn chưa có bất kỳ sản phẩm phẩm yêu thích nào, hãy thêm ở phần trang chủ!</div>
      <div class="shopping-cart__actions flex flex-col items-center mt-2">
        <button class="shopping-cart__continue w-[50%] py-2 bg-white border border-gray-300 rounded-md text-center cursor-pointer mt-5 font-serif text-xl font-bold hover:bg-gray-100 transition-all" @click="nextHome">
          Quay lại Trang chủ
        </button>
      </div>
      <Contact />
      <Footer />
      <Delete v-if="showMenu" @deleteConfirm="handleDeleteConfirm" @close="handleClose"></Delete>
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
const store=useStore()
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
    console.log('user: ', user.value);
  }
  if (!user.value.like) {
      user.value.like = [];
    }
});

onMounted(() => {
  fetchData();
});
// format tiền
const formatVND = (price) => {
  if(price){
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }
};
const nextCard=(id)=>{
  router.push(`/card/${id}`)
}
const IdDelete=ref(null)
const deleteLike = (item) => {
  showMenu.value = true;
  IdDelete.value = item.id; 
};
const nextHome=()=>{
  router.push('/')
}

const handleClose=()=>{
  showMenu.value=false
}
const handleDeleteConfirm = () => {
  // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
  if (user.value.like.some(i => i.id === IdDelete.value)) {
    // Xóa sản phẩm khỏi danh sách yêu thích
    user.value.like = user.value.like.filter(item => item.id !== IdDelete.value);
    store.dispatch('apiEditCustomer', user.value);
    showMenu.value = false;
  }
}
</script>

<style>

</style>