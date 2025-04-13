import { useState } from "react";
import { Button } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { useGetAllTasksQuery } from "../../api/tasksApi";
import { TaskFilters } from "../../components/TaskFilters/TaskFilters";
import {
  filterTasks,
  getUniqueBoards,
  getUniqueStatuses,
} from "../../utils/helpers";

export const Issues = () => {
  const { data: tasks = [], isLoading, isError } = useGetAllTasksQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterBoard, setFilterBoard] = useState("");

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;

  const filteredTasks = filterTasks(tasks.data, {
    searchQuery,
    filterStatus,
    filterBoard,
  });

  const uniqueBoards = getUniqueBoards(tasks.data);
  const uniqueStatuses = getUniqueStatuses(tasks.data);

  const resetFilters = () => {
    setSearchQuery("");
    setFilterStatus("");
    setFilterBoard("");
  };

  return (
    <div>
      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterBoard={filterBoard}
        setFilterBoard={setFilterBoard}
        uniqueBoards={uniqueBoards}
        uniqueStatuses={uniqueStatuses}
        resetFilters={resetFilters}
      />

      <ul className="issues__list">
        <li>
          { filteredTasks.length > 0 ? filteredTasks.map((task) => (
            <Card key={task.id} id={task.id} task={task} />
          )) : <div>Ничего не найдено</div>}
        </li>
      </ul>

      <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
        Добавить задачу
      </Button>
    </div>
  );
};
