import {api} from "./api/getProductData.js";
import ProductList from "./component/ProductList.js"
// 이 곳에 정답 코드를 작성해주세요.

const $productGrid = document.querySelector('#product-card-grid');

const productList = new ProductList($productGrid,[])

const feachProductData = async () => {
  const result = await api.getProductData();
  productList.setState(result);
};

feachProductData();