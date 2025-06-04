import { CloseOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import type { TaskVM } from "../../model.ts";

interface TaskDetailsProps {
  task: TaskVM;
  isOpenModal: boolean;
  setIsOpenModal: (v: boolean) => void;
}

const TaskDetails: FC<TaskDetailsProps> = ({
  task,
  isOpenModal,
  setIsOpenModal,
}) => {
  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <Dialog onClose={handleClose} open={isOpenModal} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>{task.name}</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseOutlined />
      </IconButton>
      <DialogContent>
        <Typography>{task.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button>Edit</Button>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetails;
