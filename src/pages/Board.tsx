import {
  Box,
  Container,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AddButton from "../entities/board/components/AddButton.tsx";
import Status from "../entities/board/components/status/Status.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useGetBoardsQuery, useGetStatusesQuery } from "../app/api/mainApi.ts";
import { useEffect } from "react";
import {
  selectBoard,
  setBoard,
  setStatuses,
} from "../app/store/slices/appSlice.ts";

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);

  const { data: boardsData } = useGetBoardsQuery();
  const { data: statusesData } = useGetStatusesQuery(
    { boardId: boardsData ? boardsData[0].id! : 0 },
    { skip: !boardsData || !boardsData?.length },
  );

  useEffect(() => {
    if (!boardsData || !statusesData) return;

    dispatch(setBoard(boardsData[0]));
    dispatch(setStatuses(statusesData));
  }, [statusesData]);

  const statusesStyle = {
    display: "flex",
    gap: 1.5,
    width: 1,
    alignItems: "flex-start",
    mt: 1.5,
  };

  const handleAddStatus = (name: string) => {
    // dispatch(addStatus({ name }));
  };

  const handleAddBoard = (name: string) => {
    // dispatch(addBoard({ name }));
  };

  if (!board || !board.statuses) return <></>;

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Select>
          {boardsData?.map((board) => (
            <MenuItem value={board.id}>{board.name}</MenuItem>
          ))}
        </Select>
        <Typography variant={"h3"}>{board.name}</Typography>
        <AddButton handleAdd={handleAddBoard} title={"Add new board"} />
      </Box>
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
