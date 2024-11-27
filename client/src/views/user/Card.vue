<template>
  <div>
    <Header />
    <div className="flex justify-center items-center mt-32">
      <div className="w-3/4 flex p-6 border border-gray-300 rounded-lg bg-white">
        <div className="w-1/2">
          <img className="w-full h-full rounded-lg shadow-md" :src='product?.image' alt= />
        </div>
        <div className="w-1/2 flex flex-col justify-between ml-10 text-left">
          <h1 className="text-2xl font-bold mb-2">{{ product?.name }}</h1>
          <div className="flex items-center mb-2">
            <!-- <span className="mr-2">{calculateAverageRating()}</span> -->
            <!-- {/* Hiển thị giá trị trung bình */} -->
            <div className="flex text-yellow-500">
              <span key="{index}" className="mr-1">★</span>
              <span key="{index}" className="mr-1">☆</span>
              <!-- // Hiển thị sao trống cho phần còn lại -->
            </div>
            <span className="ml-2">chính hãng</span>
          </div>

          <div className="flex text-lg text-gray-500 mb-2">
            <span>chính sách trả hàng:</span>
            <span className="flex items-center ml-2 text-red-500">
              <GiReturnArrow className="text-red-500" />
              <p>Đổi trả 15 ngày</p>
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg">Giá sản phẩm:</span>
            <span className="text-xl text-red-500 font-bold">{{
              formatVND(product?.price)
            }}</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <b>Chi tiết sản phẩm:</b> {{ product?.description }}
          </div>
          <div className="flex space-x-4">
            <button @click="handleAddToCart"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <FaCartPlus /> Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- {/* Sản phẩm liên quan */} -->
    <div class="container mx-auto my-10 px-40 py-20 bg-gray-50">
      <h2 class="text-lg font-bold text-left">Sản phẩm liên quan</h2>
      <div class="flex flex-wrap justify-between gap-5 mt-5">
        <!-- Vòng lặp qua sản phẩm liên quan -->
        <div v-for="item in relatedProducts" :key="item.id" @click="nextCard(item.id)"
          class="bg-white rounded-lg overflow-hidden hover:shadow-lg cursor-pointer w-1/5">
          <img class="w-full h-42 object-cover" :src="item.image" alt="Product Image" />
          <div class="p-4">
            <h3 class="text-sm font-semibold truncate">{{ item.name }}</h3>
            <p class="text-red-500 mt-2 font-bold">{{ formatVND(item.price) }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- {/* end-Sản phẩm liên quan */} -->

    <!-- {/* bình luận */} -->
    <div className="container mx-auto mt-8 px-40">
      <!-- {/* Nút đánh giá */} -->
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Lọc theo</h2>
        <button @click="showRating" className="bg-red-500 text-white px-4 py-2 rounded-md">
          Đánh giá ngay
        </button>
      </div>
      <!-- {/* Bộ lọc */} -->
      <div className="flex items-center space-x-4 my-4">
        <button @click="filterByStars(0)" :class="{
          'bg-red-500 text-white': selectedStarFilter === 0,
          'border border-red-500 text-red-500': selectedStarFilter !== 0,
        }" class="px-4 py-2 rounded-full">
          Tất cả
        </button>
        <div className="flex space-x-2">
          <button @click="filterByStars(5)" :class="{
            'bg-red-500 text-white': selectedStarFilter === 5,
            'border border-red-500 text-red-500': selectedStarFilter !== 5,
          }" class="px-4 py-2 rounded-full">
            5 sao
          </button>
          <button @click="filterByStars(4)" :class="{
            'bg-red-500 text-white': selectedStarFilter === 4,
            'border border-red-500 text-red-500': selectedStarFilter !== 4,
          }" class="px-4 py-2 rounded-full">
            4 sao
          </button>
          <button @click="filterByStars(3)" :class="{
            'bg-red-500 text-white': selectedStarFilter === 3,
            'border border-red-500 text-red-500': selectedStarFilter !== 3,
          }" class="px-4 py-2 rounded-full">
            3 sao
          </button>
          <button @click="filterByStars(2)" :class="{
            'bg-red-500 text-white': selectedStarFilter === 2,
            'border border-red-500 text-red-500': selectedStarFilter !== 2,
          }" class="px-4 py-2 rounded-full">
            2 sao
          </button>
          <button @click="filterByStars(1)" :class="{
            'bg-red-500 text-white': selectedStarFilter === 1,
            'border border-red-500 text-red-500': selectedStarFilter !== 1,
          }" class="px-4 py-2 rounded-full">
            1 sao
          </button>
        </div>
      </div>
      <!-- {/* end-Bộ lọc */} -->

      <!-- Danh sách đánh giá sau khi đã lọc -->
      <div v-for="item in filterComment" :key="item.id">
        <div className="border-b border-gray-300 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold">
              <img class="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold"
                :src="item.avatar" alt="" />
            </div>
            <div>
              <p className="font-bold">{{ item.name }}</p>
              <p className="font-bold text-red-500">
                <t v-for="n in item.starNumber" :key="n">★</t>
              </p>
              <div className="flex items-center text-gray-500">
                <span className="mr-2"><i class="fa-regular fa-clock"></i></span>
                <span>{{ item.created_at }}</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <p className="mt-2 text-gray-600">{{ item.comment }}</p>
            <button @click="editComment(item)" class="hover:text-red-500" v-if="item.idUser == userLocal?.id">
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
      <div v-if="filterComment.length == 0" className="text-black">
        Chưa có đánh giá nào.
      </div>
    </div>
    <!-- {/* end-danh sách đánh giá */} -->

    <!-- {/* comment */} -->
    <div v-if="ratingFormn" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-[600px] max-w-full p-6 relative">
        <div class="flex justify-between">
          <h2 class="text-xl font-bold mb-4">Đánh giá</h2>
          <i @click="closeRating" class="fa-solid fa-x cursor-pointer hover:text-red-500"></i>
        </div>

        <!-- Lựa chọn số sao -->
        <div class="flex justify-center mb-4">
          <span v-for="star in 5" :key="star" class="cursor-pointer text-3xl" :class="{
            'text-yellow-500': selectedStar >= star,
            'text-gray-300': selectedStar < star,
          }" @click="selectStar(star)">★</span>
        </div>

        <!-- Hiển thị đánh giá tương ứng với số sao -->
        <p class="text-center mb-4" v-if="selectedStar === 5">Rất tuyệt vời</p>
        <p class="text-center mb-4" v-if="selectedStar === 4">Tuyệt vời</p>
        <p class="text-center mb-4" v-if="selectedStar === 3">Tạm</p>
        <p class="text-center mb-4" v-if="selectedStar === 2">Tệ</p>
        <p class="text-center mb-4" v-if="selectedStar === 1">Rất tệ</p>

        <!-- Nhập bình luận -->
        <textarea v-model="comment" class="w-full p-3 border border-gray-300 rounded-lg resize-none"
          placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm" rows="4"></textarea>

        <button @click="submitRating"
          class="w-full mt-6 bg-red-500 text-white text-lg font-bold py-3 rounded-md hover:bg-red-600">
          Gửi Đánh Giá
        </button>
      </div>
    </div>
    <!-- {/* end-comment */} -->

    <!-- {/* Form thông báo khi thêm sản phẩm vào giỏ hàng thành công */} -->
    <div v-if="isShowMessager" className="fixed inset-0 flex items-center justify-center z-50 border border-black">
      <div className="bg-white p-6 shadow-2xl rounded-lg z-50 flex flex-col items-center justify-center text-center">
        <i class="fa-solid fa-cart-plus text-green-500 text-5xl mb-2"></i>
        <p className="text-lg font-bold mt-2">Đã thêm vào Giỏ hàng</p>
      </div>
    </div>

    <!-- form khi thêm đánh giá  -->
    <div v-if="messSave" class="text-center my-4 fixed inset-0 flex items-end justify-center z-50">
      <div class="bg-gray-500 text-white text-sm px-6 py-4 rounded mt-4 inline-block max-w-md shadow-lg">
        <span><i class="fa fa-check text-green-500"></i> Cảm ơn bạn đã đánh giá sản phẩm</span> 
        <button @click="closeMess" class="text-pink-500 font-bold hover:text-pink-700 ml-4">
          Close
        </button>
      </div>
    </div>

    <div v-if="mess1" class="text-center my-4 fixed inset-0 flex items-end justify-center z-50">
      <div class="bg-red-400 text-white text-sm px-6 py-4 rounded mt-4 inline-block max-w-md shadow-lg">
        <span>Hãy mua sản phẩm rồi đánh giá cho bọn mình nhé!</span> 
        <button @click="closeMess2" class="text-black font-bold hover:text-pink-900 ml-4">
          Close
        </button>
      </div>
    </div>
    <div v-if="mess2" class="text-center my-4 fixed inset-0 flex items-end justify-center z-50">
      <div class="bg-red-400 text-white text-sm px-6 py-4 rounded mt-4 inline-block max-w-md shadow-lg">
        <span>Bạn đã đánh giá sản phẩm này rồi.</span> 
        <button @click="closeMess3" class="text-black font-bold hover:text-pink-900 ml-4">
          Close
        </button>
      </div>
    </div>
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import apiClient from "@/api/instance";
import Contact from "@/components/Contact.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id);
const userLocal = JSON.parse(localStorage.getItem("userLogin") || "null");

