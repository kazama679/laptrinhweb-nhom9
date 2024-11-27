interface Order {
    id: number;               // Mã đơn hàng, được tạo ngẫu nhiên
    name: string;             // Tên người đặt hàng
    phone: string;            // Số điện thoại người đặt hàng
    address: string;          // Địa chỉ giao hàng
    status: boolean;           // Trạng thái đơn hàng (ví dụ: "choDuyet")
    cart: [];                 // Danh sách sản phẩm trong giỏ hàng
    ship: number;             // Phí vận chuyển
    payTo: string;            // Phương thức thanh toán
    idUser: number;           // chứa ID người dùng 
    created_at: string;       // Ngày tạo đơn hàng (được lấy từ `getCurrentDate()`)
    sale: string;             // Mã giảm giá
}