import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import FindInPageIcon from "@material-ui/icons/FindInPage";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
}));

const Table = () => {
  const classes = useStyles();

  const columns = [
    "Nome",
    "Empresa",
    "Cidade",
    "Estado",
    {
      name: "Ações",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <IconButton className={classes.icon} color="textSecondary">
                <EditIcon />
              </IconButton>
              <IconButton className={classes.icon} color="textSecondary">
                <FindInPageIcon />
              </IconButton>
            </Grid>
          );
        }
      }
    }
  ];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY", "1"],
    ["John Walsh", "Test Corp", "Hartford", "CT", "2"],
    ["Bob Herm", "Test Corp", "Tampa", "FL", "3"],
    ["James Houston", "Test Corp", "Dallas", "TX", "4"]
  ];

  const options = {
    filterType: "checkbox"
  };

  return (
    <MUIDataTable
      title={"Lista de Clientes"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export { Table as default };
