<template>
    <div>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
                <button @click="closeForm" class="text-blue-500 mb-4">Back</button>
                <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm</h2>
                <form onSubmit={handleSubmitForm} className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label htmlFor="name" className="block text-sm font-medium">Tên sản phẩm</label>
                        <input v-model="newProduct.name" type="text"
                            className="mt-1 p-2 border rounded w-full" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="stock" type="number" className="block text-sm font-medium">Số lượng</label>
                        <input v-model="newProduct.stock"
                            className="mt-1 p-2 border rounded w-full" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="price" type="number" className="block text-sm font-medium">Giá</label>
                        <input v-model="newProduct.price"
                            className="mt-1 p-2 border rounded w-full" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="image" className="block text-sm font-medium">URL Ảnh</label>
                        <input @change="handleUpFile" type="file">
                            className="mt-1 p-2 border rounded w-full" required />
                        <div v-if="newProduct.image!==''" className='flex justify-center text-center'>
                            <img :src='newProduct.image' className="w-16 h-16 mt-4" /> 
                        </div>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="category" className="block text-sm font-medium">Phân loại</label>
                        <select class="mt-1 p-2 border rounded w-full" v-model="newProduct.category">
                            <option value="">Phân loại sản phẩm</option>
                            <option v-for="item in category" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="status" className="block text-sm font-medium">Trạng thái</label>
                        <select :value=true v-model="newProduct.status"
                            className="mt-1 p-2 border rounded w-full">
                            <option :value=true>Đang bán</option>
                            <option :value=false>Ngừng bán</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium">Chi tiết sản phẩm</label>
                        <textarea 
                        v-model="newProduct.description" className="mt-1 p-2 border rounded w-full" rows={3}
                            placeholder="Mô tả chi tiết sản phẩm" />
                    </div>
                    <div className="col-span-2">
                        <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded mt-4">
                            Thêm sản phẩm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/instance';
import { onMounted, reactive, ref } from 'vue';
// import {getDownloadURL, ref as storageRef, uploadBytes} from '@/firebase/index';
// import { storage } from '@/firebase';

const emit = defineEmits(['onClose']);

const closeForm = () => {
  emit('onClose');
};

const newProduct=reactive({
    id: Math.ceil(Math.random()*9999999),
    name: '',
    price: 0,
    stock: 0,
    category: '',
    status: true,
    image: '',
    description: '',
    created_at: '',
    comments:[],
    sales: 0
})

const category=ref([])
const fetchData=async()=>{
    const response = await apiClient('classify')
    category.value=response.data
}
onMounted(() => {
    fetchData()
})

// const imageUrl = ref('');
// const file = ref(null);
// const downloadUrl = ref('');
// const handleUpFile=(e)=>{
//   imageUrl.value = URL.createObjectURL(e.target.files[0]);
//   file.value=e.target.files[0]
// }

// const handleImage=async()=>{
//   // lưu hình ảnh lên firebase
//   if(!file.value){
//     alert("Chưa có file được chọn")
//   }else{
//     try{
//       // tạo tham chiếu đến folder đc lưu trữ trên firebase
//       const storageReference = storageRef(storage, `images/${file.value.name}`);

//       // lưu hình ảnh trên firebase
//       await uploadBytes(storageReference,file.value)

//       // lấy url sau khi đã upload xong
//       downloadUrl.value = await getDownloadURL(storageReference)
//     }catch(error){
//       console.log(error);
//     }
//   }
// }
</script>

<style></style>