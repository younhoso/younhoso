import ReviewList from "./components/ReviewList"
import items from './mock.json';

function App() {
  return (
    <div className="App">
      {
        items.map((item, id) => {
          return (
            <ReviewList key={id} id={0} title={item.title} imgUrl={""} rating={0} content={""} createdAt={0} updatedAt={0} />
          )
        })
      }
    </div>
  )
}

export default App
