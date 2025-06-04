import { Box, Container, Divider, Typography } from "@mui/material";
import Status from "../entities/board/components/Status";
import { useState } from "react";
import type { BoardVM } from "../entities/board/model.ts";
import AddButton from "../entities/board/components/AddButton.tsx";

const BOARD_INITIAL: BoardVM = {
  name: "boardName",
  statuses: [
    {
      name: "statusName",
      tasks: [{ name: "taskName", description: "taskDesc" }],
    },
  ],
};

const Board = () => {
  const [board, setBoard] = useState<BoardVM>(BOARD_INITIAL);

  const statusesStyle = {
    display: "flex",
    gap: 1.5,
    width: 1,
    alignItems: "flex-start",
    mt: 1.5,
  };

  const handleAddStatus = (name: string) => {
    setBoard((prev) => ({
      ...prev,
      statuses: prev.statuses.concat({ name, tasks: [] }),
    }));
  };

  const handleUpdateStatus = (name: string, index: number) => {
    const newBoard = structuredClone(board);
    newBoard.statuses[index].name = name;

    setBoard(newBoard);
  };

  const handleAddTask = (name: string, index: number) => {
    const newBoard = structuredClone(board);
    newBoard.statuses[index].tasks = newBoard.statuses[index].tasks.concat({
      name,
      description: "newTaskDesc",
    });

    setBoard(newBoard);
  };

  return (
    <Container>
      <Typography variant={"h3"}>{board.name}</Typography>
      <Divider />
      <Box sx={statusesStyle}>
        {board.statuses.map((status, index) => (
          <Status
            key={index}
            status={status}
            index={index}
            handleAddTask={handleAddTask}
            handleUpdateStatus={handleUpdateStatus}
          />
        ))}
        <AddButton handleAdd={handleAddStatus} title={"Add new status"} />
      </Box>
    </Container>
  );
};

export default Board;
