<template>
  <div>
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg w-full max-w-3xl">
        <button @click="onCLose" class="text-blue-500 mb-4">Back</button>
        <h2 class="text-2xl font-bold mb-4">{{ props.act === "edit" ? "Edit Sale" : "Add Sale" }}</h2>
        <form @submit.prevent="handleAdd" class="grid grid-cols-2 gap-4">
          <div class="col-span-1">
            <label class="block text-sm font-medium">Name</label>
            <input v-model="props.new.name" type="text" class="mt-1 p-2 border rounded w-full" required />
            <div v-if="ErrorName" class="text-red-500 text-xs mt-1">Không được trùng tên</div>
          </div>
          <div class="col-span-1">
            <label class="block text-sm font-medium">Discount (%)</label>
            <input v-model="props.new.down" type="number" min="0" max="100" class="mt-1 p-2 border rounded w-full" required />
          </div>
          <div class="col-span-1">
            <label class="block text-sm font-medium">Status</label>
            <select v-model="props.new.status" class="mt-1 p-2 border rounded w-full">
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
          <div class="col-span-2">
            <button type="submit" class="w-full bg-purple-500 text-white py-2 rounded mt-4">
              {{ props.act === "edit" ? "Edit Sale" : "Add Sale" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiClient from "@/api/instance";
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps(["new", "act"]);

const emit = defineEmits(["onCLose", "update"]);
const store = useStore();

const onCLose = () => {
  emit("onClose");
};

const ErrorName = ref(false);

const handleAdd = async () => {
  if (props.act == "add") {
    const response = await apiClient.get("sales");
    const salesList = response.data;
    const checkName = salesList.find((item) => item.name === props.new.name);
    if (!checkName) {
      ErrorName.value = false;
      store.dispatch("apiAddDiscount", props.new);
      emit("onClose");
      emit("update");
    } else {
      ErrorName.value = true;
    }
  } else {
    store.dispatch("apiEditDiscount", props.new);
    emit("onClose");
    emit("update");
  }
};
</script>

<style>
</style>