import {
  TextField,
  Button,
  Menu,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import "./TaskFilters.scss";

export const TaskFilters = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  filterBoard,
  setFilterBoard,
  uniqueStatuses,
  uniqueBoards,
  resetFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="taskFilters">
      <TextField
        label="Поиск"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleFilterClick}>
        Фильтр
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleFilterClose}
        PaperProps={{
          style: {
            width: 300,
          },
        }}
      >
        <MenuItem disableRipple>
          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Статус"
            >
              <MenuItem value="">Все</MenuItem>
              {uniqueStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem disableRipple>
          <FormControl fullWidth>
            <InputLabel>Доска</InputLabel>
            <Select
              value={filterBoard}
              onChange={(e) => setFilterBoard(e.target.value)}
              label="Доска"
            >
              <MenuItem value="">Все</MenuItem>
              {uniqueBoards.map((board) => (
                <MenuItem key={board} value={board}>
                  {board}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem disableRipple>
          <Button variant="outlined" onClick={resetFilters}>
            Сбросить
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};
