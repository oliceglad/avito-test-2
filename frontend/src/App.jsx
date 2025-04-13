import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Main } from "./pages/Main/Main";
import { Board } from "./pages/Board/Board";
import { Issues } from "./pages/Issues/Issues";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/boards" Component={Main} />
          <Route path="/board/:id" Component={Board} />
          <Route path="/issues" Component={Issues} />
          <Route path="*" element={<Navigate to="/boards" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
