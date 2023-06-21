import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Layout from "./modules/Layout";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          width: 200,
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 20,
        }}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="list">List</NavLink>
        <NavLink to="add">Add</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/list" element={<>List</>} />
        <Route path="/add" element={<>Add</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
