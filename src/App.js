import { Route, BrowserRouter, Routes, NavLink,Outlet } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard.jsx";
import LoginForm from "./pages/login.jsx";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import SidebarLayout from "./components/SidebarLayout.jsx";
import NotLoggedin from "./pages/notLoggedin.jsx";

function App() {
 let auth = sessionStorage.getItem('token')
  return (
    <>
      <BrowserRouter>
        <Routes>
        
          <Route element={auth?<SidebarLayout />:<NotLoggedin/>}>
            <Route   path="/transactions" element={Transactions} />

            <Route path="/dashboard" element={<Dashboard/> } />
            <Route path="/reports" element={Reports} />
            <Route path="/users" element={Users} />
          </Route>
          

          

          <Route path="/" exact element={<LoginForm/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