const products = ref([]);
const product = ref(null);
const ratingFormn = ref(false);
const messSave = ref(false);
const mess1 = ref(false);
const mess2 = ref(false);

// biến lưu sản phẩm liên quan
const relatedProducts = ref([]);
const orders = ref([])

const fetchData = async () => {
  try {
    const response = await apiClient.get("products");
    const response2 = await apiClient.get("orders");
    products.value = response.data;
    orders.value = response2.data;
  } catch (error) {
    console.error(error);
  }
};

console.log(2222,product);
if(product.value){
  const flag = product.value.comments.forEach(item=>{
    total.value+=item.starNumber
  })
  console.log(2222,flag);
}

  // const total=ref(0)

watch(id, () => {
  // watch để theo dõi sự thay đổi của products và cập nhật product
  fetchData();
});

watch(products, (newProducts) => {
  if (newProducts.length > 0) {
    product.value = newProducts.find((item) => item.id == id.value);
    // Khi `product` thay đổi, cập nhật sản phẩm liên quan một lần duy nhất
    relatedProducts.value = someCat(
      products.value.filter((i) => i.category == product.value?.category && i.id !== product.value.id)
    ).slice(0, 4);
  }
});

onMounted(() => {
  window.scrollTo(0, 0);
  fetchData();
});

