// تعريف المنتج نفسه
export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  category: { name: string };
  brand: { name: string };
  ratingsAverage: number;
}

// تعريف العنصر الواحد جوه السلة
export interface CartItem {
  count: number;
  price: number;
  product: Product;
}

// التعريف النهائي للرد اللي جاي من الـ API
export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: {
    _id: string;
    cartOwner: string;
    products: CartItem[];
    totalCartPrice: number;
  };
}