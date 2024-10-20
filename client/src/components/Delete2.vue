<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Xác nhận xóa tất cả</h2>
          <p>Bạn có chắc chắn muốn xóa tất sản phẩm?</p>
          <div class="flex justify-end gap-4 mt-6">
            <button @click="closeDeleteAll" class="px-4 py-2 bg-gray-500 text-white rounded">
              Hủy
            </button>
            <button @click="deleteAll" class="px-4 py-2 bg-red-500 text-white rounded">
              Xóa tất cả
            </button>
          </div>
        </div>
      </div>
</template>

<script setup>
const emit = defineEmits(['closeAll','deleteAllConfirm'])
const deleteAll=()=>{
    emit('deleteAllConfirm')
}
const closeDeleteAll=()=>{
    emit('closeAll')
}
</script>

<style scoped>
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    border-radius: 8px;
    width: 30%;
    position: relative;
    text-align: center;
}

.close {
    position: absolute;
    top: 10px;
    right: 15px;
    color: black;
    font-size: 24px;
    cursor: pointer;
}

.modal-actions {
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
}

.btn-confirm {
    background-color: red;
    color: white;
    border: none;
}

.btn-cancel {
    background-color: gray;
    color: white;
    border: none;
}
</style>