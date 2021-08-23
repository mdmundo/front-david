import Snackbar from "@material-ui/core/Snackbar";

const Message = ({ open, setOpen, error }) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    open={open}
    onClose={() => {
      setOpen(false);
    }}
    autoHideDuration={750}
    message={error || "Ocorreu um erro, mas não tenho mais informações."}
  />
);

export { Message as default };
