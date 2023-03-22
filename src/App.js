import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import ProfitGoal from "./components/profitGoal"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/a" element={<ProfitGoal />} />
    </Routes>
  );
}

export default App;
