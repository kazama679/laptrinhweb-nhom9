<template>
  <div class="flex">
    <main class="flex-1 p-5 bg-gray-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between mb-4">
          <button
            @click="showForm('', 'add')"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Category
          </button>
          <div class="flex gap-2">
            <!-- tìm kiếm theo tên -->
            <input
              v-model="NameSearch"
              type="text"
              class="border-black border px-4 py-2 rounded"
              placeholder="Lọc theo tên"
            />

            <!-- Lọc theo trạng thái -->
            <select class="border px-4 py-2 rounded" v-model="filterStatus">
              <option value="">Lọc theo trạng thái</option>
              <option :value="true">Mở</option>
              <option :value="false">Đóng</option>
            </select>

            <!-- Sắp xếp theo tên -->
            <select class="border px-4 py-2 rounded" v-model="sortOrder">
              <option value="">Sắp xếp theo tên</option>
              <option value="az">Sắp xếp từ A đến Z</option>
              <option value="za">Sắp xếp từ Z đến A</option>
            </select>
          </div>
        </div>
        <table class="table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 border text-center">STT</th>
              <th class="px-4 py-2 border text-center">Name</th>
              <th class="px-4 py-2 border text-center">Trạng thái</th>
              <th class="px-4 py-2 border text-center">Mô tả</th>
              <th class="px-4 py-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in categoryPage.reverse()"
              :key="item.id"
              class="text-center"
            >
              <td class="px-4 py-2 border">
                {{ (currentPage - 1) * itemPage + index + 1 }}
              </td>
              <td class="px-4 py-2 border truncate max-w-xs">
                <p class="truncate overflow-hidden whitespace-nowrap">
                  {{ item.name }}
                </p>
              </td>
              <td class="px-4 py-2 border">
                {{ item.status ? "Mở" : "Đóng" }}
              </td>
              <td class="px-4 py-2 border">{{ item.description }}</td>
              <td class="px-4 py-2 border">
                <div class="flex justify-center gap-2">
                  <button
                    @click="showForm(item, 'edit')"
                    class="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteProduct(item.id)"
                    class="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Phân trang -->
        <div v-if="true" class="flex justify-center space-x-2 mt-4">
          <!-- Nút Previous -->
          <button
            class="px-4 py-2 border rounded hover:bg-gray-100"
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            Previous
          </button>

          <!-- Các số trang -->
          <button
            v-for="page in totalPages"
            :key="page"
            @click="selectPage(page)"
            :class="[page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-100']"
          >
            {{ page }}
          </button>

          <!-- Nút Next -->
          <button
            class="px-4 py-2 border rounded hover:bg-gray-100"
            @click="nextPage"
            :disabled="currentPage === totalPages"
            :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
          >
            Next
          </button>
        </div>
      </div>
    </main>
    <Form
      v-if="isShow"
      @onClose="closeForm"
      @update="fetchData()"
      :new="newCategory"
      :act="action"
    ></Form>
    <Delete
      v-if="showDelete"
      @update="fetchData()"
      @deleteConfirm="deleteConfirm()"
      @close="closeShow"
    ></Delete>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import Form from "@/components/FormCategory.vue";
import Delete from "@/components/Delete.vue";
import { useStore } from "vuex";
import apiClient from "@/api/instance";

const NameSearch = ref("");
const showDelete = ref(false);
const category = ref([]);
const store = useStore();
const newCategory = reactive({
  id: Math.ceil(Math.random() * 9999999),
  name: "",
  description: "",
  status: true,
});

const action = ref();
const isShow = ref(false);
const currentPage = ref(1); // Trang hiện tại
const itemPage = 5; // Số danh mục mỗi trang

// Lọc và sắp xếp danh mục
const filterStatus = ref("");
const sortOrder = ref("");

// Tính toán số trang
const totalPages = computed(() => {
  return Math.ceil(category.value.length / itemPage);
});

// Lấy danh mục hiển thị cho trang hiện tại
const categoryPage = computed(() => {
  let filterCategory = category.value;

  // Trích xuất các mục theo trang hiện tại
  const start = (currentPage.value - 1) * itemPage;
  const end = start + itemPage;
  return filterCategory.slice(start, end);
});

// Hàm lấy dữ liệu danh mục với tìm kiếm, lọc, sắp xếp, và phân trang
const fetchData = async () => {
  try {
    // Construct the query parameters for filtering, searching, sorting, and pagination
    const params = {
      _page: currentPage.value,  // Current page
      _limit: itemPage,          // Number of items per page
    };

    // Add name search query if it exists
    if (NameSearch.value.trim() !== "") {
      params.name_like = NameSearch.value;  // Search by name
    }

    // Add status filter if selected
    if (filterStatus.value !== "") {
      params.status = filterStatus.value === "true";  // Filter by status
    }

    // Add sorting order if selected
    if (sortOrder.value === "az") {
      params._sort = "name";
      params._order = "asc";  // Sort by name A-Z
    } else if (sortOrder.value === "za") {
      params._sort = "name";
      params._order = "desc";  // Sort by name Z-A
    }

    // Make the API request with the constructed parameters
    const response = await apiClient.get("classify", { params });
    category.value = response.data;  // Assign the data to category list
  } catch (error) {
    console.error(error);
  }
};

// Khởi tạo dữ liệu khi component được mount
onMounted(() => {
  fetchData();
});

// Hàm chọn trang
const selectPage = (page) => {
  currentPage.value = page;
  fetchData();
};

// Hàm chuyển đến trang trước
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchData();
  }
};

// Hàm chuyển đến trang tiếp theo
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchData();
  }
};

const showForm = (item, act) => {
  isShow.value = true;
  action.value = act;
  if (act === "edit") {
    newCategory.name = item.name;
    newCategory.id = item.id;
    newCategory.description = item.description;
    newCategory.status = item.status;
  } else {
    newCategory.name = "";
    newCategory.id = Math.ceil(Math.random() * 9999999);
    newCategory.description = "";
    newCategory.status = true;
  }
};

const closeForm = () => {
  isShow.value = false;
  fetchData();
};

const idDelete = ref(null);

const deleteProduct = (id) => {
  idDelete.value = id;
  showDelete.value = true;
};

const deleteConfirm = () => {
  store.dispatch("apiDeleteCategory", idDelete.value);
  showDelete.value = false;
  fetchData();
};

const closeShow = () => {
  showDelete.value = false;
  fetchData();
};
</script>

<style></style>