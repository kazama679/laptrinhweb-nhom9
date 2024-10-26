<template>
  <div>
    <div class="flex">
      <main class="flex-1 p-5 bg-gray-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="p-4 bg-white rounded-lg shadow">
              <h3 class="text-sm text-gray-500">Số sản phẩm đã bán</h3>
              <p class="mt-14 flex justify-center text-lg font-bold">{{ totalSoldProducts }}</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow">
              <h3 class="text-sm text-gray-500">Doanh thu</h3>
              <p class="mt-14 flex justify-center text-lg font-bold">{{ formatVND(totalRevenue) }}</p>
            </div>
            <div class="p-4 bg-white rounded-lg shadow">
              <h3 class="text-sm text-gray-500">Sản phẩm bán chạy nhất</h3>
              <div class="text-lg font-bold flex justify-between text-center">
                <p class="mt-14" v-if="bestSellingProduct">{{ bestSellingProduct.sales }} lượt bán</p>
                <img v-if="bestSellingProduct" class="w-40" :src="bestSellingProduct.image" alt="">
              </div>
            </div>
            <div class="p-4 bg-white rounded-lg shadow">
              <h3 class="text-sm text-gray-500">Sản phẩm trong kho</h3>
              <p class="mt-14 flex justify-center text-lg font-bold">{{ totalStock }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/api/instance';

const products = ref([]);
const totalSoldProducts = ref(0);
const totalRevenue = ref(0);
const totalStock = ref(0);
const bestSellingProduct = ref(null);

// Hàm lấy dữ liệu sản phẩm từ API
const fetchData = async () => {
  try {
    const response = await apiClient.get('products');
    products.value = response.data;

    // Gọi các hàm tính toán sau khi lấy dữ liệu
    calculateTotalSoldProducts();
    calculateTotalRevenue();
    calculateTotalStock();
    calculateBestSellingProduct();
  } catch (error) {
    console.error(error);
  }
};

// Tính tổng số sản phẩm đã bán
const calculateTotalSoldProducts = () => {
  totalSoldProducts.value = 0;
  products.value.forEach(product => {
    totalSoldProducts.value += product.sales;
  });
};

// Tính tổng doanh thu
const calculateTotalRevenue = () => {
  totalRevenue.value = 0;
  products.value.forEach(product => {
    totalRevenue.value += product.sales * product.price;
  });
};

// Tính tổng số sản phẩm trong kho
const calculateTotalStock = () => {
  totalStock.value = 0;
  products.value.forEach(product => {
    if (product.stock > 0) {
      totalStock.value += product.stock;
    }
  });
};

// Tìm sản phẩm bán chạy nhất
const calculateBestSellingProduct = () => {
  if (products.value.length > 0) {
    bestSellingProduct.value = products.value.reduce((best, product) =>
      product.sales > best.sales ? product : best, products.value[0]);
  }
};

// format tiền
const formatVND = (price) => {
  if (price) {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style></style>