import React, { useState, useEffect } from "react";
import { Box, TextField, Button ,Select,MenuItem,InputAdornment,InputLabel,} from "@mui/material";
import {DataGrid, gridClasses, GridToolbar} from "@mui/x-data-grid";
import Grid from '@mui/material/Grid';
import { grey } from "@mui/material/colors";
import { Fab } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {Delete as DeleteIcon, Edit as EditIcon,Save as SaveIcon} from "@mui/icons-material";
import { Stack } from "@mui/system";

export default function Transactions() {
    let token = sessionStorage.getItem('token');
  // The selectedInfo object is used to store the data of the row that is currently selected in the grid.
  const [selectedInfo, setSelectedInfo] = useState({});
  // The isUpdateMode boolean is used to track whether the user is currently in update mode or not.
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  //
  const [alldata, setAllData] = useState([]);
  // newData object which is used to store the data for a new row that is to be added to the grid.
  const [newData, setNewData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "",
    type_of_transaction: "",
    start_date: "",
    end_date: "",
    user_id: "",
    category_id: "",
    D_O_T: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const apiURL = "http://127.0.0.1:8000/api/transaction";
  const fetchallData = async () => {
    try {
      const response = await axios.get(apiURL, {headers: { Authorization: `Bearer ${token}` }});
      console.log("fetch data successfully ", response.data);
      setAllData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTransaction = async () => {
    try {
      await axios.post(apiURL, {
        title: newData.title,
        description: newData.description,
        amount: newData.amount,
        type_of_transaction: newData.type_of_transaction,
        start_date: newData.start_date,
        end_date: newData.end_date,
        user_id: newData.user_id,
        category_id: newData.category_id,
        D_O_T: newData.D_O_T,
        
      });
      fetchallData();
      toast.success("Added Successfully", { autoClose: 2000 });
      setNewData({
        title: "",
        description: "",
        amount: "",
        currency: "",
        type_of_transaction: "",
        start_date: "",
        end_date: "",
        user_id: "",
        category_id: "",
        D_O_T: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Add Failed", { autoClose: 2000 });
    }
  };

  const deleteUser = async (id) => {
    axios.delete(`http://localhost:8000/api/transaction/${id}`, {headers: { Authorization: `Bearer ${token}` }});
    toast.success("Deleted Successfully", 2000);

    fetchallData();
  };

  const handleUpdate = async (id, field, value) => {
    const updatedData = alldata.map((row) => {
      if (row.id === id) {
        
        return { ...row, [field]: value };
      }
      return row;
    });

    

    try {
      // const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${apiURL}/${id}`,
        {
          title: selectedInfo.title,
          description: selectedInfo.description,
          amount: selectedInfo.amount,
          type_of_transaction: selectedInfo.type_of_transaction,
          start_date: selectedInfo.start_date,
          end_date: selectedInfo.end_date,
          user_id: selectedInfo.user_id,
          category_id: selectedInfo.category_id,
          D_O_T: selectedInfo.D_O_T,
        }

        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

     
      setAllData(response.data);
      setIsUpdateMode(false);
      setSelectedInfo({});
      toast.success("Updated Successfully", 2000);
    } catch (error) {
      console.error(error);
      toast.error("Update Failed", 2000);
    }
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
        // width: 90,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "title",
        headerName: "Title",
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
        type: "number",
        // flex: 3,
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
        flex: 3,
        editable: false,
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
        field: "user_id",
        headerName: "user_id",
        headerClassName: "super-app-theme--header",

        // flex: 3,
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
        field: "category_id",
        headerName: "category_id",
        headerClassName: "super-app-theme--header",

        // flex: 3,
        // cellClassName: "super-app-theme--header",
        valueGetter: (params) => params.row.category_id,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              // fullWidth
              variant="standard"
              value={selectedInfo.category_id || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  category_id: e.target.value,
                })
              }
            />
          ) : (
            <div>{params.row.category_id}</div>
          ),
      },
      {
        field: "D_O_T",
        headerName: "D_O_T",
        headerClassName: "super-app-theme--header",

        flex: 3,
        // cellClassName: "super-app-theme--header",
        valueGetter: (params) => params.row.D_O_T,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <TextField
              // fullWidth
              variant="standard"
              value={selectedInfo.D_O_T || ""}
              onChange={(e) =>
                setSelectedInfo({
                  ...selectedInfo,
                  D_O_T: e.target.value,
                })
              }
            />
          ) : (
            <div>{params.row.D_O_T}</div>
          ),
      },

      //************************colomn of action (edit,delete , save cancle )******************************************** */
      {
        field: "edit",
        headerName: "Edit",
        headerClassName: "super-app-theme--header",
        align: "center",
        width: 150,
        // flex: 1,
        sortable: false,
        // width:400,
        disableColumnMenu: true,
        renderCell: (params) =>
          isUpdateMode && selectedInfo.id === params.row.id ? (
            <div style={{ marginInline: "3px" }}>
              <Fab 
                 ml={3}
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
              >
                <SaveIcon />
              </Fab>
              <Fab
                size="small"
                color="primary"
                variant="contained"
                onClick={() => setIsUpdateMode(false)}
                sx={{ marginRight: "20px" }}
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
        width: 75,
        // flex: 1,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <Fab
            size="small"
            color="primary"
            onClick={() => deleteUser(params.row.id)}
          >
            <DeleteIcon sx={{ ml: "3" }} />
          </Fab>
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
  /************************return********************/
  return (
    <Box
      sx={{
        "& .super-app-theme--header": {
          backgroundColor: "rgb(136,185,236)",
        },
        "& .MuiDataGrid-cell--editable": {
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#376331" : "rgb(217 243 190)",
        },
      }}
    >
    {/* <Box mt={2} display={isOpen ? "block" : "none"}> */}
    <Button variant="outlined" onClick={handleOpen} sx={{mb:'20px'}}>
    New Transaction
    </Button> 
   
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {
          // backgroundColor: 'transparent',
          // boxShadow: 'none',
          border: "2px solid blue",
          borderRadius: "20px",
          padding: "20px",
        },
      }}
    >
      <DialogTitle>Add Transaction </DialogTitle>
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
              startAdornment: (
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
          labelId="demo-simple-select-label"
          id="filled-helperText"
          select
          label="Type"
          // helperText="Please select your currency"
          value={newData.type_of_transaction}
            onChange={(e) => setNewData({ ...newData, type_of_transaction: e.target.value })}
            fullWidth
            margin="dense">
          
            <MenuItem value={"expenses"}>Expenses</MenuItem>
            <MenuItem value={"income"}>Income</MenuItem>
        </TextField>
        </Grid>
       
        
        <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
          
            id="filled-helperText"
            // helperText="D_O_T"
            
            type="date"
            fullWidth
            variant="filled"
            value={newData.D_O_T}
            onChange={(e) => setNewData({ ...newData, D_O_T: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            margin="dense"
            id="filled-helperText"
            label="user_id"
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
            label="category_id"
            type="text"
            fullWidth
            variant="filled"
            value={newData.category_id}
            onChange={(e) => setNewData({ ...newData, category_id: e.target.value })}
          />
        </Grid>
 
      </Grid>

      <DialogActions>
        <Button onClick={addTransaction}>Add</Button>
        <Button  onClick={() => setIsOpen(false)}>cancel</Button>
      </DialogActions>
    </Dialog>
 
  {/* </Box> */}
      <Stack direction="column" width="100%" >

        <DataGrid
          rows={alldata}
          columns={columns}
          autoHeight={900}
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
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Stack>
      <ToastContainer />
    </Box>
  );
}
