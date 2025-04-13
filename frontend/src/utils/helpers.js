export const getUniqueBoards = (tasks) => {
  return [...new Set(tasks.map((t) => t.boardName))];
};

export const getUniqueStatuses = (tasks) => {
  return [...new Set(tasks.map((t) => t.status))];
};

export const filterTasks = (
  tasks,
  { searchQuery, filterStatus, filterBoard }
) => {
  return tasks.filter((task) => {
    const title = task.title?.toLowerCase() || "";
    const assigneeName = task.assignee?.fullName?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    const matchesQuery = title.includes(query) || assigneeName.includes(query);
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    const matchesBoard = filterBoard ? task.boardName === filterBoard : true;

    return matchesQuery && matchesStatus && matchesBoard;
  });
};
