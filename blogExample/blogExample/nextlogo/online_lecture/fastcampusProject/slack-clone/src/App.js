import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Join from './pages/Join'
import Login from './pages/Login';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './store/useReducer';
import { CircularProgress, Stack } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const {isLoading, currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if(!!user){
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  },[dispatch]);

  console.log(isLoading)
  if(isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress color="secondary" size={150} />
      </Stack>
    )
  }

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Main /> : <Navigate to="/login" />} />
      <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
      <Route path="/join" element={currentUser ? <Navigate to="/" /> : <Join />} />
    </Routes>
  );
}

export default App;
