import React from "react";
import DataTable from "../components/Recurring";
import {Body,Title,TableContainer} from "../components/TransactionComponenets"
function Recurring(){
return(
    <>
    <Body>
    <Title>Recurring Transactions</Title>
    <TableContainer>
    <DataTable/>
    </TableContainer>
    </Body>

    </>
)
}



export default Recurring
