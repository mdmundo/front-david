import { useState, forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Message from "./Message";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RemoveDialog = ({
  deleteMessage,
  data,
  setData,
  open,
  setOpen,
  axios,
  removeURL,
  removeId,
}) => {
  const [clicked, setClicked] = useState(false);

  const [resultOpen, setResultOpen] = useState(false);
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);

  const handleDeleteConfirm = () => {
    setClicked(true);
    axios
      .delete(removeURL)
      .then(() => {
        const refresh = data.filter((el) => el.id !== removeId);
        setData(refresh);
        setOpen(false);
        setClicked(false);

        setDeletedSuccessfully(true);
        setResultOpen(true);
      })
      .catch((e) => {
        setOpen(false);
        setClicked(false);

        setDeletedSuccessfully(false);
        setResultOpen(true);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        TransitionComponent={Transition}
      >
        <DialogTitle>Excluir Registro</DialogTitle>
        <DialogContent>
          <DialogContentText>{deleteMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteConfirm}
            disabled={clicked}
            color="secondary"
          >
            {clicked ? "Aguarde..." : "Deletar"}
          </Button>
          <Button
            autoFocus
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Message
        {...{
          open: resultOpen,
          setOpen: setResultOpen,
          message: deletedSuccessfully
            ? "Registro removido com sucesso✅"
            : "Não foi possível remover o registro❌",
        }}
      />
    </>
  );
};

export { RemoveDialog as default };
