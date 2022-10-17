import ReviewList from "./components/ReviewList"
import items from './mock.json';

export interface IReview {
  id: number,
  title: string,
  imgUrl: string,
  rating: number,
  content: string
  createdAt: number,
  updatedAt: number
}

function App() {
  return (
    <div className="App">
      <ReviewList items={items}/>
    </div>
  )
}

export default App
