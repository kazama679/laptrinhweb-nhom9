<template>
  <div>
    <div className="flex">
      <main className="flex-1 p-5 bg-gray-50">
       
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-sm text-gray-500">Doanh thu</h3>
              <p className="text-lg font-bold">{formatVND(total())}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-sm text-gray-500">Số sản phẩm đã bán</h3>
              <p className="text-lg font-bold">{totalProduct()}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-sm text-gray-500">Sản phẩm trong kho</h3>
              <p className="text-lg font-bold">{totalStock()}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-sm text-gray-500">Số danh mục</h3>
              <p className="text-lg font-bold">{totalCategory()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>

</script>

<style></style>