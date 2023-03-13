import { useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CustomButton from './CustomButton';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));



function BasicModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name:'',
    email:'',
    password:'',
    is_admin: false
  });
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();
  
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData,{
        headers:{
          'Content-Type': 'application/json'
        }
      });
  
      // handle successful response
      console.log(response.data)
     
    } catch (error) {
      // handle error
      console.log(error);
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
        <IconButton sx={{ml:45}}>
          <CloseIcon onClick={handleClose}/> 
        </IconButton>
        <form onSubmit={handleSubmit} >
        <label>Full Name</label>
        <TextField type ="text" name='full_name'  label="Full Name" fullWidth margin="normal" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}/>

        <label htmlFor="Email">Email</label>
        <TextField type ="text" name='email' label="Email" fullWidth margin="normal" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>

        <label htmlFor="Password">Password</label>
        <TextField type ="password" name='password'  label="Password" fullWidth margin="normal" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>

         {/* <label htmlFor="is_admin">IsAdmin</label>
        <TextField  type="checkbox" label="IsAdmin" fullWidth margin="normal" checked={formData.is_admin} 
         onChange={(e) => setFormData({ ...formData, is_admin: e.target.value })}/>  */}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;