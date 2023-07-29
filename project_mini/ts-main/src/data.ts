export enum Category {
  Food = "Food",
  Fashion = "Fashion",
  Device = "Device",
  All = "All",
}
const data = [
  {
    name: "파스타",
    price: 1,
    category: Category.Food,
  },
  {
    name: "감자튀김",
    price: 3,
    category: Category.Food,
  },
  {
    name: "떡볶이",
    price: 3,
    category: Category.Food,
  },
  {
    name: "마라탕",
    price: 3,
    category: Category.Food,
  },
  {
    name: "셔츠",
    price: 42,
    category: Category.Fashion,
  },
  {
    name: "잠옷",
    price: 20,
    category: Category.Fashion,
  },
  {
    name: "코트",
    price: 250,
    category: Category.Fashion,
  },
  {
    name: "롱패딩",
    price: 150,
    category: Category.Fashion,
  },
  {
    name: "슬랙스",
    price: 70,
    category: Category.Fashion,
  },
  {
    name: "Mac Mini",
    price: 999,
    category: Category.Device,
  },
  {
    name: "MacBook Pro",
    price: 1599,
    category: Category.Device,
  },
  {
    name: "iMac",
    price: 2999,
    category: Category.Device,
  },
];

export default data;
