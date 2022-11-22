import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyle';
import router from './Router';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
)
