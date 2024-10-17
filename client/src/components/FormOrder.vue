<template>
    <div class="fixed inset-0 bg-gray-950 bg-opacity-50 flex justify-center items-center">
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <Sidebar />
      </div>

      <!-- {/* thông tin đơn hàng */} -->
      <div className="bg-white flex-1 p-10 ml-64">
        <div className="flex justify-center text-center">
          <button 
          @click="closeForm"
            className="text-blue-500 mb-5 hover:text-blue-700 transition-colors"
          >
            Back
          </button>
        </div>
        <div className="mb-5">
          <h1 className="text-3xl font-bold">Thông tin đơn hàng</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Mã đơn hàng:</strong> {orders[orderIndex].id}
            </p>
            <p>
              <strong>Tổng tiền (cả ship):</strong>{" "}
              {formatVND(
                calculateTotal(orders[orderIndex].cart, orders[orderIndex].ship)
              )}
            </p>
            <p>
              <strong>Tên người nhận:</strong> {orders[orderIndex].name}
            </p>
            <p>
              <strong>Số người nhận:</strong> {orders[orderIndex].phone}
            </p>
            <p>
              <strong>Địa chỉ người nhận:</strong> {orders[orderIndex].address}
            </p>
            <p>
              <strong>Ghi chú:</strong> {orders[orderIndex].note}
            </p>
            <p>
              <strong>Trạng thái:</strong>
              <select
                className="border border-gray-300 ml-2 p-1 rounded"
                value={status}
                :disabled='false' 
              >
                <option value="choDuyet" :disabled='false'>
                  Chờ duyệt
                </option>
                <option value="daDuyet">Đã duyệt</option>
                <option value="daGui">Đã gửi</option>
              </select>
            </p>
            <p>
              <strong>Thời gian đặt hàng:</strong>{" "}
              {orders[orderIndex].created_at}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {orders[orderIndex].payTo === "NhanHang"
                ? "Trả tiền khi nhận hàng"
                : "Trả tiền qua chuyển khoản"}
            </p>
          </div>
          <button
            onClick={handleUpdate}
            className="bg-purple-500 text-white px-4 py-2 rounded mt-5"
            :disabled='false'
          >
            Cập nhật
          </button>
        </div>

        <!-- {/* hiển thị sản phẩm */} -->
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">STT</th>
              <th className="px-4 py-2 border">Ảnh</th>
              <th className="px-4 py-2 border">Tên sản phẩm</th>
              <th className="px-4 py-2 border">Số lượng</th>
              <th className="px-4 py-2 border">Đơn giá</th>
              <th className="px-4 py-2 border">Tổng giá sp</th>
            </tr>
          </thead>
          <tbody>
              <tr key={item.id}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <img
                    src=''
                    alt={item.name}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border text-center">{item.quantity}</td>
                <td className="px-4 py-2 border">{formatVND(item.price)}</td>
                <td className="px-4 py-2 border">
                  {formatVND(item.price * item.quantity)}
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['onClose'])
  const closeForm=()=>{
    emit('onClose')
  }
  </script>
  
  <style>
  
  </style>