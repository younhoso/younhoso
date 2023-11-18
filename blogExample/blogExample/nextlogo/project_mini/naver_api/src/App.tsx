import { useEffect, useState } from "react";
import { apis } from "./api"
import { initData, initCategory } from "./types";

const init : initData = {
  "startDate": "2017-08-01",
  "endDate": "2017-09-30",
  "timeUnit": "month",
  "category": [
    { "name": "패션의류", "param": ["50000000"] },
    { "name": "화장품/미용", "param": ["50000002"] }
  ],
  "device": "pc",
  "ages": ["20", "30"],
  "gender": "f"
}

function App() {
  const [initDatas, setInitDatas] = useState([]);
  const handleLoad = async () => {
    let result;
    try {
      result = await apis.postShoppingData(init);
    } catch(error) {
      console.log(error)
    } finally {
      
    }
    const {results} = result?.data;
    setInitDatas(results)
    console.log(results)
  }

  useEffect(() => {
    handleLoad();
  },[])

  return (
    <div className="App">
      {initDatas.map((el: initCategory, index)=> (
        <div key={index}>
          <div>{el.title}</div>
          {el.data.map((item, index) => (
            <div key={index}>
              <h2>Task: {item.period}</h2>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App;
