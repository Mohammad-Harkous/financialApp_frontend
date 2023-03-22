import React from "react";

import {Body,Title,TableContainer} from "../components/TransactionComponenets"
import Transactions from "../components/Transaction";
function Trans(){
return(
    <>
    <Body>
    <Title> Transactions</Title>
    <TableContainer>
    <Transactions/>
    </TableContainer>
    </Body>

    </>
)
}



export default Trans
