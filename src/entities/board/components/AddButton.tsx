import { AddOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { type FC, useState } from "react";

interface AddButtonProps {
  title: string;
  handleAdd: (name: string) => void;
}

const AddButton: FC<AddButtonProps> = ({ handleAdd, title }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Dialog
        open={isOpenModal}
        onClose={handleCloseModal}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const name =
                typeof formJson.name === "string" ? formJson.name : "";

              handleAdd(name);
              handleCloseModal();
            },
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
      <Button
        startIcon={<AddOutlined />}
        variant={"outlined"}
        onClick={handleOpenModal}
      >
        {title}
      </Button>
    </>
  );
};

export default AddButton;
