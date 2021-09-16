import { useState, useEffect, forwardRef } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import Message from "../common/Message";
import { DateTimePicker } from "../common/DatePicker";

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

  const [paid, setPaid] = useState();
  const [date, setDate] = useState();
  const [record, setRecord] = useState();

  const handleUpdateConfirm = () => {
    setClicked(true);

    axios
      .put(updateURL, {
        installments: [...data, { id: updateId, paid, date, record }],
      })
      .then(({ data: { installments } }) => {
        setData(installments);
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

  useEffect(() => {
    if (updateItem) {
      setPaid(updateItem?.paid);
      setDate(updateItem?.date);
    }
  }, [updateItem]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        TransitionComponent={Transition}
      >
        <DialogTitle>Editar Registro</DialogTitle>
        <DialogContent>
          <>
            <DialogContentText>
              {
                "Para atualizar o registro faça as modificações e confirme. Se algum dado não está disponível para modificação, delete o registro e crie outro com dados diferentes.💔"
              }
            </DialogContentText>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <DateTimePicker
                  {...{
                    label: "Pagamento",
                    dateTime: date,
                    setDateTime: setDate,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <DropzoneArea
                  showPreviews={true}
                  showPreviewsInDropzone={false}
                  filesLimit={1}
                  useChipsForPreview
                  showAlerts={false}
                  dropzoneText="Arraste e solte um arquivo aqui ou clique"
                  previewText="Arquivo selecionado"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={paid}
                      onChange={({ target: { checked } }) => {
                        setPaid(checked);
                      }}
                    />
                  }
                  label="Pago"
                />
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdateConfirm}
            disabled={clicked}
            color="default"
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
