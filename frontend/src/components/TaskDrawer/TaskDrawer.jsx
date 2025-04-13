import "./TaskDrawer.scss";
import { Drawer, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAddTaskMutation, useUpdateTaskMutation } from "../../api/tasksApi";
import { useGetAllBoardsQuery } from "../../api/boardsApi";
import { useGetAllUsersQuery } from "../../api/usersApi";
import { createHandleChange } from "../../utils/formHelpers";
import {
  PrioritySelect,
  StatusSelect,
  AssigneeSelect,
  BoardSelect,
} from "./TaskSelects";
import {
  STATUSES,
  PRIORITIES,
  getUsersOptions,
  getBoardsOptions,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";

export const TaskDrawer = ({
  open,
  onClose,
  initialTask = null,
  defaultBoardId = null,
}) => {
  const isEditMode = Boolean(initialTask);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    boardId: defaultBoardId || "",
    priority: "Medium",
    status: "To Do",
    assigneeId: "",
  });

  const {
    data: boardsData = [],
    isLoading: loadingBoards,
    isError: errorBoards,
  } = useGetAllBoardsQuery();
  const {
    data: usersData = [],
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useGetAllUsersQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const isLoading = loadingBoards || loadingUsers;
  const isError = errorBoards || errorUsers;

  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title,
        description: initialTask.description,
        boardId: initialTask.boardId || defaultBoardId || "",
        priority: initialTask.priority,
        status: initialTask.status,
        assigneeId: initialTask.assignee?.id || "",
      });
    } else {
      setFormData((prev) => ({ ...prev, boardId: defaultBoardId || "" }));
    }
  }, [initialTask, defaultBoardId]);

  const handleChange = createHandleChange(setFormData);

  const handleSubmit = async () => {
    if (isEditMode) {
      await updateTask({ id: initialTask.id, updatedTask: formData });
    } else {
      await addTask(formData);
    }
    onClose();
  };

  const handleNavigateToBoard = () => {
    if (initialTask?.boardId) {
      navigate(`/board/${initialTask.boardId}`);
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="taskDrawer">
        <Typography variant="h6" gutterBottom>
          {isEditMode ? "Редактировать задачу" : "Создать задачу"}
        </Typography>

        <TextField
          fullWidth
          label="Название"
          value={formData.title}
          onChange={handleChange("title")}
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          fullWidth
          label="Описание"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange("description")}
          sx={{ marginBottom: "16px" }}
        />

        <PrioritySelect
          value={formData.priority}
          onChange={handleChange("priority")}
          options={PRIORITIES}
        />

        {isEditMode && (
          <StatusSelect
            value={formData.status}
            onChange={handleChange("status")}
            options={STATUSES}
          />
        )}

        <AssigneeSelect
          value={formData.assigneeId}
          onChange={handleChange("assigneeId")}
          users={getUsersOptions(usersData.data)}
        />

        <BoardSelect
          value={formData.boardId}
          onChange={handleChange("boardId")}
          boards={getBoardsOptions(boardsData.data)}
          disabled={Boolean(defaultBoardId)}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isEditMode ? "Сохранить" : "Создать"}
        </Button>

        {isEditMode && initialTask?.boardId && (
          <Button
            variant="outlined"
            onClick={handleNavigateToBoard}
            sx={{ marginLeft: "20px" }}
          >
            Перейти на доску
          </Button>
        )}
      </div>
    </Drawer>
  );
};
