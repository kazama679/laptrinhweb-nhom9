export interface Product {
    id: number,
    name: string,
    status: boolean,
    category: string,
    price: number
    date: string
    description: string
    stock: number
    image: string
    created_at: string // Thời gian được tạo
    updated_at: string // Thời gian cập nhật gần nhất
}