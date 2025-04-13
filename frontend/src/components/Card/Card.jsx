import { Link } from "react-router-dom";
import "./Card.scss";

export const Card = ({ id, name }) => {
  return (
    <div className="card">
      <span className="card__name">{name}</span>
      <Link to={`/boards/${id}`} className="card__link">
        Перейти к доске →
      </Link>
    </div>
  );
};
