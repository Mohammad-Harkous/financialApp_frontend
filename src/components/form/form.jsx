import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import "./form/form.css"
function MyForm() {
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form...", {
      status,
      title,
      amount,
      start_date,
      end_date,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#304DAF",
      }}>
      {/* Parent box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backfaceVisibility: "1ss0",
          p: 3,
          borderRadius: 2,
          backgroundColor: "white",
          minWidth: "300px",
          maxWidth: "600px",
        }}>
        <form onSubmit={handleSubmit}>
          {/* Goal input */}
          <InputLabel
            htmlFor="outlined-adornment-amount"
            sx={{ fontWeight: "bold" }}>
            Goal
          </InputLabel>
          <TextField
            required
            fullWidth
            margin="dense"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">$</InputAdornment>,
            }}
          />

          {/* Type input */}
          <InputLabel id="demo-simple-select-label" sx={{ fontWeight: "bold" }}>
            Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
            margin="dense">
            <MenuItem value={"expenses"}>Expenses</MenuItem>
            <MenuItem value={"income"}>Income</MenuItem>
          </Select>

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
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          {/* Date input */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel
              htmlFor="outlined-adornment-amount"
              sx={{ fontWeight: "bold" }}>
              {/* Start Date */}
            </InputLabel>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                // label="Start Date"
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

export default MyForm;
