import Box from "@mui/material/Box";
// import { blue } from "@mui/material/colors";
// import CustomizedTabs from "../components/Taps";
import DataTable from "../components/DataTableRec.jsx";
import DataTable1 from "../components/DataTableTransaction.jsx";
import LinkTap from "../components/tapRout.jsx";
// import TabsRouter from "../components/Taps";
// import BasicTabs from "../components/Taps";



function RecTransaction() {
  return (
    <div>
     
            {/* first box for the header */}
      <Box sx={{ width: "83%", marginLeft: "15%" }}>
      {/* <LinkTap/> */}
        <header
          style={{
            fontWeight: 700,
            fontSize: 30,
            padding: "3vh",
            // borderBottom: "1px rgba(48,77,175, 0.2) solid",
            color: '#2962ff',
            display:'flex',
            justifyContent: "center"
          }}
        >
          Recurrence Transaction
        </header>
     
        {/* <NavTabs  sx={{marginButtom: "25%" ,marginTop: 0}}  /> */}
          
        <DataTable  />
      </Box>
    </div>
  );
}

export default RecTransaction;
