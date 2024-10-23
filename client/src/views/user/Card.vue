<template>
  <div>
    <Header />
    <div className="flex justify-center items-center mt-32">
      <div className="w-3/4 flex p-6 border border-gray-300 rounded-lg bg-white">
        <div className="w-1/2">
          <img className="w-full h-full rounded-lg shadow-md" :src='product?.image' alt= />
        </div>
        <div className="w-1/2 flex flex-col justify-between ml-10 text-left">
          <h1 className="text-2xl font-bold mb-2">{{ product?.name }}</h1>
          <div className="flex items-center mb-2">
            <span className="mr-2">{calculateAverageRating()}</span> <!-- {/* Hiển thị giá trị trung bình */} -->
            <div className="flex text-yellow-500">
              <span key={index} className="mr-1">★</span>
              <span key={index} className="mr-1">☆</span>
              <!-- // Hiển thị sao trống cho phần còn lại -->
            </div>
            <span className="ml-2">chính hãng</span>
          </div>

          <div className="flex text-lg text-gray-500 mb-2">
            <span>chính sách trả hàng:</span>
            <span className="flex items-center ml-2 text-red-500">
              <GiReturnArrow className="text-red-500" />
              <p>Đổi trả 15 ngày</p>
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg">Giá sản phẩm:</span>
            <span className="text-xl text-red-500 font-bold">{{ formatVND(product?.price) }}</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <b>Chi tiết sản phẩm:</b> {{ product?.description }}
          </div>
          <div className="flex space-x-4">
            <button @click='handleAddToCart'
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <FaCartPlus /> Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- {/* Sản phẩm liên quan */} -->
    <div class="container mx-auto my-10 px-40 py-20 bg-gray-50">
      <h2 class="text-lg font-bold text-left">Sản phẩm liên quan</h2>
      <div class="flex flex-wrap justify-between gap-5 mt-5">
        <!-- Vòng lặp qua sản phẩm liên quan -->
        <div v-for="item in someCat(products.filter(i => i.category == product?.category && i.id !== product.id)).slice(0, 4)" :key="item.id" @click="nextCard(item.id)"
          class="bg-white rounded-lg overflow-hidden hover:shadow-lg cursor-pointer w-1/5"> 
          <img class="w-full h-40 object-cover" :src="item.image" alt="Product Image" />
          <div class="p-4">
            <h3 class="text-sm font-semibold truncate">{{ item.name }}</h3>
            <p class="text-red-500 mt-2 font-bold">{{ formatVND(item.price) }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- {/* end-Sản phẩm liên quan */} -->

    <!-- {/* bình luận */} -->
    <div className="container mx-auto mt-8 px-40">
      <!-- {/* Nút đánh giá */} -->
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Lọc theo</h2>
        <button v-if="true" onClick={showForm1} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Đánh giá ngay
        </button>
        <button v-else onClick={showForm2} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Bình luận ngay
        </button>
      </div>
      <!-- {/* Bộ lọc */} -->
      <div className="flex items-center space-x-4 my-4">
        <button className='border border-red-500 px-4 py-2 rounded-full text-red-500'>
          Đã mua hàng
        </button>
        <button className='border border-red-500 px-4 py-2 rounded-full text-red-500'>
          Hỏi đáp
        </button>
        <div className="flex space-x-2">
          <button key={star} className='border px-4 py-2 rounded-full border-red-500 text-red-500'>
            {star} sao
          </button>
        </div>
      </div>
      <!-- {/* Danh sách đánh giá */} -->
      <div key={review.id} className="border-b border-gray-300 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
            {review.name[0].toUpperCase()} <!-- {/* Chữ cái đầu của tên người dùng */} -->
          </div>
          <div>
            <p className="font-bold">{review.name}</p>
            <div className="flex items-center text-gray-500">
              <FaClock className="mr-2" />
              <span>{review.created_at}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <FaStar key={i} className="text-yellow-500 mr-1" />
          <FaStar key={i} className="text-gray-300 mr-1" />
        </div>
        <p className="mt-2 text-gray-600">{review.comment}</p>
      </div>
      <div v-if="false" className="text-black">Chưa có đánh giá nào.</div>
      <!-- // hỏi đáp -->
      <div key={review.id} className="w-full bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-full bg-purple-500 text-white flex justify-center items-center text-xl font-bold">
            {review.name[0].toUpperCase()}
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <span className="font-semibold">{review.name}</span>
            </div>
            <p className="bg-gray-100 p-3 rounded-lg mt-2">
              {review.comment}
            </p>
            <div className="flex justify-end mt-2">
              <button className="flex items-center text-red-500 hover:text-red-700 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M18 10c0 .55-.45 1-1 1H6.41l3.3 3.29a1.003 1.003 0 01-1.42 1.42l-5-5a.999.999 0 010-1.42l5-5a1.003 1.003 0 011.42 1.42L6.41 9H17c.55 0 1 .45 1 1z"
                    clipRule="evenodd" />
                </svg>
                Trả lời
              </button>
            </div>
          </div>
        </div>
        <!-- {/* Hiển thị feedback cho từng comment */} -->
        <div key={item.id} className="flex items-start gap-4 mb-6 ml-16">
          <div
            className="w-12 h-12 rounded-full bg-red-500 text-white flex justify-center items-center text-xl font-bold">
            {item.name[0].toUpperCase()}
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <span className="font-semibold text-red-500">{item.name}</span>
            </div>
            <p className="bg-gray-100 p-3 rounded-lg mt-2">
              {item.comment}
            </p>
            <div className="flex justify-end mt-2">
              <button className="flex items-center text-red-500 hover:text-red-700 text-sm">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M18 10c0 .55-.45 1-1 1H6.41l3.3 3.29a1.003 1.003 0 01-1.42 1.42l-5-5a.999.999 0 010-1.42l5-5a1.003 1.003 0 011.42 1.42L6.41 9H17c.55 0 1 .45 1 1z"
                    clipRule="evenodd" />
                </svg>
                Trả lời
              </button>
            </div>
          </div>
        </div>
      </div>
      <p v-if="false" className="text-gray-500">Chưa có đánh giá nào.</p>
    </div>
    <!-- {/* end-bình luận */} -->

    <!-- {/* comment 1 */} -->
    <div v-if="false" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full p-6 relative">
        <button onClick={build} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Đánh giá & nhận xét</h2>
        <!-- {/* Lựa chọn đánh giá */} -->
        <div className="flex justify-between mb-4">
          <div key={star} className="text-center cursor-pointer">
            <!-- <span className={`text-3xl ${selectedStar >= star ? 'text-yellow-500' : 'text-gray-300'}`}>★</span> -->
            <p className="text-sm mt-1">{star === 5 ? "Tuyệt vời" : star === 1 ? "Rất tệ" : ""}</p>
          </div>
        </div>
        <textarea className="w-full p-3 border border-gray-300 rounded-lg resize-none"
          placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 kí tự)" rows="4" />
        <button className="w-full mt-6 bg-red-500 text-white text-lg font-bold py-3 rounded-md hover:bg-red-600">
          Gửi Đánh Giá
        </button>
      </div>
    </div>
    <!-- {/* end-comment 1 */} -->

    <!-- {/* comment 2 */} -->
    <div v-if="false" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full p-6 relative">
        <button onClick={build} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Bình luận và Hỏi đáp</h2>
        <textarea className="w-full p-3 border border-gray-300 rounded-lg resize-none"
          placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 kí tự)" rows="4" />
        <button className="w-full mt-6 bg-red-500 text-white text-lg font-bold py-3 rounded-md hover:bg-red-600">
          Gửi Bình luận
        </button>
      </div>
    </div>
    <!-- {/* end-comment 2 */} -->

    <!-- {/* Form thông báo khi thêm sản phẩm vào giỏ hàng thành công */} -->
    <div v-if="isShowMessager" className="fixed inset-0 flex items-center justify-center z-50 border border-black">
      <div className="bg-white p-6 shadow-2xl rounded-lg z-50 flex flex-col items-center justify-center text-center">
        <i class="fa-solid fa-cart-plus text-green-500 text-5xl mb-2" ></i>
        <p className="text-lg font-bold mt-2">Đã thêm vào Giỏ hàng</p>
      </div>
    </div>
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import apiClient from '@/api/instance';
import Contact from '@/components/Contact.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { ref, onMounted, watch,computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store=useStore()
const route = useRoute();
const router = useRouter();
const id = computed(()=>route.params.id);

