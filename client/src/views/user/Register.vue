<template>
  <div>
    <div class="containerRegister" onclick="onclick"> 
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="center">
        <h2>Please Register</h2>
        <input type="text" placeholder="Tên đăng nhập" />
        <div v-if="false" className="text-red-500 text-xs">Tên đăng nhập không được để trống</div>
        <input type="email" placeholder="email" />
        <div v-if="false" className="text-red-500 text-xs">Email không được để trống</div>
        <div v-if="false" className="text-red-500 text-xs">Email không được trùng</div>
        <input type="password" placeholder="Mật khẩu" />
        <div v-if="false" className="text-red-500 text-xs">Mật khẩu không được để trống</div>
        <input type="password" placeholder="Nhập lại mật khẩu" />
        <div v-if="false" className="text-red-500 text-xs">Nhập lại mật khẩu không khớp</div>
        <input type="text" placeholder="số điện thoại" />
        <div v-if="false" className="text-red-500 text-xs">Số điện thoại không hợp lệ</div>
        <a @click="toLogin" className="text-blue-500 text-sm mt-2 cursor-pointer hover:text-red-600">Bạn đã có tài khoản?</a>
        <button type="submit" className="mt-2 bg-pink-600 text-white rounded-full px-8 py-1 uppercase font-bold hover:bg-black transition">Đăng ký</button>
        <div v-if="false" className="text-green-500 text-xs mt-2">Đã đăng ký tài khoản thành công</div>                       
        <h2>&nbsp;</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const toLogin = () =>{
  router.push('/login')
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700");
*, *:before, *:after {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  font-family: "Raleway", sans-serif;
}

.containerRegister {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.containerRegister:hover .top:before, .containerRegister:hover .top:after, .containerRegister:hover .bottom:before, .containerRegister:hover .bottom:after, .containerRegister:active .top:before, .containerRegister:active .top:after, .containerRegister:active .bottom:before, .containerRegister:active .bottom:after {
  margin-left: 275px;
  transform-origin: -275px 50%;
  transition-delay: 0s;
}
.containerRegister:hover .center, .containerRegister:active .center {
  opacity: 1;
  transition-delay: 0.2s;
}

.top:before, .top:after, .bottom:before, .bottom:after {
  content: "";
  display: block;
  position: absolute;
  width: 200vmax;
  height: 200vmax;
  top: 50%;
  left: 50%;
  margin-top: -100vmax;
  transform-origin: 0 50%;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  z-index: 10;
  opacity: 0.65;
  transition-delay: 0.2s;
}

.top:before {
  transform: rotate(45deg);
  background: #e46569;
}
.top:after {
  transform: rotate(135deg);
  background: #ecaf81;
}

.bottom:before {
  transform: rotate(-45deg);
  background: #60b8d4;
}
.bottom:after {
  transform: rotate(-135deg);
  background: #3745b5;
}

.center {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
  transition-delay: 0s;
  color: #333;
}
.center input {
  width: 100%;
  padding: 10px;
  margin: 5px;
  border-radius: 1px;
  border: 1px solid #ccc;
  font-family: inherit;
}
</style>