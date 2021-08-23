import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

const Error = ({ error, open, setOpen }) => (
  <>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Typography variant="h1">😭</Typography>
    </Grid>
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      autoHideDuration={2000}
      message={error || "Ocorreu um erro."}
    />
  </>
);

export { Error as default };
