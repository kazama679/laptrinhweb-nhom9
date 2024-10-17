<!-- <template>
    <router-view/>
    
</template>

<script setup>
import { ref } from 'vue';
import {getDownloadURL, ref as storageRef, uploadBytes} from 'firebase/storage';
import { storage } from './firebase';

const imageUrl = ref('');
const file = ref(null);
const downloadUrl = ref('');
const handleUpFile=(e)=>{
  imageUrl.value = URL.createObjectURL(e.target.files[0]);
  file.value=e.target.files[0]
}

const handle=async()=>{
  // lưu hình ảnh lên firebase
  if(!file.value){
    alert("Chưa có file được chọn")
  }else{
    try{
      // tạo tham chiếu đến folder đc lưu trữ trên firebase
      const storageReference = storageRef(storage, `images/${file.value.name}`);

      // lưu hình ảnh trên firebase
      await uploadBytes(storageReference,file.value)

      // lấy url sau khi đã upload xong
      downloadUrl.value = await getDownloadURL(storageReference)
    }catch(error){
      console.log(error);
    }
  }
}
const handleLink=()=>{
  console.log(2222222222222,downloadUrl.value);
}
</script>

<style></style> -->


<template>
  <router-view/>
</template>

<script>
export default {

}
</script>

<style>

</style>