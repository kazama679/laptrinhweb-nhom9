<template>
  <div>
    <Header></Header>
    <!-- hiển thị sản phẩm bán chạy  -->
    <div class="bg-gray-100 py-20">
      <div class="container mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold">Sản phẩm bán chạy</h2>
          <p class="text-gray-500">Khám phá các lựa chọn hàng đầu hiện tại</p>
        </div>
        <div class="container mx-auto py-10">
          <!-- Sử dụng flexbox để bố trí các sản phẩm theo chiều ngang -->
          <div class="flex justify-center space-x-5 w-full">
            <!-- Vòng lặp qua sản phẩm -->
            <div v-for="product in products.sort((a, b) => b.sales - a.sales).slice(0, 3)" :key="product.id"
              class="w-1/4 cursor-pointer bg-white group border border-gray-300">
              <div @click="nextCard(product.id)" class="relative">
                <img :src="product.image" class="w-56 h-56 object-cover mx-auto mt-6" />
                <div class="absolute inset-0 flex flex-col justify-start p-5 bg-white bg-opacity-10">
                  <h3 class="text-2xl font-bold">
                    {{ product.name.split(' ').slice(1, 2).join(' ') }}
                    <br />
                    {{ product.name.split(' ').slice(2, 3).join(' ') }}
                  </h3>
                  <p class="text-gray-600">{{ product.category }}</p>
                </div>
                <!-- Hiệu ứng đường kẻ khi hover -->
                <div class="absolute inset-0 flex justify-center items-center">
                  <div
                    class="absolute top-[-24px] left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-500">
                  </div>
                  <div
                    class="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-500">
                  </div>
                  <div
                    class="absolute top-[-24px] left-0 h-0 w-[2px] bg-black group-hover:h-[248px] transition-all duration-500">
                  </div>
                  <div
                    class="absolute top-[-24px] right-0 h-0 w-[2px] bg-black group-hover:h-[248px] transition-all duration-500">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end-hiển thị sản phẩm bán chạy  -->

    <!-- hiển thị theo danh mục -->
    <div v-for="category in category" :key="category.id" class="py-10 mt-10 cursor-pointer">
      <div class="text-center">
        <h2 class="text-2xl font-semibold mb-2">{{ category.name }}</h2>
        <p class="text-gray-500 mb-6">{{ category.description }}</p>
      </div>
      <!-- Hiển thị sản phẩm có danh mục -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div v-for="item in products.filter(item => item.category == category.name).slice(0, 4)" :key="item.id" @click="nextCard(item.id)"
          class="bg-white rounded-lg shadow-md p-4 relative hover:border-black transition-all duration-300 hover:shadow-2xl">
          <div>
            <i v-if="true" class="fa-regular fa-heart hover:text-red-600"></i>
            <i v-if="false" class="fa-solid fa-heart text-red-600 hover:text-black"></i>
          </div>
          <div class="bg-red-500 text-white text-sm px-2 py-1 rounded-full absolute top-2 right-2">
            New
          </div>
          <img :src="item.image" class="w-full h-56 object-cover rounded" />
          <h3 class="mt-4 text-gray-800 text-lg font-semibold truncate">
            {{ item.name }}
          </h3>
          <p class="text-orange-500 font-semibold mt-2">
            {{ formatVND(item.price) }}
          </p>
        </div>
      </div>
      <!-- end-hiển thị sản phẩm có danh mục -->
    </div>
    <!-- end-hiển thị theo danh mục -->

    <!-- hiển thị tìm kiếm  -->
    <div className="w-full flex justify-center mt-32 mb-[-50px]">
      <div className="w-[70%] bg-gray-900 p-12 rounded text-white shadow-lg">
        <div className="flex items-center mb-4">
          <FaSearch className="mr-2 text-2xl" />
          <input className="w-64 rounded h-8 text-black p-2" type="text" value={searchTerm}
            placeholder="Tìm kiếm sản phẩm..." />
        </div>
        <div className="flex gap-4 items-center">
          <select value={year} className="w-1/3 p-3 bg-gray-200 text-black rounded">
            <option value="">Lọc theo năm</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>

          <select value={category} className="w-1/3 p-3 bg-gray-200 text-black rounded">
            <option value="">Lọc theo danh mục</option>
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          </select>

          <select value={priceRange} className="w-1/3 p-3 bg-gray-200 text-black rounded">
            <option value="">Lọc theo giá</option>
            <option value="15">Dưới 15 tr</option>
            <option value="1530">15-30tr</option>
            <option value="30">Trên 30tr</option>
          </select>

          <select value={sortOrder} className="w-1/3 p-3 bg-gray-200 text-black rounded">
            <option value="">Sắp xếp theo giá</option>
            <option value="up">Tăng dần</option>
            <option value="down">Giảm dần</option>
          </select>

          <button onClick={handleReset}
            className="flex items-center gap-2 p-3 bg-purple-600 text-white rounded hover:bg-purple-700">
            <FaRedo className="text-xl" /> RESET
          </button>
        </div>
      </div>
    </div>
    <!-- end-hiển thị tìm kiếm -->

    <div className="text-center mt-40" v-if="false">
      <h1 className="text-4xl font-bold">Không tìm thấy sản phẩm</h1>
      <p className="text-gray-500">Vui lòng tìm kiếm sản phẩm khác!</p>
    </div>
    <div className="text-center mt-40">
      <h1 className="text-4xl font-bold">
        RECENT <span className="text-yellow-500">Laptop</span>
      </h1>
      <p className="text-gray-500">
        Curabitur tellus leo, euismod sit amet gravida at, egestas sed
        commodo.
      </p>
    </div>

    <!-- Hiển thị tất cả danh sách sản phẩm -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-10">
      <div v-for="(item, index) in products" :key="index" class="p-4">
        <div 
          class="bg-gray-800 text-white shadow-lg border-2 border-gray hover:border-black transition-all duration-300 hover:shadow-2xl">
          <img :src="item.image" alt="Product Image" class="w-full h-[340px]" />
          <div class="p-4">
            <h2 class="text-lg truncate">{{ item.name }}</h2>
            <div class="flex justify-between mt-2 mb-4 border-b pb-2">
              <button @click="nextCard(item.id)" class="bg-blue-500 text-white py-1 px-3">
                Xem sản phẩm
              </button>
              <div class="text-blue-400 text-lg">{{ formatVND(item.price) }}</div>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>
                <GiCheckMark class="ml-8" /> Chính hãng
              </span>
              <span class="cursor-pointer hover:text-white">
                <FaHeart class="ml-5 text-red-600" />Yêu thích
                <CiHeart class="ml-5 text-xl mt-[-5px]" />Yêu thích
              </span>
              <span>
                <FaPlugCircleCheck class="ml-8" /> Sạc nhanh!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- end-hiển thị tất cả danh sách sản phẩm  -->

    <!-- Phân trang -->
    <div className="flex justify-center space-x-2 mt-4">
      <button key={index} class="px-3 py-1 border rounded bg-blue-500 text-white">
        {index + 1}
      </button>
    </div>
    <!-- end-Phân trang  -->

    <!-- hiển thị form yêu thích -->
    <div v-if="false" className="fixed inset-0 flex items-center justify-center z-50 border border-black">
      <div className="bg-white p-6 shadow-2xl rounded-lg z-50 flex flex-col items-center justify-center text-center">
        <FaHeartCircleCheck className="text-red-500 text-4xl mb-2" />
        <p className="text-lg font-bold text-red-500">Sản phẩm đã được thêm vào yêu thích</p>
      </div>
    </div>
    <div v-if="false" className="fixed inset-0 flex items-center justify-center z-50 border border-black">
      <div className="bg-white p-6 shadow-2xl rounded-lg z-50 flex flex-col items-center justify-center text-center">
        <FaHeartCircleXmark className="text-black text-4xl mb-2" />
        <p className="text-lg font-bold">Đã bỏ yêu thích sản phẩm</p>
      </div>
    </div>
    <!-- end-hiển thị form yêu thích -->

    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import apiClient from '@/api/instance';
import Contact from '@/components/Contact.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter()
const products = ref([])
const category = ref([])

const fetchData = async () => {
  try {
    const respones = await apiClient('products')
    const categoryRp = await apiClient('classify')
    products.value = respones.data
    category.value = categoryRp.data
  } catch (err) {
    console.log(err);
  }
}
// format tiền
const formatVND = (price) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
onMounted(() => {
  fetchData()
})

const nextCard = (id) => {
  router.push(`/card/${id}`)
}

</script>

<style></style>