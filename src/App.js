import { Route, BrowserRouter, Routes, NavLink,Outlet } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard.jsx";
import LoginForm from "./pages/login.jsx";
import Reports from "./pages/Reports";
import Recurring from "./pages/Rec";
import Users from "./pages/Users.jsx";
import SidebarLayout from "./components/SidebarLayout.jsx";
import NotLoggedin from "./pages/notLoggedin.jsx";
import { useState, useEffect } from "react";


function App() {
//  let auth = sessionStorage.getItem('token')
const [token,setToken]=useState(null)

useEffect(()=>{
  const checkToken = sessionStorage.getItem("token");
  setToken(checkToken);
  
  },[])
  return (
    <>
      <BrowserRouter>
      
        <Routes>
        
        <Route element={token?<SidebarLayout />:<NotLoggedin/>}>
        

            <Route path="/dashboard" element={<Dashboard/> } />
            <Route   path="/transactions"  element={<Recurring/>} />
            <Route path="/reports" element={Reports} />
            <Route path="/users"  element={<Users/>}/>
          </Route>

          <Route path="/" exact element={<LoginForm setToken={setToken}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
