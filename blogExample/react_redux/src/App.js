import { useSelector, useDispatch } from "react-redux";
import { changeName } from "./modules/cat";

function App() {
  const cat = useSelector(state => state.cat);
  const dispatch = useDispatch();

  const handel = () => {
    dispatch(changeName("고양이 이름!!"))
  }

  return (
    <div className="App">
      <p>name: {cat.name}</p>
      <button onClick={handel}>이름 바꾸기</button>
    </div>
  );
}

export default App;
