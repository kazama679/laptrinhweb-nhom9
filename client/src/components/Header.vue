<template>
  <div>
    <div className="bg-slate-950 flex justify-center items-center h-12 text-sm text-gray-400 gap-12">
      <div className="flex items-center gap-2">
        <FaPhoneAlt /> +83 349 199 812
      </div>
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt /> 27 Tân Triều, Hà Đông, Hà Nội
      </div>
      <div className="flex items-center gap-2">
        <MdOutlineWorkHistory /> Work Hours
      </div>
      <div className="ml-24 flex gap-6">
        <FaFacebook />
        <FaInstagram />
        <FaTwitch />
        <FaGoogle />
      </div>
      <div className="relative inline-block hover:text-gray-500">
        <div className="flex gap-2 items-center cursor-pointer" onMouseEnter="{handleMouseEnter}"
          onMouseLeave="{handleMouseLeave}">
          <img className="w-8 h-8 rounded-full bg-black p-1" src="" alt="User Avatar" />
          <div className="">{user.name || 'User'}</div>
        </div>
        <!-- Phần menu hiển thị khi hover -->
        <div v-if="false"
          className="absolute bg-gray-100 min-w-[140px] shadow-lg top-12 left-0 z-20 text-gray-600 p-4 mt-[-15px]"
          onMouseEnter="{handleMouseEnter}" onMouseLeave="{handleMouseLeave}">
          <p className="py-2 hover:text-teal-500 cursor-pointer flex justify-center text-center"
            onClick="{handleProfile}">
            Tài khoản của tôi
          </p>
          <p className="py-2 hover:text-teal-500 cursor-pointer flex justify-center text-center"
            onClick="{handleMyOrder}">
            Đơn mua
          </p>
          <p className="py-2 hover:text-teal-500 cursor-pointer flex justify-center text-center"
            onClick="{handleMyLike}">
            Yêu thích
          </p>
          <p className="py-2 hover:text-red-500 cursor-pointer flex justify-center text-center"
            onClick="{handleLogout}">
            Đăng xuất
          </p>
        </div>
      </div>
      <div class="bg-gray-500 bg-opacity-50 fixed top-0 z-10 w-full flex justify-around items-center mt-12 text-white py-3 transition-transform duration-700 ease-in-out translate-y-0">
        <div className="italic text-4xl">Laptops</div>
        <div className="flex gap-5">
          <div className="hover:border-b-2 border-blue-400 cursor-pointer" onClick="{nextHome}">
            TRANG CHỦ
          </div>
          <div className="hover:border-b-2 border-blue-400 cursor-pointer">
            DANH MỤC
          </div>
          <div className="hover:border-b-2 border-blue-400 cursor-pointer">
            DỊCH VỤ CỦA CHÚNG TÔI
          </div>
          <div className="hover:border-b-2 border-blue-400 cursor-pointer">
            BLOG
          </div>
          <div className="hover:border-b-2 border-blue-400 cursor-pointer">
            MEGA MENU
          </div>
          <div className="hover:border-b-2 border-blue-400 cursor-pointer">
            CỬA HÀNG
          </div>
          <div className="hover:border-b-2 border-blue-400 cursor-pointer">
            TRANG
          </div>
        </div>
        <div className="relative text-4xl text-blue-500 cursor-pointer" onClick="{nextCart}">
          <div
            className="absolute text-xs text-white bg-black rounded-full w-5 h-5 flex items-center justify-center -top-2 -right-2">
            {cartItemsCount}
          </div>
          <RiShoppingCart2Fill />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>