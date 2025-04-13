
export const STATUSES = ["Backlog", "InProgress", "Done"];

export const PRIORITIES = ["Low", "Medium", "High"];

export const getUsersOptions = (usersData) =>
  usersData.map((user) => ({
    value: user.id,
    label: user.fullName,
  }));

export const getBoardsOptions = (boardsData) =>
  boardsData.map((board) => ({
    value: board.id,
    label: board.name,
  }));
