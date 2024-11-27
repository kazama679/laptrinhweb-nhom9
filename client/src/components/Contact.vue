<template>
  <div className="bg-yellow-400 text-blue-900 p-8 text-center mt-20 flex justify-center gap-44">
      <div className="text-2xl font-bold">NẾU CÓ THẮC MẮC GÌ ĐỪNG NGẦN NGẠI HỎI...</div>
      <div className="flex justify-center items-center gap-10">
        <div className="flex items-center text-2xl">
          <span className="text-blue-900">+83 349 199 812</span>
        </div>
        <button @click="showForm" className="flex items-center bg-transparent border border-white text-blue-900 py-2 px-6 rounded-md hover:bg-white hover:text-blue-900 transition duration-300">
          FEEDBACK
        </button>
      </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['showFeedback'])
const showForm=()=>{
  emit('showFeedback')
}
</script>

<style>

</style>