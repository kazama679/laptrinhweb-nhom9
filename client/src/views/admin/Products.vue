<template>
  <div class="flex">
    <main class="flex-1 p-5 bg-gray-50">
      <header class="flex justify-between items-center mb-6"></header>
      <div class="bg-white p-6 rounded-lg shadow-lg mt-[-20px]">
        <div class="flex justify-between mb-4">
          <button @click="showForm({},'add')" class="bg-blue-500 text-white px-4 py-2 rounded">
            + Add Product
          </button>
          <div class="flex gap-2">
            <!-- Lọc theo danh mục -->
            <select v-model="selectedCategory" class="border px-4 py-2 rounded">
              <option value="">Lọc theo danh mục</option>
              <option v-for="item in category" :key="item.id" :value="item.name">
                {{ item.name }}
              </option>
            </select>
            <!-- Sắp xếp theo giá -->
            <select v-model="sortOption" class="border px-4 py-2 rounded">
              <option value="">Lọc theo giá</option>
              <option value="price-asc">Giá: Từ thấp đến cao</option>
              <option value="price-desc">Giá: Từ cao đến thấp</option>
            </select>
            <!-- tìm kiếm theo tên -->
            <input v-model="NameSearch" type="text" class="border-black border px-4 py-2 rounded" placeholder="Tìm kiếm theo tên" />
          </div>
        </div>
        <table class="table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 border">STT</th>
              <th class="px-4 py-2 border">Ảnh</th>
              <th class="px-4 py-2 border">Tên</th>
              <th class="px-4 py-2 border">Trạng thái</th>
              <th class="px-4 py-2 border">Danh mục</th>
              <th class="px-4 py-2 border">Giá</th>
              <th class="px-4 py-2 border">Ngày tạo</th>
              <th class="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody v-for="(product, index) in paginatedProducts" :key="product.id">
            <tr class="text-center">
              <td class="px-4 py-2 border">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
              <td class="px-4 py-2 border">
                <div class="flex justify-center">
                  <img :src='product.image' alt={product.name} class="w-10 h-10" />
                </div>
              </td>
              <td class="px-4 py-2 border truncate max-w-xs">
                <p class="truncate overflow-hidden whitespace-nowrap">{{ product.name }}</p>
              </td>
              <td class="px-4 py-2 border">{{ product.status ? "Đang bán" : "Ngừng bán" }}</td>
              <td class="px-4 py-2 border">{{ product.category }}</td>
              <td class="px-4 py-2 border">{{ formatVND(product.price) }}</td>
              <td class="px-4 py-2 border">{{ product.created_at }}</td>
              <td class="px-4 py-2 border">
                <div class="flex justify-center gap-2">
                  <button @click="showForm(product,'edit')" class="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button @click="deleteProduct(product.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Phân trang -->
        <div class="flex justify-center space-x-2 mt-4">
          <button @click="prevPage" :disabled="currentPage === 1" :class="['py-1 border rounded', { 'bg-gray-400 cursor-not-allowed opacity-50': currentPage === 1, 'bg-blue-500 text-white': currentPage > 1 }]">
            <i class="px-[9px] fa-solid fa-arrow-left"></i>
          </button>
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="['px-3 py-1 border rounded', { 'bg-blue-500 text-white': currentPage === page }]">
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages" :class="['py-1 border rounded', { 'bg-gray-400 cursor-not-allowed opacity-50': currentPage === totalPages, 'bg-blue-500 text-white': currentPage < totalPages }]">
            <i class="px-[9px] fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <ProductForm product={editingProduct} categories={categories} onSubmit={handleSubmitForm} />
    </main>
    <Form v-if="isShow" @onClose="handleClose" :item="itemProduct" :act="action"></Form>
    <Delete v-if="isShowDelete" @close="handleCloseDelete" @deleteConfirm="handleDelete"></Delete>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import apiClient from "@/api/instance";
import Form from '@/components/Form.vue';
import Delete from '@/components/Delete.vue';
import { useStore } from "vuex";

const store = useStore();
const products = ref([]);
const category = ref([]);
const NameSearch = ref("");
const sortOption = ref("");
const selectedCategory = ref("");

// Phân trang
const currentPage = ref(1);
const pageSize = ref(5); // Số lượng sản phẩm trên mỗi trang

const fetchData = async () => {
  try {
    const respones = await apiClient.get('products');
    const respones2 = await apiClient.get('classify');
    products.value = respones.data;
    category.value = respones2.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchData();
});

// format tiền
const formatVND = (price) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

// Tìm kiếm, sắp xếp, và lọc sản phẩm
const filteredAndSortedProducts = computed(() => {
  let filteredProducts = products.value;

  // Tìm kiếm theo tên
  if (NameSearch.value) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(NameSearch.value.toLowerCase())
    );
  }

  // Lọc theo danh mục
  if (selectedCategory.value) {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory.value);
  }

  // Sắp xếp theo giá
  if (sortOption.value === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption.value === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return filteredProducts;
});

// Tính tổng số trang
const totalPages = computed(() => {
  return Math.ceil(filteredAndSortedProducts.value.length / pageSize.value);
});

// Lấy dữ liệu sản phẩm cho trang hiện tại
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredAndSortedProducts.value.slice(start, end);
});

// Chuyển sang trang tiếp theo
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

// Quay lại trang trước
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

const isShow = ref(false);
const isShowDelete = ref(false);
const action = ref('');
const itemProduct = ref({});

const showForm = (item, act) => {
  itemProduct.value = item;
  action.value = act;
  isShow.value = true;
};

const handleClose = () => {
  isShow.value = false;
  fetchData();
  fetchData();
};

// Lưu giá trị id xóa sản phẩm
const idDelete = ref(null);
const deleteProduct = (id) => {
  idDelete.value = id;
  isShowDelete.value = true;
};

const handleCloseDelete = () => {
  isShowDelete.value = false;
  fetchData();
};

// Xóa sản phẩm
const handleDelete = async () => {
  await store.dispatch("apiDeleteProduct", idDelete.value);
  isShowDelete.value = false;
  fetchData(); 
};

</script>

<style></style>