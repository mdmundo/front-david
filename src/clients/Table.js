import MUIDataTable from "mui-datatables";
// Docs: https://github.com/gregnb/mui-datatables#readme
import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
// Demo: https://material-ui.com/components/grid/
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
        filter: false,
        sort: false,
        download: false,
        empty: true,
        print: false,
        searchable: false,
        customBodyRenderLite: (dataIndex, rowIndex) => (
          <Tooltip title="Editar">
            <IconButton className={classes.icon} color="textSecondary">
              <EditIcon />
            </IconButton>
          </Tooltip>
        )
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
    filterType: "checkbox",
    print: false,
    textLabels: {
      body: {
        noMatch: "Desculpe, nenhum registro correspondente encontrado",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`
      },
      pagination: {
        next: "Próxima Página",
        previous: "Página Anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de"
      },
      toolbar: {
        search: "Pesquisar",
        downloadCsv: "Baixar CSV",
        print: "Imprimir",
        viewColumns: "Ver Colunas",
        filterTable: "Filtrar Tabela"
      },
      filter: {
        all: "Todos ou Tudo",
        title: "FILTROS",
        reset: "RESETAR"
      },
      viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Mostrar/Ocultar Colunas da Tabela"
      },
      selectedRows: {
        text: "linha(s) selecionada(s)",
        delete: "Deletar",
        deleteAria: "Deletar Linhas Selecionadas"
      }
    }
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
