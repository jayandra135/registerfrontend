import "./App.css";
import HeaderComp from "./components/HeaderComp";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableComp from "./components/TableComp";
function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComp />
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/user-list" element={<TableComp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
