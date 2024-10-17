<template>
  <div>
      <Header />
      <div className='flex justify-center text-center pt-28 text-3xl font-bold'>Sản phẩm yêu thích của bạn</div>

      <!-- {/* Hiển thị danh sách sản phẩm yêu thích */} -->
      <div className="profile-container-bot">
          <div key={product.id} className="order-item-all flex justify-center items-center mt-12 mb-5">
            <div className="order-item w-4/5 bg-gray-100 border border-gray-300 rounded-lg p-5 mb-5">
              <div className="order-header flex justify-between items-center mb-5">
                <div>
                  <span className="text-lg font-bold">
                    {product.name.split(' ').slice(0, 5).join(' ')}
                  </span>
                </div>
                <div className="price-info text-right">
                  <span className="text-red-500 text-lg">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
              </div>
              <div className="order-details flex justify-between items-center mb-5">
                <img src='' alt={product.name} className="w-[100px] h-[100px] object-cover mr-5 border border-gray-300" />
                <div className="product-info flex-grow">
                  <p className="product-description text-gray-600 mb-1">{product.description}</p>
                </div>
              </div>
              <div className="order-actions flex justify-end items-center mt-[-50px] gap-3">
                <button className="contact-seller-button flex py-2 px-4 rounded-md bg-red-500 text-white">Xóa</button>
                <button className="contact-seller-button flex py-2 px-4 rounded-md bg-orange-500 text-white">Liên hệ người bán</button>
                <button className="contact-seller-button flex py-2 px-4 rounded-md bg-green-500 text-white">Xem chi tiết sản phẩm</button>
              </div>
            </div>
          </div>
      </div>
      <Contact />
      <Footer />
    </div>
</template>

<script setup>

import Contact from '@/components/Contact.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue'
</script>

<style>

</style>