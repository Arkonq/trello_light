import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BoardVM } from "../../../entities/board/model.ts";

interface AppState {
  board: BoardVM;
}

const initialState: AppState = {
  board: {
    name: "boardName",
    statuses: [
      {
        name: "statusName",
        tasks: [{ name: "taskName", description: "taskDesc" }],
      },
    ],
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addStatus: (state, action: PayloadAction<{ name: string }>) => {
      state.board = {
        ...state.board,
        statuses: state.board.statuses.concat({
          name: action.payload.name,
          tasks: [],
        }),
      };
    },
    updateStatus: (
      state,
      action: PayloadAction<{ name: string; index: number }>,
    ) => {
      state.board.statuses[action.payload.index].name = action.payload.name;
    },
    deleteStatus: (state, action: PayloadAction<{ index: number }>) => {
      state.board.statuses.splice(action.payload.index, 1);
    },
    addTask: (
      state,
      action: PayloadAction<{ name: string; index: number }>,
    ) => {
      state.board.statuses[action.payload.index].tasks = state.board.statuses[
        action.payload.index
      ].tasks.concat({
        name: action.payload.name,
        description: "newTaskDesc",
      });
    },
  },
});

export const { addStatus, updateStatus, addTask, deleteStatus } =
  appSlice.actions;

export const selectBoard = (state: { app: AppState }) => state.app.board;

export default appSlice.reducer;
