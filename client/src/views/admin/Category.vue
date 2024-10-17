<template>
  <div class="flex">
    <main class="flex-1 p-5 bg-gray-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between mb-4">
          <button @click="showForm('','add')" class="bg-blue-500 text-white px-4 py-2 rounded">
            + Add Category
          </button>
          <div class="flex gap-2">
            <!-- Lọc theo trạng thái -->
            <select class="border px-4 py-2 rounded" value={filterStatus}>
              <option value="">Lọc theo trạng thái</option>
              <option value="true">Mở</option>
              <option value="false">Đóng</option>
            </select>

            <!-- Sắp xếp theo tên -->
            <select class="border px-4 py-2 rounded" value={sortOrder}>
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
          <tbody v-for="(item, index) in category" :key="item.id">
            <tr key={product.id} class="text-center">
              <td class="px-4 py-2 border">{{ index + 1 }}</td>
              <td class="px-4 py-2 border truncate max-w-xs">
                <p class="truncate overflow-hidden whitespace-nowrap">{{ item.name }}</p>
              </td>
              <td class="px-4 py-2 border">{{ item.status ? "Mở" : "Đóng" }}</td>
              <td class="px-4 py-2 border">{{ item.description }}</td>
              <td class="px-4 py-2 border">
                <div class="flex justify-center gap-2">
                  <button @click="showForm(item, 'edit')" class="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button @click="deleteProduct(item.id)" class="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center space-x-2 mt-4">
          <button key={page} class="px-3 py-1 border rounded currentPage bg-blue-500 text-white">

          </button>
        </div>
      </div>
    </main>
    <Form v-if="isShow" @onClose="closeForm" @update="fetchData()" :new="newCategory" :act="action"></Form>
    <Delete v-if="showDelete" @update="fetchData()" @deleteConfirm="deleteConfirm()" @close="closeShow"></Delete>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, onUpdated, reactive, ref } from "vue";
import Form from '@/components/FormCategory.vue'
import Delete from '@/components/Delete.vue'
import { useStore } from "vuex";
const showDelete=ref(false)
const category = ref([]);
const store = useStore()
const newCategory = reactive({
    id: Math.ceil(Math.random()*9999999),
    name:'',
    description:'',
    status:true
})
const action = ref()
const fetchData = async () => {
  try {
    const respones = await axios.get("http://localhost:8080/classify");
    category.value = respones.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchData();
});

onUpdated(() => {
  fetchData();
})

const isShow = ref(false)
const showForm = (item, act)=>{
  isShow.value=true
  action.value = act
  if(act === 'edit'){
    newCategory.name = item.name
    newCategory.id = item.id
    newCategory.description = item.description
    newCategory.status = item.status
  } else {
    newCategory.name = ""
    newCategory.id = Math.ceil(Math.random()*9999999);
    newCategory.description = ""
    newCategory.status = true
  }
}

const closeForm=()=>{
  isShow.value=false
}

const idDelete=ref(null)

const deleteProduct=(id)=>{
  idDelete.value=id
  showDelete.value=true
}

const deleteConfirm=()=>{
  store.dispatch('apiDeleteCategory', idDelete.value) 
  showDelete.value=false
}
const closeShow=()=>{
  showDelete.value=false
}
</script>

<style></style>