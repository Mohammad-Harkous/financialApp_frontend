import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  InputLabel,
  
  
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

function AddGoal() {
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset form fields
    setStatus("");
    setTitle("");
    setAmount("");
    setStart_date(null);
    setEnd_date(null);

    // Reset form state (optional)
    event.target.reset();

    console.log("Submitting form...", {
      status,
      title,
      amount,
      start_date,
      end_date,
    });

    console.log("sra ", start_date.$d);

    // Convert start_date and end_date to JSON format

    const body = {
      status:'disabled',
      title,
      amount,
      start_date: start_date ? start_date.$d.toJSON() : null,
      end_date: end_date ? end_date.$d.toJSON() : null,
    };

    // Make POST request using Axios

    axios
      .post("http://127.0.0.1:8000/api/goal", body)
      .then((response) => {
        console.log("rrr ", response);

        // console.log(response.data);

        // Do something with response data
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
        height: "100vh",
        bgcolor: "#F8F9FD",
      }}>
      {/* Parent box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft : "12%",
          alignItems: "center",
          backfaceVisibility: "1ss0",
          p: 3,
          border: "2px solid ",
          borderRadius:3,
          
          backgroundColor: "white",
          minWidth: "300px",
          maxWidth: "600px",
        }}>
        <form onSubmit={handleSubmit}>
          {/* Goal input */}
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ fontWeight: "bold" }}>
            Goal Title
          </InputLabel>
          <TextField
            required
            fullWidth
            margin="dense"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            
          />

         

          {/* Amount input */}
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ fontWeight: "bold" }}>
            Amount
          </InputLabel>
          <TextField
            required
            fullWidth
            margin="dense"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">$</InputAdornment>
              ),
            }}
          />

          {/* Date input */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel
              htmlFor="outlined-adornment-amount"
              sx={{ fontWeight: "bold" }}>
              Start Date
            </InputLabel>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Start Date"
                value={start_date}
                onChange={(newValue) => {
                  setStart_date(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel
              htmlFor="outlined-adornment-amount"
              sx={{ fontWeight: "bold" }}>
              End Date
            </InputLabel>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="End Date"
                value={end_date}
                onChange={(newValue) => {
                  setEnd_date(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
              marginLeft: "90px",
            }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default AddGoal;
