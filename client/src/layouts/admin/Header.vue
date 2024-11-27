<template>
  <header class="flex justify-between items-center bg-slate-100 w-full h-16 p-8">
    <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
    <div class="flex items-center space-x-6">
      <div class="relative flex items-center justify-end gap-2">
        <img :src="admin.avatar" class="w-10 h-10 rounded-full" alt="Admin Avatar" />
        <span class="ml-2 text-gray-700">{{ admin.name }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Lấy thông tin route hiện tại
const route = useRoute();

// Tạo tiêu đề dựa trên đường dẫn hiện tại
const pageTitle = computed(() => {
  switch (route.path) {
    case '/admin/dashboard':
      return 'Dashboard';
    case '/admin/products':
      return 'Products';
    case '/admin/orders':
      return 'Orders';
    case '/admin/customer':
      return 'Customer';
    case '/admin/category':
      return 'Category';
    case '/admin/discount':
      return 'Discount';
    default:
      return 'Page';
  }
});

const admin = JSON.parse(localStorage.getItem('userLogin') || '[]');
</script>