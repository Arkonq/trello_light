import { Box, Container, Divider, Typography } from "@mui/material";
import AddButton from "../entities/board/components/AddButton.tsx";
import Status from "../entities/board/components/status/Status.tsx";
import { useDispatch, useSelector } from "react-redux";
import { addStatus, selectBoard } from "../app/store/slices/appSlice.ts";

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);

  const statusesStyle = {
    display: "flex",
    gap: 1.5,
    width: 1,
    alignItems: "flex-start",
    mt: 1.5,
  };

  const handleAddStatus = (name: string) => {
    dispatch(addStatus({ name }));
  };

  return (
    <Container>
      <Typography variant={"h3"}>{board.name}</Typography>
      <Divider />
      <Box sx={statusesStyle}>
        {board.statuses.map((status, index) => (
          <Status key={index} status={status} index={index} />
        ))}
        <AddButton handleAdd={handleAddStatus} title={"Add new status"} />
      </Box>
    </Container>
  );
};

export default Board;
