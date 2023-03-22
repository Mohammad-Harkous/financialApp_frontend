import { useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CustomButton from './CustomButton';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function BasicModal() {
  let token =sessionStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name:'',
    email:'',
    password:'',
    is_admin: false,
  });
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const notifySucess = () => {
   
    toast.success('User Successfully added!', {
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
   
      toast.error('User not added, Please try again', {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
  
      // handle successful response
      
      notifySucess();
      setFormData({
        full_name:'',
        email:'',
        password:'',
        is_admin: '',
      });
      
      handleClose();
      window.location.reload(true)

    
     
    } catch (error) {
      // handle error
      console.log(error);
      notifyError()
    }}


  return (
    <div>
      <CustomButton type={"contained"} name={'Add new user'} customSx={{mt:3, ml:7, mb:3, borderRadius:5}} handleOpen={handleOpen}/>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <IconButton sx={{ml:45}} onClick={handleClose}>
          <CloseIcon /> 
        </IconButton>
        <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <TextField type ="text" name='full_name'  label="Full Name" fullWidth margin="normal" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} required/>

        <label htmlFor="Email">Email</label>
        <TextField type ="text" name='email' label="Email" fullWidth margin="normal" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}  required/>

        <label htmlFor="Password">Password</label>
        <TextField type ="password" name='password'  label="Password" fullWidth margin="normal" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required/>

        <label htmlFor="is_admin">IsAdmin</label>
         <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} checked={formData.is_admin} 
         onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })}/>

        <Button variant="contained" color="primary" type="submit" sx={{mt:9, ml:5}}>
          Submit
        </Button>
        
      </form>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default BasicModal;