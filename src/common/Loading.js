import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => (
  <Grid container direction="row" justifyContent="center" alignItems="center">
    <CircularProgress />
  </Grid>
);

export { Loading as default };
