// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'
// // import {
// //   createBrowserRouter,
// //   RouterProvider,
// // } from "react-router-dom";
// // import Main from './components/Main/Main.jsx';
// // import Homepage from './components/Home/Home/Home.jsx';

// // const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element:<Main></Main>,
// //     children: [
// //       {
// //         path: "/",
// //         element: <Homepage/>,
// //   },
// // ]);

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //      <AuthProviders>


// //      <RouterProvider router={router} />
// //      </AuthProviders>

// //   </StrictMode>,
// // )



// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Main from './components/Main/Main.jsx';
// import Homepage from './components/Home/Home/Home.jsx';
// import AuthProviders from './components/Provider/Authproviders.jsx';
// import NotFound404 from './components/Not/NotFound404.jsx';
// import Login from './components/Login/login.jsx';
// import Register from './components/Register/Register.jsx';
// // import AuthProviders from './Provider/AuthProviders'; // ✅ IMPORTED HERE


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     children: [
//       {
//         path: "/",
//         element: <Homepage />,
//       },{
//         path: "/login"  ,
//         element: <Login/>,
//       },{
//         path: "/register",
//         element: <Register/>,
//       },
//       {
//     path: "*",
//     element: <NotFound404 />,
//   },
//     ],
//   },
// ]);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProviders >
//       <RouterProvider router={router} />
//     </AuthProviders>
//   </StrictMode>,
// )

 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Main from './components/Main/Main.jsx';
import Homepage from './components/Home/Home/Home.jsx';
import AuthProviders from './components/Provider/Authproviders.jsx';
import NotFound404 from './components/Not/NotFound404.jsx';
import Login from './components/Login/login.jsx';
import Register from './components/Register/Register.jsx';
import Events from './components/Events.jsx';
import AddEvent from './components/AddEvent.jsx';
import MyEvents from './components/MyEvents.jsx';
import { useContext } from 'react';
import { AuthContext } from './components/Provider/Authproviders.jsx';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        Loading...
      </div>
    );
  }
  return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
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
      {
        path: '*',
        element: <NotFound404 />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </StrictMode>
);
