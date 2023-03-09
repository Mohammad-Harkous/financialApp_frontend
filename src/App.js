import { Route, Switch, BrowserRouter,Routes,Router} from "react-router-dom";
import './App.css';
import Dashboard from './pages/Dashboard.jsx'
import LoginForm from './pages/login.jsx'
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";

function App() {
  return (
   <>
   <BrowserRouter>
  
   
   <Routes>

    
   <Route path='/' exact element={<LoginForm/>} />
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path='/reports'  element={Reports} />

    <Route path='/Transaction'  element={Transactions} />
    
    <Route path="/users" element={Users}/>
    
  
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
