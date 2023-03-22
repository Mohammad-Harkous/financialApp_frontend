import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{
          style: {
            // backgroundColor: 'transparent',
            // boxShadow: 'none',
            border: '1px solid blue' ,
            borderRadius:'20px',
            padding:'20px',
          

          },
        }}>
        <DialogTitle>Add Transaction </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your details below. We
            will send updates occasionally.
          </DialogContentText> */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id=""
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                // value={newData.title}
                // onChange={(e) => setNewData({ ...newData, title: e.target.value })}
              />

            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone Number"
                type="tel"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="address1"
                label="Address Line 1"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="address2"
                label="Address Line 2"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="city"
                label="City"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="state"
                label="State/Province"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