// format tiền
const formatVND = (price) => {
  if (price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
};

const selectedStar = ref(0);
const comment = ref("");
const editingComment = ref(null); // Biến để lưu trạng thái bình luận đang chỉnh sửa

// Hàm mở form chỉnh sửa bình luận
const editComment = (commentItem) => {
  editingComment.value = commentItem; 
  selectedStar.value = commentItem.starNumber;
  comment.value = commentItem.comment;
  ratingFormn.value = true;
};

// thêm sửa đánh giá
const submitRating = async () => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("userLogin"));
    const response = await apiClient.get("products");
    const products = response.data;

    // Tìm sản phẩm hiện tại
    const currentProduct = products.find((p) => p.id === product.value.id);
    if (!currentProduct) return;

    if (editingComment.value) {
      // Nếu đang chỉnh sửa bình luận
      const commentIndex = currentProduct.comments.findIndex(
        (item) => item.id === editingComment.value.id
      );
      if (commentIndex !== -1) {
        currentProduct.comments[commentIndex] = {
          ...currentProduct.comments[commentIndex],
          starNumber: selectedStar.value,
          comment: comment.value,
          created_at: new Date().toLocaleDateString("vi-VN"),
        };
      }
      editingComment.value = null; // Reset trạng thái chỉnh sửa
    } else {
      // Thêm bình luận mới
      const newComment = {
        id: Math.ceil(Math.random() * 9999999),
        idUser: userLocal.id,
        name: userLocal.name,
        avatar: userLocal.avatar || "",
        starNumber: selectedStar.value,
        comment: comment.value,
        created_at: new Date().toLocaleDateString("vi-VN"),
        feedback: [],
      };
      currentProduct.comments.push(newComment);
    }

    // Gửi cập nhật lên server
    await store.dispatch("apiEditProduct", currentProduct);

    // Sau khi gửi đánh giá thành công, reset form và đóng form
    comment.value = "";
    selectedStar.value = 0;
    ratingFormn.value = false;
    messSave.value = true;

    // Lấy lại dữ liệu để cập nhật UI
    fetchData();
    setTimeout(() => {
      messSave.value = false;
    }, 3000);
  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);
  }
};

