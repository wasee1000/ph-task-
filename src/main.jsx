import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/Main/Main';
import Homepage from './components/Home/Home/Home';
import AuthProviders from './components/Provider/Authproviders';
import NotFound404 from './components/Not/NotFound404';
import Login from './components/Login/login';
import Register from './components/Register/Register';
import Events from './components/Events';
import AddEvent from './components/AddEvent';
import MyEvents from './components/MyEvents';
// import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/events',
        element: (
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-event',
        element: (
          <PrivateRoute>
            <AddEvent />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-events',
        element: (
          <PrivateRoute>
            <MyEvents />
          </PrivateRoute>
        ),
      },
      { path: '*', element: <NotFound404 /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProviders>
  </StrictMode>
);