<template>
  <div>
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-8 rounded-lg w-full max-w-3xl">
        <button @click="closeForm" class="text-blue-500 mb-4">Back</button>
        <h2 class="text-2xl font-bold mb-4">
          {{ props.act == "add" ? "Thêm sản phẩm" : "Sửa sản phẩm" }}
        </h2>
        <form @submit.prevent="addProduct" class="grid grid-cols-2 gap-4">
          <div class="col-span-1">
            <label htmlFor="name" class="block text-sm font-medium"
              >Tên sản phẩm</label
            >
            <input
              :ref="firstInput"
              v-model="newProduct.name"
              type="text"
              class="mt-1 p-2 border rounded w-full"
            />
            <div v-if="err.sameName" className="text-red-500 text-xs mt-1">
              Tên sản phẩm không được trùng
            </div>
            <div v-if="err.noName" className="text-red-500 text-xs mt-1">
              Tên sản phẩm không được để trống
            </div>
          </div>
          <div class="col-span-1">
            <label htmlFor="stock" class="block text-sm font-medium"
              >Số lượng</label
            >
            <input
              v-model="newProduct.stock"
              type="number"
              class="mt-1 p-2 border rounded w-full"
            />
            <div v-if="err.noStock" className="text-red-500 text-xs mt-1">
              Số lượng không được nhỏ hơn 1
            </div>
          </div>
          <div class="col-span-1">
            <label htmlFor="price" class="block text-sm font-medium">Giá</label>
            <input
              v-model="newProduct.price"
              type="number"
              class="mt-1 p-2 border rounded w-full"
            />
            <div v-if="err.noPrice" className="text-red-500 text-xs mt-1">
              Giá không được nhỏ hơn 1
            </div>
          </div>
          <div class="col-span-1">
            <label htmlFor="image" class="block text-sm font-medium"
              >URL Ảnh</label
            >
            <input
              @change="handleUpFile"
              class="mt-1 p-2 border rounded w-full"
              type="file"
            />
            <div
              v-if="newProduct.image !== ''"
              class="flex justify-center text-center"
            >
              <img :src="newProduct.image" class="w-16 h-16 mt-4" />
            </div>
            <div v-if="err.noImage" className="text-red-500 text-xs mt-1">
              Hình ảnh chưa được chọn
            </div>
          </div>
          <div class="col-span-1">
            <label htmlFor="category" class="block text-sm font-medium"
              >Phân loại</label
            >
            <select
              class="mt-1 p-2 border rounded w-full"
              v-model="newProduct.category"
            >
              <option value="">Phân loại sản phẩm</option>
              <option
                v-for="item in category"
                :key="item.id"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
            <div v-if="err.noCategory" className="text-red-500 text-xs mt-1">
              Bắt buộc phải chọn danh mục cho sản phẩm
            </div>
          </div>
          <div class="col-span-1">
            <label htmlFor="status" class="block text-sm font-medium"
              >Trạng thái</label
            >
            <select
              :value="true"
              v-model="newProduct.status"
              class="mt-1 p-2 border rounded w-full"
            >
              <option :value="true">Đang bán</option>
              <option :value="false">Ngừng bán</option>
            </select>
          </div>
          <div class="col-span-2">
            <label htmlFor="description" class="block text-sm font-medium"
              >Chi tiết sản phẩm</label
            >
            <textarea
              v-model="newProduct.description"
              class="mt-1 p-2 border rounded w-full"
              rows="{3}"
              placeholder="Mô tả chi tiết sản phẩm"
            />
          </div>
          <div class="col-span-2">
            <button
              type="submit"
              class="w-full bg-purple-500 text-white py-2 rounded mt-4"
            >
              {{ props.act == "add" ? "Thêm sản phẩm" : "Sửa sản phẩm" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiClient from "@/api/instance";
import { nextTick, onMounted, reactive, ref } from "vue";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase";
import { useStore } from "vuex";
const store = useStore();
const err = reactive({
  noName: false,
  sameName: false,
  noPrice: false,
  noStock: false,
  noCategory: false,
  noImage: false,
});

const emit = defineEmits(["onClose"]);
const props = defineProps(["act", "item"]);
console.log(22222222, props.act);

const closeForm = () => {
  emit("onClose");
};

const imageUrl = ref("");
const file = ref(null);

const handleUpFile = (e) => {
  imageUrl.value = URL.createObjectURL(e.target.files[0]);
  file.value = e.target.files[0];
};

// lấy ngày hiện tại
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

const newProduct = reactive({
  id: Math.ceil(Math.random() * 9999999),
  name: "",
  price: 0,
  stock: 0,
  category: "",
  status: true,
  image: "",
  description: "",
  created_at: getCurrentDate(),
  comments: [],
  sales: 0,
});

if (props.act == "edit") {
  newProduct.id = props.item.id;
  newProduct.name = props.item.name;
  newProduct.price = props.item.price;
  newProduct.stock = props.item.stock;
  newProduct.category = props.item.category;
  newProduct.status = props.item.status;
  newProduct.image = props.item.image;
  newProduct.description = props.item.description;
  newProduct.created_at = props.item.created_at;
  newProduct.comments = props.item.comments;
  newProduct.sales = props.item.sales;
}

const firstInput = ref(null);
const category = ref([]);
const products = ref([]);
const fetchData = async () => {
  const response = await apiClient("classify");
  const rpProducts = await apiClient("products");
  category.value = response.data;
  products.value = rpProducts.data;
};

onMounted(async () => {
  await fetchData();
  await nextTick(); // để trì hoãn việc thực thi một hành động cho đến khi DOM được cập nhật hoàn toàn
  if (firstInput.value) {
    firstInput.value.focus();
  }
});

const addProduct = async () => {
  // Reset tất cả lỗi trước khi kiểm tra lại
  err.noName = false;
  err.sameName = false;
  err.noStock = false;
  err.noPrice = false;
  err.noCategory = false;
  err.noImage = false;

  // Kiểm tra nếu tên sản phẩm bị trống
  if (newProduct.name === "") {
    err.noName = true;
  }

  // Kiểm tra nếu tên sản phẩm bị trùng (bỏ qua khi đang chỉnh sửa sản phẩm hiện tại)
  if(props.act === "add"){
    if(products.value.some((item) => item.name === newProduct.name)){
      err.sameName = true;
    }
  }else{
    if(products.value.some((item) => item.name === newProduct.name && item.id !== newProduct.id)){
      err.sameName = true;
    }
  }

  // Kiểm tra số lượng sản phẩm
  if (newProduct.stock < 1) {
    err.noStock = true;
  }

  // Kiểm tra giá sản phẩm
  if (newProduct.price < 1) {
    err.noPrice = true;
  }

  // Kiểm tra danh mục sản phẩm
  if (!newProduct.category) {
    err.noCategory = true;
  }

  // Kiểm tra hình ảnh (chỉ khi thêm mới, không kiểm tra nếu đã có hình ảnh khi sửa)
  if (props.act === "add" && !file.value) {
    err.noImage = true;
  }

  // Nếu có bất kỳ lỗi nào, không tiến hành thêm/sửa sản phẩm
  if (
    err.noName ||
    err.sameName ||
    err.noStock ||
    err.noPrice ||
    err.noCategory ||
    err.noImage
  ) {
    return;
  }
  try {
    if (props.act === "add") {
      const storageReference = storageRef(storage, `images/${file.value.name}`);
      await uploadBytes(storageReference, file.value);
      const urlDownload = await getDownloadURL(storageReference);
      newProduct.image = urlDownload;
      store.dispatch("apiAddProduct", newProduct);
    } else if (props.act === "edit") {
      if (file.value) {
        const storageReference = storageRef(storage, `images/${file.value.name}`);
        await uploadBytes(storageReference, file.value);
        const urlDownload = await getDownloadURL(storageReference);
        newProduct.image = urlDownload;
      }
      store.dispatch("apiEditProduct", newProduct);
    }
    emit("onClose");
  } catch (error) {
    console.log(error);
  }
};

</script>

<style></style>