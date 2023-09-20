import {
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";

import Homepage from "./Pages/Homepage";
import { ThemeProvider } from 'styled-components'
import Globalstyles from './Globalstyles';
import Gallery from "./components/Gallery";
import Login from "./Pages/Login";
import { AuthContext } from "./components/context/AuthContext";

const theme = {
  colors:{
    footer:'#003333',
    body:'#fff'
  },
  font:{
    header:'Poppins',
    body:'Open sans'
  },
  mobile:'768px',
}
const Root = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Outlet />
    </>
  );
};

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/" element={<Root />}>
        <Route index element={<Homepage />} />
        
        <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
        
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );
  return (
    <ThemeProvider theme = {theme}>

    <>
    <RouterProvider router={router} />
    <Globalstyles />
    </>
    </ThemeProvider>
  )
}



export default App
