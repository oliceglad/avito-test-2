import { Link, useLocation } from "react-router-dom";
import "./Card.scss";

export const Card = ({ id, name, onClick, task }) => {
  const location = useLocation();
  const isBoardsPage = location.pathname.startsWith("/boards");

  return (
    <div className="card" onClick={onClick}>
      <span className="card__name">{name || task?.title}</span>

      {task && (
        <>
          <div className="card__meta">
            <span className="card__status">Статус: {task.status}</span>
            <span className="card__priority">Приоритет: {task.priority}</span>
          </div>
          <div className="card__assignee">
            <img
              src={task.assignee.avatarUrl}
              alt={task.assignee.fullName}
              className="card__avatar"
            />
            <span>{task.assignee.fullName}</span>
          </div>
        </>
      )}

      {isBoardsPage && !task && (
        <Link to={`/board/${id}`} className="card__link">
          Перейти к доске →
        </Link>
      )}
    </div>
  );
};
