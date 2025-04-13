import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import "./Card.scss";

export const Card = ({ id, name, onClick, task }) => {
  const location = useLocation();
  const isBoardsPage = location.pathname.startsWith("/boards");
  const isTaskPage = location.pathname.startsWith("/issues");

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className="card"
      ref={!isTaskPage ? drag : null}
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
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
        <Link to={`/board/${id}`} state={{ name: name }} className="card__link">
          Перейти к доске →
        </Link>
      )}
    </div>
  );
};
