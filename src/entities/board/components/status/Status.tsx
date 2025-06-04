import { Card, Divider, TextField, Typography } from "@mui/material";
import { type FC, useState } from "react";
import type { StatusVM } from "../../model";
import Task from "../task/Task";
import AddButton from "../AddButton.tsx";

interface StatusProps {
  status: StatusVM;
  index: number;
  handleAddTask: (name: string, index: number) => void;
  handleUpdateStatus: (name: string, index: number) => void;
}

const Status: FC<StatusProps> = ({
  status,
  index,
  handleAddTask,
  handleUpdateStatus,
}) => {
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
        <Typography variant={"h5"} align={"left"} onClick={handleNameClick}>
          {status.name}
        </Typography>
      )}
      <Divider />
      {status.tasks.map((task, index) => (
        <Task task={task} key={index} />
      ))}
      <AddButton
        title={"Add task"}
        handleAdd={(name) => handleAddTask(name, index)}
      />
    </Card>
  );
};

export default Status;
