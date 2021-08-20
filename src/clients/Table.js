import MUIDataTable from "mui-datatables";
// Docs: https://github.com/gregnb/mui-datatables#readme
import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
// import Grid from "@material-ui/core/Grid";
// Demo: https://material-ui.com/components/grid/
// import FindInPageIcon from "@material-ui/icons/FindInPage";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
}));

const Table = ({ data }) => {
  const classes = useStyles();

  const columns = [
    {
      name: "fantasy",
      label: "Nome Fantasia"
    },
    {
      name: "type",
      label: "CNPJ Cadastrado?",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          value === "cnpj" ? "Sim" : "Não"
      }
    },
    {
      name: "cnpj",
      label: "CNPJ"
    },
    {
      name: "cpf",
      label: "CPF"
    },
    {
      name: "ie",
      label: "Inscrição Estadual"
    },
    {
      name: "rs",
      label: "Razão Social"
    },
    {
      name: "category",
      label: "Categoria"
    },
    {
      name: "branch",
      label: "Ramo de Atividade"
    },
    {
      name: "taxing",
      label: "Tributação"
    },
    {
      name: "address",
      label: "Endereço"
    },
    {
      name: "city",
      label: "Município"
    },
    {
      name: "state",
      label: "Unidade Federativa"
    },
    {
      name: "postal",
      label: "CEP"
    },
    {
      name: "since",
      label: "Início de Atividades"
    },
    {
      name: "member",
      label: "Cliente Desde"
    },
    {
      name: "edit",
      label: "Ações",
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

  const options = {
    filterType: "checkbox",
    print: false,
    enableNestedDataAccess: ".",
    selectableRowsHideCheckboxes: true,
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
