<template>
  <menu className="w-[250px] bg-zinc-800 text-white min-h-screen p-5">
      <h2 className="text-2xl mb-6">Rikkei Academy</h2>
      <nav>
        <ul className="space-y-4">  
          <li>
            <router-link class="flex items-center px-4 hover:text-white" to="/admin/dashboard" exact-active-class="active">
              <MdDashboard className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link class="flex items-center px-4 hover:text-white" to="/admin/products" exact-active-class="active">
              <MdDashboard className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Products</span>
            </router-link>
          </li>
          <li>
            <router-link class="flex items-center px-4 hover:text-white" to="/admin/orders" exact-active-class="active">
              <MdDashboard className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Orders</span>
            </router-link>
          </li>
          <li>
            <router-link class="flex items-center px-4 hover:text-white" to="/admin/customer" exact-active-class="active">
              <MdDashboard className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Customer</span>
            </router-link>
          </li>
          <li>
            <router-link class="flex items-center px-4 hover:text-white" to="/admin/category" exact-active-class="active">
              <MdDashboard className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Category</span>
            </router-link>
          </li>
          <li>
            <router-link class="flex items-center px-4 hover:text-white" to="/admin/setting" exact-active-class="active">
              <MdDashboard className="mr-2 flex-shrink-0" />
              <span className="flex-grow">Settings</span>
            </router-link>
          </li>
          <li className="mt-auto">
            <button onClick={handleLogout} className="flex items-center text-red-400 hover:text-red-600 px-4">
              <IoIosLogOut className="mr-2 flex-shrink-0" />
              <span @click="logOut" className="flex-grow">Log out</span>
            </button>
          </li>
        </ul>
      </nav>
    </menu>
</template>

<script setup>
import { useRouter } from "vue-router";
const router=useRouter()
const logOut=()=>{
  localStorage.removeItem('userLogin');
  router.push('/login');
}
</script>

<style>
.active{
  background: #000;
  border-radius: 16px;
  padding: 5px;
  padding-left: 16px;
  margin-bottom: -5px;
  margin-top: -5px;
}
</style>