import Button from '@mui/material/Button';

import React from 'react'

function CustomButton({type,customSx,name, handleOpen}) {
  return (
    <Button variant={type} sx={customSx} onClick={handleOpen}> {name} </Button>
  )
}

export default CustomButton;