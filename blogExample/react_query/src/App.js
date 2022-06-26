
import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { apis } from "./api";
 
function App() {
  const day_input = useRef("");
  const time_input = useRef("");
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery("all", apis.get, {
    staleTime: 10000
  });
  const {mutate} = useMutation(apis.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("all");
      day_input.current.value = "";
      time_input.current.value = "";
    }
  });
  console.log(data)
  return (
    <div className="App">
      {
      isLoading ||
      data.data?.slice(0, 100).map((el, idx)=>{
        return (
          <li key={idx}>
            <div>{el.title}</div>
            <div>{el.body}</div>
          </li>
        );
      })
      }
      <div>
        <input ref={day_input}/>
        <input ref={time_input} />
        <button onClick={() => {
            const data = {
              title: day_input.current.value,
              body : time_input.current.value
            }
            mutate(data);
        }}>데이터 추가하기</button>
      </div>
    </div>
  );
}

export default App;
