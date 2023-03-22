import React, { useState, useEffect } from "react";
import { Box, TextField, Button ,MenuItem,InputAdornment, CircularProgress,} from "@mui/material";
import {DataGrid, gridClasses, GridToolbar} from "@mui/x-data-grid";
import Grid from '@mui/material/Grid';
import { green, grey } from "@mui/material/colors";
import { Fab } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import { Body } from "./dashboardComponents";

import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {Delete as DeleteIcon, Edit as EditIcon,Save as SaveIcon} from "@mui/icons-material";
import { Stack } from "@mui/system";



export default function DataTable() {
  var token=sessionStorage.getItem('token')
  console.log(token)
  // The selectedInfo object is used to store the data of the row that is currently selected in the grid.
  const [selectedInfo, setSelectedInfo] = useState({});
  // The isUpdateMode boolean is used to track whether the user is currently in update mode or not.
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  
  const [selectedCatagory ,setSelectedCatagory ] = useState('')
  const [alldata, setAllData] = useState([]);
  const [catagori, setCatagori] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  // newData object which is used to store the data for a new row that is to be added to the grid.
  const [newData, setNewData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "$",
    type_of_transaction: "",
    start_date: "",
    end_date: "",
    user_id: "",
    category_id: "",
    D_O_T: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const[rowId,setRowId]= useState(null)
  
  const timer = React.useRef();


  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
 
  }, []);



  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const catagoryURL = "http://127.0.0.1:8000/api/category";


  const catagoryData = async () => {
    try {
      const response = await axios.get( catagoryURL ,{headers: { Authorization: `Bearer ${token}` }});
      console.log("fetch cat", response.data);
      setCatagori(response.data);
    } catch (error) {
      console.error(error);

    }
  };




  const apiURL = "http://127.0.0.1:8000/api/recurrence";
  const fetchallData = async () => {
    try {
      const response = await axios.get(apiURL, {headers: { Authorization: `Bearer ${token}` }});
      console.log("fetch data successfully ", response.data);
      setAllData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  let data =JSON.stringify({
    title: newData.title,
    description: newData.description,
    amount: newData.amount,
    type_of_transaction: newData.type_of_transaction,
    start_date: newData.start_date,
    end_date: newData.end_date,
    user_id: newData.user_id,
    currency: "$",
    category_id: "1",
    
    
  })
  console.log("data ",data)

  const addreccurentTransaction = async () => {
    try {
      await axios.post(apiURL,data,{ headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },},);
    
      toast.success("Added Successfully", { autoClose: 2000 });
      fetchallData();
      setNewData({
        title: "",
        description: "",
        amount: "",
        currency: "$",
        type_of_transaction: "",
        start_date: "",
        end_date: "",
        user_id: "",
        category_id: "",
        D_O_T: "",
      });
      console.log(newData);

    } catch (error) {
      console.error(error);
      toast.error("Add Failed", { autoClose: 1000 });
    }
  };

  const deleteUser = async (id) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
 
    axios.delete(`http://localhost:8000/api/recurrence/${id}`, {headers: { Authorization: `Bearer ${token}` }});
    toast.success("Deleted Successfully", 1000);
    setSuccess(true);
    setLoading(false);
  }, 1000);
}

    fetchallData();
 
}

