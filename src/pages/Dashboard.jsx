import React, { useEffect, useState } from "react";
import arrow from "../assets/arrow.svg";
import axios from "axios";
import Chart from "../components/chart.jsx";
import Circle from "../components/goalChart.jsx";

import {
  Body,
  Wrapper,
  Result,
  Card,
  Resultcontainer,
  Resultlabel,
  CardContainer,
  CardTitle,
  TransContainer,
  TransHeader,
  Link,
  Arrow,
  TransCard,
  TransTitle,
  TransPrice,
  Section,
  ChartContainer,
  GoalCotainer,
  Goal,
  GoalTitle,
  Dates,
  Datecon,
} from "../components/dashboardComponents.js";
function DashBoard() {
  const [trans, setTrans] = useState([]);
  const [total, setTotal] = useState([]);
  const [goal, setgoal] = useState([]);

  var token = sessionStorage.getItem("token");

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/transaction/total", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTotal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/transaction/first", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTrans(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const resp = await axios.get("http://127.0.0.1:8000/api/goal/active", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(resp.data);
        setgoal(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    sendGetRequest()
  }, []);

  return (
    <>
      <Body>
        <Section>
          <CardContainer>
            <Card style={{ backgroundColor: "#304DAF" }}>
              <CardTitle>Lifetime Total</CardTitle>$ {total.total}
            </Card>
            <Card style={{ backgroundColor: "#FFFFFF", color: "#304DAF" }}>
              <CardTitle style={{ color: "#6D7D93" }}> Total Income</CardTitle>${" "}
              {total.income}
            </Card>
            <Card style={{ backgroundColor: "#FFFFFF", color: "#304DAF" }}>
              <CardTitle style={{ color: "#6D7D93" }}>Total Expense</CardTitle>${" "}
              {total.expense}
            </Card>
          </CardContainer>

          <TransContainer>
            <TransHeader>
              Recent
              <Link to="/transactions">
                View More
                <Arrow src={arrow} />
              </Link>
            </TransHeader>

            {trans.map((trans) => (
              <TransCard key={trans.id}>
                <TransTitle>{trans.title}</TransTitle>
                <TransPrice
                  style={
                    trans.type_of_transaction === "income"
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  ${trans.amount.toLocaleString()}
                </TransPrice>
              </TransCard>
            ))}
          </TransContainer>
        </Section>
        <ChartContainer>
          <Chart />
        </ChartContainer>
        <GoalCotainer>
          <Goal>
            <GoalTitle>{goal.title}</GoalTitle>
            <Datecon>
              <Dates>{goal.start}</Dates>
              <Dates>{goal.end}</Dates>
            </Datecon>
            <Resultcontainer>
              <Wrapper>
                <Resultlabel>Expense: </Resultlabel>
                <Result>$ {goal.expense}</Result>
              </Wrapper>
              <Wrapper>
                <Resultlabel>Income: </Resultlabel>
                <Result style={{ color: "#00E396" }}>$ {goal.income}</Result>
              </Wrapper>
            </Resultcontainer>
            <Resultcontainer>
              <Wrapper>
                <Resultlabel>Process: </Resultlabel>
                <Result>$ {goal.target}</Result>
              </Wrapper>
              <Wrapper>
                <Resultlabel>Total: </Resultlabel>
                <Result style={{ color: "#00E396" }}>$ {goal.total}</Result>
              </Wrapper>
            </Resultcontainer>
          </Goal>
          <Circle percent={goal.percent} />
        </GoalCotainer>
      </Body>
    </>
  );
}
export default DashBoard;
