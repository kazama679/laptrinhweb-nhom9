<template>
    <div className="flex">
        <main className="flex-1 p-5 bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between mb-4">
                    <div className='flex gap-4'>
                        <!-- {/* Lọc theo vai trò */} -->
                        <select className="border px-4 py-2 rounded" value={filterRole}>
                            <option value="">Lọc theo vai trò</option>
                            <option value="admin">Admin</option>
                            <option value="users">Users</option>
                        </select>
                        <!-- {/* Sắp xếp theo tên */} -->
                        <select className="border px-4 py-2 rounded" value={sortOrder}>
                            <option value="">Sắp xếp theo tên</option>
                            <option value="az">Sắp xếp từ lớn đến bé</option>
                            <option value="za">Sắp xếp từ bé đến lớn</option>
                        </select>
                    </div>
                </div>

                <!-- {/* Hiển thị danh sách người dùng */} -->
                <table className="table-auto w-full border-collapse border border-gray-200 text-center">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">STT</th>
                            <th className="px-4 py-2 border">Avatar</th>
                            <th className="px-4 py-2 border">Tên</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">Role</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in customer" :key="item.id">
                        <tr>
                            <td className="px-4 py-2 border">{{ index + 1 }}</td>
                            <td className="px-4 py-2 border">
                                <div className="flex justify-center items-center">
                                    <img className="h-10 w-10 rounded-full" :src='item.avatar' :alt='item.name' />
                                </div>
                            </td>
                            <td className="px-4 py-2 border">{{ item.name }}</td>
                            <td className="px-4 py-2 border">{{ item.email }}</td>
                            <td className="px-4 py-2 border">{{ item.phone }}</td>
                            <td className="px-4 py-2 border">
                                <button className='text-black px-3 py-1 rounded'>{{ item.role ? "Admin" :
                                    "User" }}</button>
                            </td>
                            <td className="px-4 py-2 border">{{ item.created_at }}</td>
                            <td className="px-4 py-2 border">
                                <div @click="handleStatus(item)" className="flex justify-center gap-2 cursor-pointer">
                                    <div v-if="!item.role">
                                        <i v-if="!item.status" class="fa-solid fa-lock text-red-500"></i>
                                        <i v-else class="fa-solid fa-unlock text-green-500"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- {/* Phân trang */}
                    <div className="flex justify-center space-x-2 mt-4">
                        {Array.from({ length: Math.ceil(filteredUsers.length / pageNumber) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div> -->
                    <Edit v-if="isShow" @editConfirm="updateCustomer" @close="closeUpdate"></Edit>
            </div>
        </main>
    </div>
</template>

<script setup>
import apiClient from '@/api/instance';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Edit from '@/components/Edit.vue';

const store = useStore()
const customer = ref([])
const customerUpdate = ref(null)

const fetchData = async () => {
    try {
        const response = await apiClient.get('users')
        customer.value = response.data
    } catch (err) {
        console.log(err);
    }
}

onMounted(() => {
    fetchData()
})

const isShow=ref(false);

// Mở modal
const handleStatus = (customer) => {
    isShow.value = true;
    customerUpdate.value = customer
}

// Đóng modal
const closeUpdate=()=>{
    isShow.value=false
}

const updateCustomer = () => {
    customerUpdate.value.status = !customerUpdate.value.status; 
    store.dispatch("apiEditCustomer", customerUpdate.value); 
    isShow.value = false;
    customerUpdate.value = null;
}

</script>

<style></style>