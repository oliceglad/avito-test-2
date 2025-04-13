// App.jsx
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Main } from "./pages/Main/Main";
import { Board } from "./pages/Board/Board";
import { Issues } from "./pages/Issues/Issues";
import { Header } from "./components/Header/Header";
import { TaskDrawer } from "./components/TaskDrawer/TaskDrawer";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Header onOpenTaskDrawer={() => setIsTaskDrawerOpen(true)} />
          <Routes>
            <Route path="/boards" Component={Main} />
            <Route path="/board/:id" Component={Board} />
            <Route path="/issues" Component={Issues} />
            <Route path="*" element={<Navigate to="/boards" />} />
          </Routes>
          <TaskDrawer
            open={isTaskDrawerOpen}
            onClose={() => setIsTaskDrawerOpen(false)}
          />
        </BrowserRouter>
      </DndProvider>
    </>
  );
}

export default App;