//  useEffect(()=>{
//     if (rowId ===  params.id && success) setSuccess(false)
//   },{rowId})



  const handleUpdate = async (id, field, value) => {
    const updatedData = alldata.map((row) => {
      if (row.id === id) {
        console.log("row ", row);
        return { ...row, [field]: value };
      }
      return row;
    });

    // console.log("updated data ", updatedData);

    try {
      const response = await axios.patch(
        `${apiURL}/${id}`,{headers: { Authorization: `Bearer ${token}` }},
        {
          title: selectedInfo.title,
          description: selectedInfo.description,
          amount: selectedInfo.amount,
          type_of_transaction: selectedInfo.type_of_transaction,
          start_date: selectedInfo.start_date,
          end_date: selectedInfo.end_date,
          user_id: selectedInfo.user_id,
          category_id: "1",
          
        }
      );
      console.log("Updated Successfully ", response);
      setAllData(response.data);
      // setAllData(data)
      setIsUpdateMode(false);
      setSelectedInfo({});
   
      window.location.reload();
      toast.success("Updated Successfully", 3000);
     
    } catch (error) {
      console.error(error);
      toast.error("Update Failed", 1000);
    }
    window.location.reload();
  };

  useEffect(() => {
    fetchallData();
  }, []);


  //****************colomns************************************ */
  const columns =
    [
      {
        field: "id",
        headerName: "ID",
        width: 90,
         minWidth: 60,
         maxWidth: 90,
         align: "center",
          flex:1,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "title",
        headerName: "Title",
        align: "center",

        flex: 3,
        headerClassName: "super-app-theme--header",

        valueGetter: (params) => params.row.title,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              // fullWidth
              variant="standard"
              value={selectedInfo.title || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  title: e.target.value,
                })
              }
            />
          ) : (
            <div>{params.row.title}</div>
          ),
      },

      {
        field: "description",
        headerName: "Description",
        flex: 3,
        headerClassName: "super-app-theme--header",
        align: "center",


        valueGetter: (params) => params.row.description,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              // fullWidth
              variant="standard"
              value={selectedInfo.description || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  description: e.target.value,
                })
              }
            />
          ) : (
            <div>{params.row.description}</div>
          ),
      },
      {
        field: "amount",
        headerName: "amount",
        // type: "number",
        align: "center",

        flex: 3,
        // cellClassName: "super-app-theme--header",
        headerClassName: "super-app-theme--header",

        valueGetter: (params) => params.row.amount,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              // fullWidth
              variant="standard"
              value={selectedInfo.amount || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  amount: e.target.value,
                })
              }
            />
          ) : (
            <div>{params.row.amount}</div>
          ),
      },
      {
        field: "currency",
        headerName: "currency",
        flex: 2,
        align: "center",

        // editable: false,
        headerClassName: "super-app-theme--header",

        valueGetter: (params) => params.row.currency,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              // fullWidth
              variant="standard"
              value={selectedInfo.currency || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  currency: e.target.value,
                })
              }
            />
          ) : (
            <div>{params.row.currency}</div>
          ),
          
      },
      {
        field: "type_of_transaction",
        headerName: "type_of_transaction",
        flex: 3,
        align: "center",

        headerClassName: "super-app-theme--header",
        type: "singleSelect",
        valueOptions: ["income", "expense"],

        valueGetter: (params) => params.row.type_of_transaction,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              // fullWidth
              variant="standard"
              value={selectedInfo.type_of_transaction || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  type_of_transaction: e.target.value,
                })
              }
               
           
              
            />
          
          ) : (
            <div>{params.row.type_of_transaction}</div>
          ),
      },
      {
        field: "start_date",
        headerName: "start_date",
        align: "center",

        flex: 4,
        headerClassName: "super-app-theme--header",

        // cellClassName: "super-app-theme--header",
        valueGetter: (params) => params.row.start_date,
        renderCell: (params) => 
        // moment(params.row.start_date).format('YYYY-MM-DD HH-MM-SS') 
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              // fullWidth
              variant="standard"
              value={selectedInfo.start_date || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  start_date: e.target.value,
                })
              }
            />
          ) : (
            <div>{params.row.start_date}</div>
          ),
      },
      {
        field: "end_date",
        headerName: "End date",
        flex: 4,
        align: "center",

        type: 'dateTime',
        valueGetter: ({ value }) => value && new Date(value),
        headerClassName: "super-app-theme--header",

        // cellClassName: "super-app-theme--header",
        // valueGetter: (params) => params.row.end_date,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              fullWidth
              variant="standard"
              value={selectedInfo.end_date || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  end_date: e.target.value,
                })
              }
            />
          ) : (
            <div>{params.row.end_date}</div>
          ),
      },
      {
        field: "user_id",
        headerName: "User",
        headerClassName: "super-app-theme--header",
        align: "center",

        flex: 2,
        // cellClassName: "super-app-theme--header",
        valueGetter: (params) => params.row.end_date,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              // fullWidth
              variant="standard"
              value={selectedInfo.user_id || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  user_id: e.target.value,
                })
              }
            />
          ) : (
            <div>{params.row.user_id}</div>
          ),
      },
      {
        field: "Category",
        headerName: "Category",
        headerClassName: "super-app-theme--header",
        // align: "center",

        flex: 3,
        // cellClassName: "super-app-theme--header",
        valueGetter: (params) => params.row.category_id,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
            autoFocus
            select
            fullWidth
              variant="standard"
              value={selectedInfo.category_id || ""}
              // onChange={(e) =>
              //   setSelectedInfo({
              //     ...selectedInfo,
              //     category_id: e.target.value,
              //   })
              // }
              // selectedValue ={selectedCatagory}
              onValueChange={(itemValue,itemIndex) => setSelectedCatagory(itemValue)}
   >
    {catagori.map((catagory) => (<MenuItem sx={{width:'100%'}} key ={catagory.id} label = {catagory.label} value={catagory.value}>{catagory.id}</MenuItem>))}
    
   

            </TextField>

          ) : (
            <div>{params.row.category_id}</div>
          ),
      },


      // {
      //   field: "D_O_T",
      //   headerName: "D_O_T",
      //   headerClassName: "super-app-theme--header",
      //   align: "center",

      //   flex: 4,
      //   // cellClassName: "MuiDataGrid-cell--editable",
      //   valueGetter: (params) => params.row.D_O_T,
      //   renderCell: (params) =>
      //     isUpdateMode && selectedInfo.id === params.row.id ? (
      //       <TextField
      //         // fullWidth
      //         variant="standard"
      //         value={selectedInfo.D_O_T || ""}
      //         onChange={(e) =>
      //           setSelectedInfo({
      //             ...selectedInfo,
      //             D_O_T: e.target.value,
      //           })
      //         }
      //       />
      //     ) : (
      //       <div>{params.row.D_O_T}</div>
      //     ),
      // },

      //************************colomn of action (edit,delete , save cancle )******************************************** */
      {
        field: "edit",
        headerName: "Edit",
        headerClassName: "super-app-theme--header",
        align: "center",
     
        flex: 3,
        sortable: false,
        // width:400,
        disableColumnMenu: true,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <div style={{ marginInline: "3px" }}>
              <Fab 
                //  ml={3}
                size="small"
                color="primary"
                onClick={() => {
                  handleUpdate(
                    params.row.id,

                    "title" ||
                      "description" ||
                      "amount" ||
                      "currency" ||
                      "type_of_transaction" ||
                      "start_date" ||
                      "end_date" ||
                      "user_id" ||
                      "category_id" ||
                      "D_O_T",

                    selectedInfo.title ||
                      selectedInfo.description ||
                      selectedInfo.amount ||
                      selectedInfo.currency ||
                      selectedInfo.type_of_transaction ||
                      selectedInfo.start_date ||
                      selectedInfo.end_date ||
                      selectedInfo.user_id ||
                      selectedInfo.category_id ||
                      selectedInfo.D_O_T
                  );
                  setIsUpdateMode(false);
                }}
                // disabled = {params.id !== rowId || loading  }

              >
                <SaveIcon />
              </Fab>
              <Fab
                size="small"
                color="primary"
                variant="contained"
                onClick={() => setIsUpdateMode(false)}
                sx={{ marginLeft: "6px" }}
              >
                {" "}
                <ClearOutlinedIcon />
              </Fab>
            </div>
          ) : (
            <Fab
              size="small"
              color="primary"
              onClick={() => {
                setSelectedInfo(params.row);
                setIsUpdateMode(true);
              }}
            >
              <EditIcon />
            </Fab>
          ),
      },

      {
        field: "delete",
        headerName: "Delete",
        headerClassName: "super-app-theme--header",
        align: "center",
        // width: 75,
        flex: 2,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <Box sx={{ m: 1, position: 'relative' }}>
          <Fab
             sx={buttonSx}
            size="small"
            color="primary"
            onClick={() => deleteUser(params.row.id)}
            // disabled = {params.id !== rowId || loading  }

          >
                 
            <DeleteIcon sx={{ ml: "3" }} />
            
          </Fab>

   

          {loading && (
          <CircularProgress
            size={50}
            sx={{
              color: 'primary',
              position: 'absolute',
              top: -5,
              left: -5,
              zIndex: 1,
            }}
          />
        )}
          </Box>

          
          
        ),
        
      },
      
    ];
  //  , []
  // );
  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);


  // useEffect(()=>{
  //   if (rowId ===  params.id && success) setSuccess(false)
  // },{rowId})
  

  /************************return**************************************/
  return (
 
    <Box
      sx={{
        "& .super-app-theme--header": {
          backgroundColor: "rgb(136,185,236)",
          color: "darkblue",
          
          // align: 'center',
        },
        "& .MuiDataGrid-cell--editable": {
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#376331" : "rgb(217 243 190)",
        },
        "& .button": {
        //   display: 'inlineBlock' ,
        //   padding: '12px 28px' ,
          margin: '10px',
        //   fontSize: '10px',
        //   fontWeight: 'bold',
        //   textTransform: 'uppercase',
          color: '#2962ff',
          backgroundImage: 'linearGradient (to bottom right, #00c6ff, #0072ff)',
        //   border: 'none',
        //   borderRadius: '10px',
          boxShadow: '4px 4px 0px #0072ff',
        //   transition: 'all 0.2s ease-in-out'
        }
      }}
    >
    {/* <Box mt={2} display={isOpen ? "block" : "none"}> */}
    <Button  className = "button" variant="outlined" onClick={handleOpen} sx={{mb:'20px'}}>
    New Transaction
    </Button> 
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {
          // backgroundColor: 'transparent',
          // boxShadow: 'none',
          border: "2px solid #2962ff",
          borderRadius: "20px",
          padding: "20px",
        },
      }}
    >
      <DialogTitle>Add  Transaction </DialogTitle>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
            id="filled-helperText"
            label="Title"
            type="text"
            fullWidth
            variant="filled"
            value={newData.title}
            onChange={(e) => setNewData({ ...newData, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
            id="filled-helperText"
            label="description"
            type="text"
            fullWidth
            variant="filled"
            value={newData.description}
            onChange={(e) => setNewData({ ...newData, description: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
            id="filled-helperText"
            label="Amount"
            type="number"
            fullWidth
            variant="filled"
            value={newData.amount}
            onChange={(e) => setNewData({ ...newData, amount: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
          // id="outlined-select-currency"
          autoFocus
          variant="filled"
          // labelId="demo-simple-select-label"
          id="filled-helperText"
          select
          label="Type"
          // helperText="Please select your currency"
          value={newData.type_of_transaction}
            onChange={(e) => setNewData({ ...newData, type_of_transaction: e.target.value })}
            fullWidth
            margin="dense">
          
            <MenuItem value={"expense"}>expense</MenuItem>
            <MenuItem value={"income"}>income</MenuItem>
        </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
            id="filled-helperText"
            label="Start Date"
            type="dateTime"
            fullWidth
            variant="filled"
            value={newData.start_date}
            onChange={(e) => setNewData({ ...newData, start_date: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
            id="filled-helperText"
            label="End Date"
            type="dateTime"
            fullWidth
            variant="filled"
            value={newData.end_date}
            onChange={(e) => setNewData({ ...newData, end_date: e.target.value })}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
          
            id="filled-helperText"
            // helperText="D_O_T"
            label="D_O_T"
            type="dateTime"
            fullWidth
            variant="filled"
            value={newData.D_O_T}
            onChange={(e) => setNewData({ ...newData, D_O_T: e.target.value })}
          />
        </Grid> */}
        <Grid item xs={6}>
          <TextField
            
            margin="dense"
            id="filled-helperText"
            label="User Id"
            type="text"
            fullWidth
            variant="filled"
            value={newData.user_id}
            onChange={(e) => setNewData({ ...newData, user_id: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
            id="filled-helperText"
            label="Category"
            type="text"
            fullWidth
            variant="filled"
            value={newData.catagory}
            onChange={(e) => setNewData({ ...newData, category: e.target.value })}
          />
        </Grid>
 
      </Grid>


      <DialogActions>
        <Button onClick={addreccurentTransaction}>Add</Button>
        <Button  onClick={() => setIsOpen(false)}>cancel</Button>
      </DialogActions>
    </Dialog>
 
  {/* </Box> */}
      <Stack direction="column" width="100%" >
      

        <DataGrid
          rows={alldata}
          columns={columns}
          autoHeight
          fullWidth
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          p={1}
          getRowSpacing={getRowSpacing}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
            // [`& .${gridClasses.cell}`]: {
            //   bgcolor: (theme) =>
            //     theme.palette.mode === "light" ? grey[200] : grey[900],
            // },
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}

          slots={{
            toolbar: GridToolbar,
          }}
          onCellEditCommit = {params=> setRowId(params.id)}
        />
      </Stack>
      <ToastContainer />
    </Box>

  );
}
