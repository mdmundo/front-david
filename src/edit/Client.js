import { useState, forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Message from "../common/Message";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateDialog = ({
  data,
  setData,
  open,
  setOpen,
  axios,
  updateURL,
  updateId,
  updateItem,
}) => {
  const [clicked, setClicked] = useState(false);

  const [resultOpen, setResultOpen] = useState(false);
  const [updatedSuccessfully, setDeletedSuccessfully] = useState(false);

  const handleUpdateConfirm = () => {
    setClicked(true);

    const refresh = data.map((el) => el.id !== updateId);

    axios
      .put(updateURL, { installments: refresh })
      .then((data) => {
        console.log("🚀 ~ file: Installment.js ~ line 37 ~ .then ~ data", data);
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
          updateItem;
          console.log(
            "🚀 ~ file: Client.js ~ line 72 ~ updateItem",
            updateItem
          );
          setOpen(false);
        }}
        TransitionComponent={Transition}
      >
        <DialogTitle>Editar Registro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "Para atualizar o registro faça as modificações e confirme. Se algum dado não está disponível para modificação, delete o registro e crie outro com dados diferentes."
            }
          </DialogContentText>
          <TextField label="Email Address" fullWidth />
          <TextField label="Email Address" fullWidth />
          <TextField label="Email Address" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdateConfirm}
            disabled={clicked}
            color="secondary"
          >
            {clicked ? "Aguarde..." : "Confirmar"}
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
          message: updatedSuccessfully
            ? "Registro atualizado com sucesso✅"
            : "Não foi possível atualizar o registro❌",
        }}
      />
    </>
  );
};

export { UpdateDialog as default };
