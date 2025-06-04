import { Card, Typography } from "@mui/material";
import { type FC, useState } from "react";
import type { TaskVM } from "../../model";
import TaskDetails from "./TaskDetails.tsx";

interface TaskProps {
  task: TaskVM;
}

const Task: FC<TaskProps> = ({ task }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Card
        sx={{ p: 1, "&:hover": { cursor: "pointer" } }}
        onClick={() => setIsOpenModal(true)}
      >
        <Typography variant={"h6"}>{task.name}</Typography>
      </Card>
      <TaskDetails
        task={task}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  );
};

export default Task;
