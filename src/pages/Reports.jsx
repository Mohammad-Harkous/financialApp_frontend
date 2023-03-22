import React from "react";
import {
  Bodys,
  ChartCon,
  Title,
  TitleCon,
  Selector,
} from "../components/ReportComponents";
import RepChart from "../components/ReportChart";
import Reptable from "../components/ReportsTable.jsx"
import { useState, useEffect } from "react";
function Reports() {
  const getInitialState = () => {
    const value = "2023";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Bodys>
        <TitleCon>
          <Title>Yearly Reports</Title>
          <div>
            <Selector value={value} onChange={handleChange}>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </Selector>
          </div>
        </TitleCon>

        <ChartCon>
          <RepChart value={value} />
        </ChartCon>
        <Reptable value={value}/>
      </Bodys>
    </>
  );
}

export default Reports;
