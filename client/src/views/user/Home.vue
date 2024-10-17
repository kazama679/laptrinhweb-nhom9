<template>
  <div>
    <Header></Header>
    <!-- hiển thị sản phẩm bán chạy  -->
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Sản phẩm bán chạy</h2>
          <p className="text-gray-500">Khám phá các lựa chọn hàng đầu hiện tại</p>
        </div>
        <div className="container mx-auto py-10">
          <div className="flex justify-center space-x-5 w-full h-[250px]">
            {topSellingProducts.map((product: Product) => (
            <div className="relative w-1/4 cursor-pointer bg-white group border border-gray-300">
              <img src='' alt={product.name} className="w-56 h-56 object-cover ml-36 mt-6" />
              <div className="absolute inset-0 flex flex-col justify-start p-5 bg-white bg-opacity-10">
                <h3 className="text-2xl font-bold">
                  {product.name.split(' ').slice(1, 2).join(' ')}
                  <br />
                  {product.name.split(' ').slice(2, 3).join(' ')}
                </h3>
                <p className="text-gray-600">{product.category}</p>
              </div>
              {/* Hiệu ứng đường kẻ khi hover */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div
                  className="absolute top-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-500">
                </div>
                <div
                  className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-500">
                </div>
                <div
                  className="absolute top-0 left-0 h-0 w-[2px] bg-black group-hover:h-full transition-all duration-500">
                </div>
                <div
                  className="absolute top-0 right-0 h-0 w-[2px] bg-black group-hover:h-full transition-all duration-500">
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <!-- end-hiển thị sản phẩm bán chạy  -->

    <!-- hiển thị theo danh mục -->
    <div key={category.id} className="py-10 mt-10 cursor-pointer">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
        <p className="text-gray-500 mb-6">{category.description}</p>
      </div>
      <!-- hiển thị sản phẩm có danh mục  -->
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <!-- Hiển thị tối đa 4 sản phẩm  -->
        <div key={product.id}
          className="bg-white rounded-lg shadow-md p-4 relative hover:border-black transition-all duration-300 hover:shadow-2xl">
          <!-- stopPropagation giúp ngăn chặn nhận onclick từ phần tử con sang cha  -->
          <div>
            <FaHeart className="hover:text-red-600 text-xl text-red-600" />
            <CiHeart className="hover:text-red-600 text-xl" />
          </div>
          <div className="bg-red-500 text-white text-sm px-2 py-1 rounded-full absolute top-2 right-2">
            New
          </div>
          <img src='' alt={product.name} className="w-full h-56 object-cover rounded" />
          <h3 className="mt-4 text-gray-800 text-lg font-semibold truncate">
            {product.name}
          </h3>
          <p className="text-orange-500 font-semibold mt-2">
            {product.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            })}
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

    <div className="text-center mt-40">
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
    <div v-for="(item, index) in products" :key="index"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mt-10 p-60 py-0">
      <div
        className="bg-gray-800 text-white shadow-lg border-2 border-gray hover:border-black transition-all duration-300 hover:shadow-2xl">
        <img :src="item.imageUrl" alt="Product Image" class="w-full h-[340px]" />
        <div className="p-4">
          <h2 className="text-lg truncate">{{ item.name }}</h2>
          <div className="flex justify-between mt-2 mb-4 border-b pb-2">
            <button className="bg-blue-500 text-white py-1 px-3">
              Xem sản phẩm
            </button>
            <div className="text-blue-400 text-lg">{{ formatVND(item.price) }}</div>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>
              <GiCheckMark className="ml-8" /> Chính hãng
            </span>
            <span className="cursor-pointer hover:text-white">
              <FaHeart className="ml-5 text-red-600" />Yêu thích
              <CiHeart className="ml-5 text-xl mt-[-5px]" />Yêu thích
            </span>
            <span>
              <FaPlugCircleCheck className="ml-8" /> Sạc nhanh!
            </span>
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
import Contact from '@/components/Contact.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue'
import axios from 'axios';
import { onMounted, ref } from 'vue';

const products = ref([])

const fetchData = async () => {
  try {
    const respones = await axios.get("http://localhost:8080/products")
    products.value = respones.data
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  fetchData()
})

console.log(11111, products);

</script>

<style></style>