import BasicModal from '../components/BasicModal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../components/TopBar';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const styleBox = {
  ml:42, 
  mr:5,
  
};


function Users() {
  let token =sessionStorage.getItem('token')
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchUsers = async () => {
    try{
    const result = await axios.get('http://127.0.0.1:8000/api/users',{headers: { Authorization: `Bearer ${token}`} });
      setData(result.data);
    
    }catch(error){
      console.log(error);
    }
  }




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const notifySucess = () => {
   
    toast.success('User Successfully Deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }


  const notifyError = () => {
   
    toast.error('User did not deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

}

 

  const onDelete = async (id) =>{

     try{
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`,{headers: { Authorization: `Bearer ${token}`} })
     
        notifySucess();
        fetchUsers();
    }catch (error) {
      notifyError();
      console.error(`Error deleting User${id}: ${error}`);
      
    }

  }

  return (
    <Box sx={styleBox}>
      <TopBar />
      <Paper variant="outlined" >
      <BasicModal />
      </Paper>
      <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{pl:7}}>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{pl:7}}>{user.id}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              
              <TableCell>
                <IconButton onClick={() => onDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[3, 5, 9]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onPageChangeRowsPerPage={handleChangeRowsPerPage}
        sx={{mr:141}}
      />
    </TableContainer>
    <ToastContainer />
    </Box>
  );
 
}

export default Users;


