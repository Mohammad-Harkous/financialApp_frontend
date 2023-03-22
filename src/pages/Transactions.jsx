import Box from "@mui/material/Box";
import CustomizedTabs from "../components/Taps";
import DataTable from "../components/DataTableRec.jsx";

function Transaction() {
  return (
    <div>
      {/* first box for the header */}
      <Box sx={{ width: "83%", marginLeft: "15%" }}>
        <header
          style={{
            fontWeight: 700,
            fontSize: 30,
            padding: "5vh",
            borderBottom: "1px rgba(48,77,175, 0.2) solid",
          }}
        >
          Recurrence Transaction
        </header>
        <Box
          sx={{
            height: "auto",
            paddingBlock: "3vh",
          }}
        ></Box>
        <CustomizedTabs />

        <DataTable  />
      </Box>
    </div>
  );
}

export default Transaction;
