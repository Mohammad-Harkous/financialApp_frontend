import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function TopBar() {
  return (
    <>
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{p:2}}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Users
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default TopBar;