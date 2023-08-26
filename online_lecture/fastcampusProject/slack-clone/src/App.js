import { Route, Routes } from 'react-router-dom';
import './App.css';
import Join from './pages/Join'
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  );
}

export default App;
