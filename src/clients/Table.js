import { useState, useContext } from "react";
import { navigate } from "@reach/router";
import MUIDataTable from "mui-datatables";
// Docs: https://github.com/gregnb/mui-datatables#readme
import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
// Demo: https://material-ui.com/components/grid/
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FindInPageIcon from "@material-ui/icons/FindInPage";

import AppContext from "../context";
import { dateFormat } from "../common/utils";
import RemoveDialog from "../common/RemoveDialog";
import UpdateDialog from "../edit/Client";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Table = ({ data: remoteData }) => {
  const [data, setData] = useState(remoteData);

  // Used in Remove Dialog
  const [removeURL, setRemoveURL] = useState();
  const [removeId, setRemoveId] = useState();
  const [removeOpen, setRemoveOpen] = useState(false);

  const [updateURL, setUpdateURL] = useState();
  const [updateId, setUpdateId] = useState();
  const [updateItem, setUpdateItem] = useState();
  const [updateOpen, setUpdateOpen] = useState(false);

  const { axios } = useContext(AppContext);

  const classes = useStyles();

  const columns = [
    {
      name: "fantasy",
      label: "Nome Fantasia",
    },
    {
      name: "type",
      label: "Tipo de Cadastro",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          value.toUpperCase(),
      },
    },
    {
      name: "cnpj",
      label: "CNPJ",
    },
    {
      name: "cpf",
      label: "CPF",
    },
    {
      name: "ie",
      label: "Inscrição Estadual",
    },
    {
      name: "rs",
      label: "Razão Social",
    },
    {
      name: "category",
      label: "Categoria",
    },
    {
      name: "branch",
      label: "Ramo de Atividade",
    },
    {
      name: "taxing",
      label: "Tributação",
    },
    {
      name: "address",
      label: "Endereço",
    },
    {
      name: "city",
      label: "Município",
    },
    {
      name: "state",
      label: "Unidade Federativa",
    },
    {
      name: "postal",
      label: "CEP",
    },
    {
      name: "since",
      label: "Início de Atividades",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => dateFormat(value),
      },
    },
    {
      name: "member",
      label: "Cliente Desde",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => dateFormat(value),
      },
    },
    {
      name: "id",
      label: "Ações",
      options: {
        filter: false,
        sort: false,
        download: false,
        empty: true,
        print: false,
        searchable: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Grid
            container
            wrap="nowrap"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Tooltip title="Detalhes">
                <IconButton
                  className={classes.icon}
                  color="textSecondary"
                  edge="start"
                  onClick={() => {
                    navigate(`/clients/${value}`);
                  }}
                >
                  <FindInPageIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Editar">
                <IconButton
                  className={classes.icon}
                  color="textSecondary"
                  onClick={() => {
                    const [
                      fantasy,
                      type,
                      cnpj,
                      cpf,
                      ie,
                      rs,
                      category,
                      branch,
                      taxing,
                      address,
                      city,
                      state,
                      postal,
                      since,
                      member,
                    ] = tableMeta.rowData;
                    setUpdateURL(`/members/${value}`);
                    setUpdateId(value);
                    setUpdateItem({
                      fantasy,
                      type,
                      cnpj,
                      cpf,
                      ie,
                      rs,
                      category,
                      branch,
                      taxing,
                      address,
                      city,
                      state,
                      postal,
                      since,
                      member,
                    });
                    setUpdateOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Deletar">
                <IconButton
                  className={classes.icon}
                  color="textSecondary"
                  edge="end"
                  onClick={() => {
                    setRemoveURL(`/members/${value}`);
                    setRemoveId(value);
                    setRemoveOpen(true);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        ),
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    download: false,
    enableNestedDataAccess: ".",
    print: false,
    selectableRowsHideCheckboxes: true,
    textLabels: {
      body: {
        noMatch: "Desculpe, nenhum registro correspondente encontrado",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Próxima Página",
        previous: "Página Anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Pesquisar",
        downloadCsv: "Baixar CSV",
        print: "Imprimir",
        viewColumns: "Ver Colunas",
        filterTable: "Filtrar Tabela",
      },
      filter: {
        all: "Tudo",
        title: "FILTROS",
        reset: "RESETAR",
      },
      viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Mostrar/Ocultar Colunas da Tabela",
      },
      selectedRows: {
        text: "linha(s) selecionada(s)",
        delete: "Deletar",
        deleteAria: "Deletar Linhas Selecionadas",
      },
    },
  };

  return (
    <>
      <MUIDataTable
        title={"Lista de Clientes"}
        data={data}
        columns={columns}
        options={options}
      />
      <RemoveDialog
        deleteMessage="Deseja remover este cliente permanentemente? Você não será capaz de desfazer esta ação."
        {...{
          data,
          setData,
          open: removeOpen,
          setOpen: setRemoveOpen,
          axios,
          removeURL,
          removeId,
        }}
      />
      {updateItem && (
        <UpdateDialog
          {...{
            data,
            setData,
            open: updateOpen,
            setOpen: setUpdateOpen,
            axios,
            updateURL,
            updateId,
            updateItem,
          }}
        />
      )}
    </>
  );
};

export { Table as default };