const products = ref([]);
const product = ref(null);

const fetchData = async () => {
  try {
    const response = await apiClient.get('products');
    products.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

watch(id, () => { // watch để theo dõi sự thay đổi của products và cập nhật product
  fetchData()
});

watch(products, (newProducts) => { // watch để theo dõi sự thay đổi của products và cập nhật product
  if (newProducts.length > 0) {
    product.value = newProducts.find(item => item.id == id.value);
  }
});

onMounted(() => {
  window.scrollTo(0, 0);
  fetchData()
});

// format tiền
const formatVND = (price) => {
  if (price) {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }
};

const nextCard = async(id) => {
  await router.push(`/card/${id}`)
  // window.location.reload();
}

// hàm sản phẩm liên quan
const someCat = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isShowMessager=ref(false)
const handleAddToCart = async () => {
  isShowMessager.value = true;
  setTimeout(() => {
    isShowMessager.value = false;
  }, 1000);

  // Lấy về user đang đăng nhập từ localStorage
  const userLocal = JSON.parse(localStorage.getItem("userLogin"));
  if (!userLocal) {
    console.log('Chưa đăng nhập');
    return;
  }

  // Gọi API để lấy danh sách users
  try {
    const response = await apiClient.get('users');
    const users = response.data;

    // Tìm vị trí của user đang đăng nhập
    const indexUser = users.findIndex(item => item.id === userLocal.id);

    if (indexUser === -1) {
      console.log('Không tìm thấy người dùng');
      return;
    }

    console.log('Vị trí của user:', indexUser);

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng của user chưa
    const user = users[indexUser];
    const productInCart = user.cart.findIndex(item => item.id === product.value.id);
    
    if (productInCart!=-1) {
      // Nếu sản phẩm đã có, tăng số lượng
      user.cart[productInCart].quantity += 1;
    } else {
      // Nếu sản phẩm chưa có, thêm mới
      user.cart.push({ ...product.value, quantity: 1 });
    }
    console.log(8888888,user);
    store.dispatch('apiEditCustomer', user);
    fetchData()
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
  }
};

</script>

<style></style>