const closeMess=()=>{
  messSave.value = false;
}

// Hàm chọn số sao
const selectStar = (star) => {
  selectedStar.value = star;
};

const nextCard = async (id) => {
  await router.push(`/card/${id}`);
  window.scrollTo(0, 0);
};

// hàm sản phẩm liên quan
const someCat = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isShowMessager = ref(false);
const handleAddToCart = async () => {
  const userLocal = JSON.parse(localStorage.getItem("userLogin"));
  if (userLocal == "null" || !userLocal) {
    router.push("/login");
    return;
  }
  isShowMessager.value = true;
  setTimeout(() => {
    isShowMessager.value = false;
  }, 1000);

  // Gọi API để lấy danh sách users
  try {
    const response = await apiClient.get("users");
    const users = response.data;

    // Tìm vị trí của user đang đăng nhập
    const indexUser = users.findIndex((item) => item.id === userLocal.id);

    if (indexUser === -1) {
      console.log("Không tìm thấy người dùng");
      return;
    }

    console.log("Vị trí của user:", indexUser);

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng của user chưa
    const user = users[indexUser];
    const productInCart = user.cart.findIndex(
      (item) => item.id === product.value.id
    );

    if (productInCart != -1) {
      // Nếu sản phẩm đã có, tăng số lượng
      user.cart[productInCart].quantity += 1;
    } else {
      // Nếu sản phẩm chưa có, thêm mới
      user.cart.push({ ...product.value, quantity: 1 });
    }
    store.dispatch("apiEditCustomer", user);
    fetchData();
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
  }
};

const showRating = async () => {

  // kiểm tra xem đăng nhập chưa
  const userLocal = JSON.parse(localStorage.getItem("userLogin"));
  if (!userLocal) {
    router.push("/login"); 
  }
  
  const res = await apiClient.get('orders')
  const orders = res.data
  // kiểm tra xem ng dùng đã từng đặt sản phẩm này chưa
  const filterUserOrders = orders.filter(item=>item.idUser==userLocal.id)
  let foundProduct = false;
    filterUserOrders.forEach(order => {
      order.cart.forEach(item => {
        if (item.id === product.value.id) {
          foundProduct = true;
        }
      });
    });
    if (foundProduct) {
      if (Array.isArray(product.value.comments)) {
        const checkComment = product.value.comments.some(item => item.idUser == userLocal.id);
        if (!checkComment) {
          selectedStar.value = 5;
          ratingFormn.value = true;
        } else {
          mess2.value=true
          setTimeout(() => {
            mess2.value=false
          }, 3000);
        }
      } else {
        // nếu chx có bình luận nào
        selectedStar.value = 5;
        ratingFormn.value = true;
      }

    }else{
      // nếu chưa mua
      mess1.value=true
      setTimeout(() => {
            mess1.value=false
          }, 3000);
    }
};
const closeRating = () => {
  ratingFormn.value = false;
  comment.value = "";
  selectedStar.value = 0;
  ratingFormn.value = false;
};

const closeMess2=()=>{
  mess1.value=false
}

const closeMess3=()=>{
  mess2.value=false
}
const selectedStarFilter = ref(0); // selected = đã chọn

// Hàm lọc theo số sao
const filterByStars = (star) => {
  selectedStarFilter.value = star; // Cập nhật sao đang được chọn
  if (star === 0) {
    // Nếu chọn "Tất cả", hiển thị tất cả các bình luận
    filterComment.value = product.value?.comments || [];
  } else {
    // Lọc các bình luận theo số sao
    filterComment.value =
      product.value?.comments.filter(
        (comment) => comment.starNumber === star
      ) || [];
  }
};

// Biến lưu trữ các bình luận đã được lọc
const filterComment = ref([]);

// Theo dõi sự thay đổi của sản phẩm và cập nhật danh sách bình luận sau khi lọc
watch(product, (newProduct) => {
  if (newProduct && selectedStarFilter.value === 0) {
    // Nếu không có bộ lọc sao (tất cả), hiển thị tất cả các bình luận
    filterComment.value = newProduct.comments || [];
  }
});
</script>

<style></style>