import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputAdornment,
  InputLabel,
  LinearProgress,
} from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
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
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { Stack } from "@mui/system";

export default function Expence() {
  // The selectedInfo object is used to store the data of the row that is currently selected in the grid.
  const [selectedInfo, setSelectedInfo] = useState({});
  // The isUpdateMode boolean is used to track whether the user is currently in update mode or not.
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  //
  const [alldata, setAllData] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
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

  
  const apiURL = "http://127.0.0.1:8000/api/transaction/expense";
  const fetchallData = async () => {
    try {
      const response = await axios.get(apiURL, {});
      console.log("fetch data successfully ", response.data);
      setAllData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //****************colomns************************************ */
  const columns = [
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
      field: "start_date",
      headerName: "start_date",

      flex: 3,
      headerClassName: "super-app-theme--header",

      // cellClassName: "super-app-theme--header",
      valueGetter: (params) => params.row.start_date,
      renderCell: (params) =>
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
      headerName: "end_date",
      flex: 3,
      type: "dateTime",
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
      {/* </Box> */}
      <Stack direction="column" width="100%">
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
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          // initialState={{
          //   pagination: {
          //     paginationModel: { pageSize: 7, page: 0 },
          //   },
          // }}
          pageSizeOptions={[5, 10, 25]}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Stack>
      {/* <ToastContainer /> */}
    </Box>
  );
}
