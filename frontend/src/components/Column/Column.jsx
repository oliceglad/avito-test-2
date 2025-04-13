import React from "react";
import { useDrop } from "react-dnd";
import { Card } from "../Card/Card";

export const Column = ({ title, tasks, onDrop, status, onTaskClick }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`column ${isOver ? "over" : ""}`}
      style={{ width: "30%", marginRight: "1%" }}
    >
      <h2>{title}</h2>
      <div>
        {tasks.map((task) => (
          <div key={task.id} onClick={() => onTaskClick(task)}>
            <Card task={task} id={task.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
