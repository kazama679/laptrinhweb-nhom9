<template>
  <div>
    <div class="container" onclick="onclick">
      <div class="top"></div>
      <div class="bottom"></div>
      <form @submit.prevent="handleLogin" class="center">
        <h2>Please Sign In</h2>
        <input type="email" v-model="userInfo.email" placeholder="email" />
        <input
          type="password"
          v-model="userInfo.password"
          placeholder="password"
        />
        <div v-if="error.password" className="text-red-500 text-xs mt-2">
          Tài khoản hoặc mật khẩu không chính xác
        </div>
        <div v-if="error.null" className="text-red-500 text-xs mt-2">
          Tài khoản và mật khẩu không được để trống
        </div>
        <div v-if="error.block" className="text-red-500 text-xs mt-2">
          Tài khoản đã bị chặn, vui lòng dùng tài khoản khác!
        </div>
        <button
          type="submit"
          className="mt-2 bg-pink-600 text-white rounded-full px-8 py-1 uppercase font-bold hover:bg-black transition"
        >
          Đăng nhập
        </button>
        <a
          @click="toRegistere"
          className="text-blue-500 text-sm mt-2 cursor-pointer hover:text-red-600"
          >Bạn chưa có tài khoản?</a
        >
        <div v-if="error.done" className="text-green-500 text-xs mt-2">
          Đã đăng nhập tài khoản thành công
        </div>
        <h2>&nbsp;</h2>
      </form>
    </div>
  </div>
</template>

<script setup>
import apiClient from "@/api/instance";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
const error = reactive({
  null: false,
  password: false,
  block: false,
  done: false,
});
const userInfo = reactive({
  email: "",
  password: "",
});
const router = useRouter();
const toRegistere = () => {
  router.push("/register");
};

onMounted(() => {
  //   document.querySelector(".container").classList.add("hovered");
});

const handleLogin = async () => {
  try {
    const response = await apiClient.get("users");
    const listUser = response.data;
    if (userInfo.email == "" || userInfo.password == "") {
      error.null = true;
      setTimeout(() => {
        error.null = false;
      }, 2000);
    } else {
      error.null = false;
      // đi kiểm tra xem có trùng tk nào trong db k
      const userLogin = listUser.find((item) => {
        return (
          item.email == userInfo.email && item.password == userInfo.password
        );
      });
      // nếu tk sai
      if (!userLogin) {
        error.password = true;
        setTimeout(() => {
          error.password = false;
        }, 2000);
      } else {
        // nếu tk đúng
        error.password = false;
        // đi kiểm tra xem nó là admin hay user
        if (userLogin.role) {
          error.done = true;
          setTimeout(() => {
            localStorage.setItem("userLogin", JSON.stringify(userLogin));
            router.push("/admin");
          }, 500);
        } else {
          if (userLogin.status) {
            error.done = true;
            setTimeout(() => {
              localStorage.setItem("userLogin", JSON.stringify(userLogin));
              router.push("/home");
            }, 500);
          } else {
            error.block = true;
            setTimeout(() => {
              error.block = false;
            }, 3000);
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700");
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  font-family: "Raleway", sans-serif;
}

.container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container:hover .top:before,
.container:hover .top:after,
.container:hover .bottom:before,
.container:hover .bottom:after,
.container:active .top:before,
.container:active .top:after,
.container:active .bottom:before,
.container:active .bottom:after {
  margin-left: 200px;
  transform-origin: -200px 50%;
  transition-delay: 0s;
}
.container:hover .center,
.container:active .center {
  opacity: 1;
  transition-delay: 0.2s;
}

/* .container.hovered .top:before,
.container.hovered .top:after,
.container.hovered .bottom:before,
.container.hovered .bottom:after {
  margin-left: 200px;
  transform-origin: -200px 50%;
  transition-delay: 0s;
}
.container.hovered .center {
  opacity: 1;
  transition-delay: 0.2s;
} */

.top:before,
.top:after,
.bottom:before,
.bottom:after {
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
