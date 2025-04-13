import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetBoardByIdQuery } from "../../api/boardsApi";
import { useUpdateStatusTaskMutation } from "../../api/tasksApi";
import { Column } from "../../components/Column/Column";
import { TaskDrawer } from "../../components/TaskDrawer/TaskDrawer";

export const Board = () => {
  const { id } = useParams();
  const location = useLocation();
  const boardName = location.state?.name;

  const [updateStatusTask] = useUpdateStatusTaskMutation();
  const { data: boardData, isLoading, isError } = useGetBoardByIdQuery(id);

  const [tasksByStatus, setTasksByStatus] = useState({
    Backlog: [],
    InProgress: [],
    Done: [],
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (boardData) {
      const groupedTasks = {
        Backlog: [],
        InProgress: [],
        Done: [],
      };
      boardData.data.forEach((task) => {
        groupedTasks[task.status]?.push(task);
      });
      setTasksByStatus(groupedTasks);
    }
  }, [boardData]);

  const handleOpenEdit = (task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedTask(null);
  };

  const handleDrop = (taskId, newStatus) => {
    const allTasks = [
      ...tasksByStatus["Backlog"],
      ...tasksByStatus["InProgress"],
      ...tasksByStatus["Done"],
    ];
    const updatedTask = allTasks.find((task) => task.id === taskId);

    if (!updatedTask || updatedTask.status === newStatus) return;

    const updatedStatusTask = { ...updatedTask, status: newStatus };
    updateStatusTask({ id: taskId, updatedStatusTask });

    setTasksByStatus((prev) => {
      const newTasks = { ...prev };
      newTasks[updatedTask.status] = newTasks[updatedTask.status].filter(
        (task) => task.id !== taskId
      );
      newTasks[newStatus] = [...newTasks[newStatus], updatedStatusTask];
      return newTasks;
    });
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки доски</div>;

  return (
    <div className="board">
      <h1>{boardName}</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
        {Object.entries(tasksByStatus).map(([status, tasks]) => (
          <Column
            key={status}
            title={status}
            tasks={tasks}
            onDrop={handleDrop}
            status={status}
            onTaskClick={handleOpenEdit}
          />
        ))}
      </div>

      <TaskDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        initialTask={selectedTask}
        defaultBoardId={id}
      />
    </div>
  );
};
