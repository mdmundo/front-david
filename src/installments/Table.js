import { useState, useContext } from "react";
import MUIDataTable from "mui-datatables";
// Docs: https://github.com/gregnb/mui-datatables#readme
import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
// Demo: https://material-ui.com/components/grid/
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Avatar from "@material-ui/core/Avatar";

import AppContext from "../context";
import {
  currencyBrlFormatWithDots,
  dateFormat,
  dateTimeFormat,
} from "../common/utils";
import RemoveDialog from "../common/RemoveDialog";
import UpdateDialog from "../edit/Installment";
import Record from "./Record";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Table = ({ data: remoteData, id: debtId }) => {
  const [data, setData] = useState(remoteData);

  const [updateURL, setUpdateURL] = useState(`/debts/${debtId}`);
  const [removeId, setRemoveId] = useState();
  const [removeOpen, setRemoveOpen] = useState(false);

  const [updateId, setUpdateId] = useState();
  const [updateItem, setUpdateItem] = useState();
  const [updateOpen, setUpdateOpen] = useState(false);

  const [record, setRecord] = useState(false);
  const [recordURL, setRecordURL] = useState(false);

  const { axios, url } = useContext(AppContext);

  const classes = useStyles();

  const columns = [
    {
      name: "amount",
      label: "Valor",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          currencyBrlFormatWithDots(value),
      },
    },
    {
      name: "paid",
      label: "Pago",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          value ? "✔️" : "❌",
      },
    },
    {
      name: "ref",
      label: "Referência",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => dateFormat(value),
      },
    },
    {
      name: "deadline",
      label: "Vencimento",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => dateFormat(value),
      },
    },
    {
      name: "date",
      label: "Pagamento",
      options: {
        customBodyRender: (value, tableMeta, updateValue) =>
          value ? dateTimeFormat(value) : "Sem Data",
      },
    },
    {
      name: "record",
      label: "Comprovante",
      options: {
        filter: false,
        sort: false,
        download: false,
        empty: true,
        print: false,
        searchable: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Tooltip title="Ver">
            <IconButton
              className={classes.icon}
              color="textSecondary"
              edge="start"
              disabled={!value}
              onClick={() => {
                setRecordURL(
                  value
                    ? `${url}${value.formats?.medium?.url || value.url}`
                    : false
                );
                setRecord(true);
              }}
            >
              <Avatar
                variant="rounded"
                src={
                  value
                    ? `${url}${value.formats?.thumbnail?.url || value.url}`
                    : false
                }
              >
                <ReceiptIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        ),
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
              <Tooltip title="Editar">
                <IconButton
                  className={classes.icon}
                  color="textSecondary"
                  edge="start"
                  onClick={() => {
                    const [, paid, , , date, record] = tableMeta.rowData;
                    console.log(
                      "🚀 ~ file: Table.js ~ line 156 ~ Table ~ data",
                      data
                    );
                    setUpdateId(value);
                    setUpdateItem({ paid, date, record });
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
    rowsPerPage: 15,
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
        title={"Lista"}
        data={data}
        columns={columns}
        options={options}
      />
      <RemoveDialog
        deleteMessage="Deseja remover esta parcela permanentemente? Você não será capaz de desfazer esta ação."
        {...{
          data,
          setData,
          open: removeOpen,
          setOpen: setRemoveOpen,
          axios,
          updateURL,
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
      <Record {...{ open: record, setOpen: setRecord, url: recordURL }} />
    </>
  );
};

export { Table as default };
