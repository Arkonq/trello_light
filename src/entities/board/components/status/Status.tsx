import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { type FC, useState } from "react";
import type { StatusVM } from "../../model";
import Task from "../task/Task";
import AddButton from "../AddButton.tsx";
import { DeleteOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  addTask,
  deleteStatus,
  updateStatus,
} from "../../../../app/store/slices/appSlice.ts";

interface StatusProps {
  status: StatusVM;
  index: number;
}

const Status: FC<StatusProps> = ({ status, index }) => {
  const dispatch = useDispatch();
  const [isEditName, setIsEditName] = useState(false);
  const [name, setName] = useState("");

  const statusStyle = {
    width: 200,
    p: 1,
    display: "flex",
    flexDirection: "column",
    gap: 1,
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdateStatus(name, index);
      setIsEditName(false);
    }
  };

  const handleNameClick = () => {
    setIsEditName(true);
    setName(status.name);
  };

  const handleUpdateStatus = (name: string, index: number) => {
    dispatch(updateStatus({ name, index }));
  };

  const handleDeleteStatus = () => {
    dispatch(deleteStatus({ index }));
  };

  const handleAddTask = (name: string) => {
    dispatch(addTask({ name, index }));
  };

  return (
    <Card sx={statusStyle}>
      {isEditName ? (
        <TextField
          key={status.name}
          defaultValue={status.name}
          autoFocus
          onFocus={(e) => e.target.select()}
          onBlur={() => setIsEditName(false)}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={"h5"} align={"left"} onClick={handleNameClick}>
            {status.name}
          </Typography>
          <Button onClick={handleDeleteStatus}>
            <DeleteOutlined />
          </Button>
        </Box>
      )}
      <Divider />
      {status.tasks.map((task, index) => (
        <Task task={task} key={index} />
      ))}
      <AddButton title={"Add task"} handleAdd={handleAddTask} />
    </Card>
  );
};

export default Status;
