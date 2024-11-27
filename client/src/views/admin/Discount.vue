<template>
  <div class="flex">
    <main class="flex-1 p-5 bg-gray-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex justify-between mb-4">
          <button @click="showForm({}, 'add')" class="bg-blue-500 text-white px-4 py-2 rounded">
            + Add Sale
          </button>
        </div>
        <table class="table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 border text-center">STT</th>
              <th class="px-4 py-2 border text-center">Name</th>
              <th class="px-4 py-2 border text-center">Discount (%)</th>
              <th class="px-4 py-2 border text-center">Status</th>
              <th class="px-4 py-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sales" :key="item.id" class="text-center">
              <td class="px-4 py-2 border">{{ index + 1 }}</td>
              <td class="px-4 py-2 border">{{ item.name }}</td>
              <td class="px-4 py-2 border">{{ item.down }}</td>
              <td class="px-4 py-2 border">{{ item.status ? 'Active' : 'Inactive' }}</td>
              <td class="px-4 py-2 border">
                <div class="flex justify-center gap-2">
                  <button @click="showForm(item, 'edit')" class="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button @click="deleteSale(item.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    <FormSale v-if="isShow" @onClose="closeForm" @update="fetchData" :new="newSale" :act="action"></FormSale>
    <Delete v-if="showDelete" @update="fetchData" @deleteConfirm="deleteConfirm" @close="closeShow"></Delete>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import FormSale from "@/components/FormDiscount.vue";
import Delete from "@/components/Delete.vue";
import { useStore } from "vuex";
import apiClient from "@/api/instance";

const sales = ref([]);
const store = useStore();
const newSale = reactive({
  id: Math.ceil(Math.random() * 9999999),
  name: "",
  down: 0,
  status: true,
});

const action = ref();
const isShow = ref(false);
const showDelete = ref(false);

const fetchData = async () => {
  try {
    const response = await apiClient.get("sales");
    sales.value = response.data;
  } catch (error) {
    console.error("Error fetching sales data:", error);
  }
};

onMounted(() => {
  fetchData();
});

const showForm = (item, act) => {
  isShow.value = true;
  action.value = act;
  if (act === "edit") {
    newSale.id = item.id;
    newSale.name = item.name;
    newSale.down = item.down;
    newSale.status = item.status;
  } else {
    newSale.id = Math.ceil(Math.random() * 9999999);
    newSale.name = "";
    newSale.down = 0;
    newSale.status = true;
  }
};

const closeForm = () => {
  isShow.value = false;
  fetchData();
};

const idDelete = ref(null);

const deleteSale = (id) => {
  idDelete.value = id;
  showDelete.value = true;
};

const deleteConfirm = () => {
  store.dispatch("apiDeleteDiscount", idDelete.value);
  showDelete.value = false;
  fetchData();
};

const closeShow = () => {
  showDelete.value = false;
  fetchData();
};
</script>

<style>
</style>