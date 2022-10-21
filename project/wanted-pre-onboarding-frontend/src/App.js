import { useEffect, useState } from "react";
import Router from "./Router";
import { apis } from "./store/api";

function App() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleLoad = async () => {
    try {
      if(localStorage.getItem('accessToken')){
        const {data} = await apis.getTodos();
		    setItems(data);
      }
    } catch(error){
      console.log(error)
    }
	};

	useEffect(() => {
		handleLoad();
	},[]);

  return (
    <div className="App">
      <Router items={items} setItems={setItems} editingId={editingId} setEditingId={setEditingId}/>
    </div>
  );
}

export default App;
