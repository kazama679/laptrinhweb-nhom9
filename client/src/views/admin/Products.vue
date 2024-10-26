<template>
  <div class="flex">
    <main class="flex-1 p-5 bg-gray-50">
      <header class="flex justify-between items-center mb-6">
      </header>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between mb-4">
          <button @click="showForm({},'add')" class="bg-blue-500 text-white px-4 py-2 rounded">
            + Add Product
          </button>
          <div class="flex gap-2">
            <select class="border px-4 py-2 rounded">
              <option value="price-asc">Lọc theo danh mục</option>
              <option v-for="item in category" :key="item.id">
                {{ item.name }}
              </option>
            </select>
            <select class="border px-4 py-2 rounded" value={sortOrder}>
              <option value="price-asc">Lọc theo giá</option>
              <option value="price-asc">Giá: Từ thấp đến cao</option>
              <option value="price-desc">Giá: Từ cao đến thấp</option>
            </select>
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
          <tbody v-for="(product, index) in products.reverse()" :key="product.id">
            <tr key={product.id} class="text-center">
              <td class="px-4 py-2 border">{{ index + 1 }}</td>
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
                  <button @click="showForm(product,'edit')" class="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button @click="deleteProduct(product.id)" class="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ProductForm product={editingProduct} categories={categories} onSubmit={handleSubmitForm} />
    </main>
    <Form v-if="isShow" @onClose="handleClose" :item="itemProduct" :act="action"></Form>
    <Delete v-if="isShowDelete" @close="handleCloseDelete" @deleteConfirm="handleDelete"></Delete>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Form from '@/components/Form.vue';
import apiClient from "@/api/instance";
import Delete from '@/components/Delete.vue'
import { useStore } from "vuex";
const store = useStore()
const products = ref([]);
const category = ref([]);

const fetchData = async () => {
  try {
    const respones = await apiClient.get('products');
    const respones2 = await  apiClient.get('classify');
    products.value = respones.data;
    category.value = respones2.data;
  } catch (error) {
    console.log(error);
  }
};
console.log(products);

onMounted(() => {
  fetchData();
});

// format tiền
const formatVND = (price) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const isShow = ref(false);
const isShowDelete = ref(false);
const action = ref('')
const itemProduct = ref({})
const showForm = (item, act) => {
  itemProduct.value=item
  action.value=act
  isShow.value = true;
};
const handleClose = () => {
  isShow.value = false;
  fetchData();
};

// lưu giá trị id xóa sản phẩm
const idDelete=ref(null)
const deleteProduct = (id) => {
  idDelete.value=id
  isShowDelete.value = true;
};
const handleCloseDelete = () => {
  isShowDelete.value = false;
  fetchData();
};
// xóa sản phẩm
const handleDelete=()=>{
  store.dispatch("apiDeleteProduct", idDelete.value)
  isShowDelete.value = false;
  fetchData();
}
</script>

<style></style>