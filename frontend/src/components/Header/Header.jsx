import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Header.scss";

export const Header = ({ onOpenTaskDrawer }) => {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__buttons">
          <NavLink
            to="/issues"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Все задачи
          </NavLink>
          <NavLink
            to="/boards"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Проекты
          </NavLink>
        </div>
        <Button
          variant="contained"
          onClick={() => onOpenTaskDrawer()}
        >
          Создать задачу
        </Button>
      </nav>
    </header>
  );
};
