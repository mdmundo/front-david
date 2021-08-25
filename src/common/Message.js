import Snackbar from "@material-ui/core/Snackbar";

const Message = ({ open, setOpen, message }) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    open={open}
    onClose={() => {
      setOpen(false);
    }}
    autoHideDuration={1250}
    message={message || "Ocorreu um erro, mas não tenho mais informações😔"}
  />
);

export { Message as default };
