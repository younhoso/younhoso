import { Route, Routes } from 'react-router-dom';
import PostPage from "./pages/PostPage";
import PostListPage from "./pages/PostListPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<PostListPage />} exact={true} />
			<Route path="/:id" element={<PostPage/>} />
		</Routes>
	)
}
export default App;