import { useSelector, useDispatch } from "react-redux";
import { changeName } from "./modules/catSlice";
import { getProducts } from "./modules/api";
import { useCallback, useEffect, useState } from "react";
import ReviewList from "./ReviewList";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const cat = useSelector(state => state.cat);
  console.log(cat)
  const dispatch = useDispatch();
  const handel = () => {
    dispatch(changeName("Younhoso!!"))
  };

  const handleLoade = useCallback((options) => {
    try {
      setIsLoading(true);
      if(options.offset === 0){
        dispatch(getProducts(options));
      }
    } catch(error) {
      console.error('Failed to save the post: ', error)
    } finally {
      setIsLoading(false);
    }
  },[dispatch])

  useEffect(() => {
    handleLoade({order: "createdAt", offset: 0, limit: 6})
  },[])
  
  return (
    <div className="App">
      <p>name: {cat.name}</p>
      <button onClick={handel}>이름 바꾸기</button>
      <ReviewList items={cat.productList.reviews}></ReviewList>
      {isLoading && <div>로딩중</div>}
    </div>
  );
}

export default App;
