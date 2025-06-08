import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BoardVM, StatusVM } from "../../../entities/board/model.ts";

interface AppState {
  currentBoard: BoardVM | null;
}

const initialState: AppState = {
  currentBoard: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<BoardVM>) => {
      state.currentBoard = action.payload;
    },
    setStatuses: (state, action: PayloadAction<StatusVM[]>) => {
      if (!state.currentBoard) return;

      state.currentBoard.statuses = action.payload;
    },
    // addStatus: (state, action: PayloadAction<{ name: string }>) => {
    //   if (state.currentBoardId === null) return;
    //
    //   let statuses = state.currentBoards.find(
    //     ({ id }) => id === state.currentBoardId,
    //   )?.statuses;
    //
    //   if (!statuses) return;
    //
    //   statuses = statuses.concat({
    //     name: action.payload.name,
    //     tasks: [],
    //   });
    // },
    // updateStatus: (
    //   state,
    //   action: PayloadAction<{ name: string; index: number }>,
    // ) => {
    //   state.currentBoard.statuses[action.payload.index].name =
    //     action.payload.name;
    // },
    // deleteStatus: (state, action: PayloadAction<{ index: number }>) => {
    //   state.currentBoard.statuses.splice(action.payload.index, 1);
    // },
    // addTask: (
    //   state,
    //   action: PayloadAction<{ name: string; index: number }>,
    // ) => {
    //   state.currentBoard.statuses[action.payload.index].tasks =
    //     state.currentBoard.statuses[action.payload.index].tasks.concat({
    //       name: action.payload.name,
    //       description: "newTaskDesc",
    //     });
    // },
  },
});

export const { setBoard, setStatuses } = appSlice.actions;

export const selectBoard = (state: { app: AppState }) => state.app.currentBoard;

export default appSlice.reducer;
