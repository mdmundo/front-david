import { useState, forwardRef, useContext } from "react";
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

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import AppContext from "../context";
import Message from "../common/Message";
import { percentFormat, currencyBrlFormat, dateFormat } from "../common/utils";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Table = ({ data: remoteData }) => {
  const [data, setData] = useState(remoteData);

  const [removeId, setRemoveId] = useState();
  const [openOptions, setOpenOptions] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [resultOpen, setResultOpen] = useState(false);
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);

  const { axios } = useContext(AppContext);

  const handleClickOpenOptions = () => {
    setOpenOptions(true);
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };

  const handleDeleteConfirm = () => {
    setClicked(true);
    axios
      .delete(`/debts/${removeId}`)
      .then(() => {
        const refresh = data.filter((el) => el.id !== removeId);
        setData(refresh);
        setOpenOptions(false);
        setClicked(false);

        setDeletedSuccessfully(true);
        setResultOpen(true);
      })
      .catch((e) => {
        setOpenOptions(false);
        setClicked(false);

        setDeletedSuccessfully(false);
        setResultOpen(true);
      });
  };

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
          currencyBrlFormat(value),
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
          currencyBrlFormat(value[0].amount),
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
                  disabled
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
                    handleClickOpenOptions();
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
      <Dialog
        open={openOptions}
        onClose={handleCloseOptions}
        TransitionComponent={Transition}
      >
        <DialogTitle>Excluir Registro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "Deseja remover este cliente permanentemente? Você não será capaz de desfazer esta ação."
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteConfirm}
            disabled={clicked}
            color="secondary"
          >
            {clicked ? "Aguarde..." : "Deletar"}
          </Button>
          <Button autoFocus onClick={handleCloseOptions} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Message
        {...{
          open: resultOpen,
          setOpen: setResultOpen,
          message: deletedSuccessfully
            ? "Registro removido com sucesso😒"
            : "Não foi possível remover o registro💩",
        }}
      />
    </>
  );
};

export { Table as default };
