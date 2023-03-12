import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar.jsx'
const SidebarLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);


export default SidebarLayout