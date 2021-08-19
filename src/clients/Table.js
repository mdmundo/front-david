import { useEffect } from "react";
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

const Table = () => {
  useEffect(() => {}, []);

  const classes = useStyles();

  const columns = [
    {
      name: "name",
      label: "Name"
    },
    {
      name: "title",
      label: "Modified Title Label"
    },
    {
      name: "location",
      label: "Location"
    },
    {
      name: "age",
      Label: "Age"
    },
    {
      name: "salary",
      label: "Salary"
    },
    {
      name: "phone.home",
      label: "Home Phone"
    },
    {
      name: "phone.cell",
      label: "Cell Phone #"
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

  const data = [
    {
      name: "Gabby George",
      title: "Business Analyst",
      location: "Minneapolis",
      age: 30,
      salary: "$100,000",
      phone: { home: "867-5309", cell: "123-4567" }
    },
    {
      name: "Aiden Lloyd",
      title: "Business Consultant",
      location: "Dallas",
      age: 55,
      salary: "$200,000",
      phone: { home: "867-5310", cell: "123-4568" }
    },
    {
      name: "Jaden Collins",
      title: "Attorney",
      location: "Santa Ana",
      age: 27,
      salary: "$500,000",
      phone: { home: "867-5311", cell: "123-4569" }
    },
    {
      name: "Franky Rees",
      title: "Business Analyst",
      location: "St. Petersburg",
      age: 22,
      salary: "$50,000",
      phone: { home: "867-5312", cell: "123-4569" }
    }
  ];

  const options = {
    filterType: "checkbox",
    print: false,
    enableNestedDataAccess: ".",
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
