import {api} from "./api/getProductData.js";
import ProductList from "./component/ProductList.js";
import CartList from "./component/CartList.js";
// 이 곳에 정답 코드를 작성해주세요.

const $productGrid = document.querySelector('#product-card-grid');
const $openCartBtn = document.querySelector('#open-cart-btn');
const $closeCartBtn = document.querySelector('#close-cart-btn');
const $shoppingCart = document.querySelector('#shopping-cart');
const $backdrop = document.querySelector('#backdrop');
const $cartList = document.querySelector('#cart-list');

let productData = [];

const productList = new ProductList($productGrid, []);
const cartList = new CartList($cartList, []);

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backdrop.hidden = !$backdrop.hidden
};

const feachProductData = async () => {
  const result = await api.getProductData();
  productList.setState(result);
  productData = result;
};

const addCartItem = (e) => {
  // 상품 장바구니에 추가하기
  // 어떤 상품이 추가되었는가?
  const clickProduct = productData.find(product => product.id === Number(e.target.dataset.productid));
  if(!clickProduct) return;
  cartList.addCartItem(clickProduct);
  toggleCart();
};

const removeCartItem = (e) => {
  if(e.target.className === 'remove-btn'){
    const currentProductId = parseInt(e.target.closest('li').id)
    cartList.removeCartItem(currentProductId);
  }
};

feachProductData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productGrid.addEventListener('click', addCartItem);
$cartList.addEventListener('click', removeCartItem);