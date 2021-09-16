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
import { percentFormat, currencyBrlFormatWithDots } from "../common/utils";
import RemoveDialog from "../common/RemoveDialog";
import UpdateDialog from "../edit/Debt";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Table = ({ data: remoteData }) => {
  const [data, setData] = useState(remoteData);

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
      name: "note",
      label: "Descrição",
    },
    {
      name: "total",
      label: "Valor Total",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          currencyBrlFormatWithDots(value),
      },
    },
    {
      name: "discount",
      label: "Desconto",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          percentFormat(value),
      },
    },
    {
      name: "installments",
      label: "Valor da Parcela",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          currencyBrlFormatWithDots(value[0].amount),
      },
    },
    {
      name: "installments",
      label: "Parcelas",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => value.length,
      },
    },
    {
      name: "installments",
      label: "Pago",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          value.filter((el) => el.paid).length,
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
                    navigate(`/debts/${value}`);
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
                    const [note] = tableMeta.rowData;
                    setUpdateURL(`/debts/${value}`);
                    setUpdateId(value);
                    setUpdateItem({ note });
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
                    setRemoveURL(`/debts/${value}`);
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
        title={"Lista de Débitos"}
        data={data}
        columns={columns}
        options={options}
      />
      <RemoveDialog
        deleteMessage="Deseja remover este débito permanentemente? Você não será capaz de desfazer esta ação."
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
    </>
  );
};

export { Table as default };
