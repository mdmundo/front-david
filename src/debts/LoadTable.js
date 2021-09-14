import { useEffect, useState, useContext } from "react";
import { navigate } from "@reach/router";
import { makeStyles, Grid, Button } from "@material-ui/core";

import Table from "./Table";
import AppContext from "../context";
import Error from "../common/Error";
import Loading from "../common/Loading";

const useStyles = makeStyles((theme) => ({
  create: {
    paddingBottom: theme.spacing(1.25),
  },
}));

const LoadTable = ({ id }) => {
  const [axiosData, setAxiosData] = useState();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { axios } = useContext(AppContext);

  useEffect(() => {
    if (!axios) {
      navigate("/");
    } else {
      axios(`/members/${id}`)
        .then(({ data: member }) => {
          return member;
        })
        .then(({ debts }) => {
          setAxiosData(debts);
        })
        .catch((e) => {
          setError("Ocorreu um erro. Não foi possível acessar os dados.");
          setOpen(true);
        });
    }
  }, []);

  const classes = useStyles();

  return axiosData ? (
    <>
      <Grid
        className={classes.create}
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Button
          size="small"
          onClick={() => {
            navigate(`/clients/${id}/new`);
          }}
        >
          Adicionar Débito
        </Button>
      </Grid>
      <Table data={axiosData} />
    </>
  ) : error ? (
    <Error {...{ error, open, setOpen }} />
  ) : (
    <Loading />
  );
};

export { LoadTable as default };
