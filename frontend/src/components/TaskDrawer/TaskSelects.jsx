import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const PrioritySelect = ({ value, onChange, options }) => (
  <FormControl fullWidth sx={{marginBottom: "16px"}}>
    <InputLabel>Приоритет</InputLabel>
    <Select value={value} onChange={onChange} label="Приоритет">
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const StatusSelect = ({ value, onChange, options }) => (
  <FormControl fullWidth sx={{marginBottom: "16px"}}>
    <InputLabel>Статус</InputLabel>
    <Select value={value} onChange={onChange} label="Статус">
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const AssigneeSelect = ({ value, onChange, users }) => (
  <FormControl fullWidth sx={{marginBottom: "16px"}}>
    <InputLabel>Исполнитель</InputLabel>
    <Select value={value} onChange={onChange} label="Исполнитель">
      {users.map((user) => (
        <MenuItem key={user.value} value={user.value}>
          {user.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const BoardSelect = ({ value, onChange, boards, disabled }) => (
  <FormControl fullWidth sx={{marginBottom: "16px"}} disabled={disabled}>
    <InputLabel>Проект</InputLabel>
    <Select value={value} onChange={onChange} label="Проект">
      {boards.map((board) => (
        <MenuItem key={board.value} value={board.value}>
          {board.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
