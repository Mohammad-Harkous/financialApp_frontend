import BasicModal from '../components/BasicModal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../components/TopBar';
import Box from '@mui/material/Box';




function Users() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchUsers = async () => {
    try{
    const result = await axios.get('http://127.0.0.1:8000/api/users');
      setData(result.data);
     console.log(result.data);
    }catch(error){
      console.log(error);
    }
  }


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  function onEdit(){}

  const onDelete = async (id) =>{

     try{
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
        console.log(`User ${id} has been deleted`);
        fetchUsers();
    }catch (error) {
      console.error(`Error deleting User${id}: ${error}`);
    }

  }

  return (
    <Box sx={{ml:40, mt:3}}>
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
                <IconButton onClick={() => onEdit(user.id)}>
                  <EditIcon />
                </IconButton>
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
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        sx={{mr:141}}
      />
    </TableContainer>
    </Box>
  );
 
}

export default Users;


