import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import {
  BackLinkLayout,
  CardLayout,
  FullLayout,
  LandingLayout,
  PublicLayout,
  UserLayout,
} from './components/Layout';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import SettingPage from './pages/SettingPage';
import AvatarEditPage from './pages/AvatarEditPage';

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route element={<CardLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route element={<UserLayout />}>
            <Route path="me" element={<MyPage />} />
          </Route>
          <Route element={<BackLinkLayout />}>
            <Route path="me/edit" element={<SettingPage />} />
          </Route>
          <Route element={<FullLayout />}>
            <Route path="me/avatar/edit" element={<AvatarEditPage />} />
          </Route>
          <Route element={<PublicLayout />}>
            <Route path=":userId" element={<UserPage />} />
          </Route>
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;
