<template>
    <div>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
                <button @click="closeForm" className="text-blue-500 mb-4">Back</button>
                <h2 className="text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmitForm} className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label htmlFor="name" className="block text-sm font-medium">Tên sản phẩm</label>
                        <input type="text" id="name" name="name" 
                            className="mt-1 p-2 border rounded w-full" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="stock" className="block text-sm font-medium">Số lượng</label>
                        <input type="number" id="stock" name="stock" 
                            className="mt-1 p-2 border rounded w-full" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="price" className="block text-sm font-medium">Giá</label>
                        <input type="text" id="price" name="price" 
                            className="mt-1 p-2 border rounded w-full" required />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="image" className="block text-sm font-medium">URL Ảnh</label>
                        <input type="text" id="image" name="image" 
                            className="mt-1 p-2 border rounded w-full" required />
                        <div className='flex justify-center text-center'>
                            {productData.image && (
                            <img src='' alt="Product" className="w-16 h-16 mt-4" /> 
                            )}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="category" className="block text-sm font-medium">Phân loại</label>
                        <select id="category" name="category" value={productData.category} onChange={handleChange}
                            className="mt-1 p-2 border rounded w-full" required>
                            <option value="">Phân loại sản phẩm</option>
                            {categories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="status" className="block text-sm font-medium">Trạng thái</label>
                        <select id="status" name="status" :value="true ? 'Đang bán' : 'Ngừng bán'"
                            className="mt-1 p-2 border rounded w-full">
                            <option value="Đang bán">Đang bán</option>
                            <option value="Ngừng bán">Ngừng bán</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium">Chi tiết sản phẩm</label>
                        <textarea id="description" name="description" value={productData.description}
                            onChange={handleChange} className="mt-1 p-2 border rounded w-full" rows={3}
                            placeholder="Type here" />
                    </div>
                    <div className="col-span-2">
                        <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded mt-4">
                            {product ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['onClose'])
const closeForm=()=>{
  emit('onClose')
}
</script>

<style></style>