import { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { FormContext } from "../context";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Debt = () => {
  const {
    amount,
    setAmount,
    paid,
    setPaid,
    date,
    setDate,
    ref,
    setRef,
    record,
    setRecord,
    installments,
    setInstallments,
    initialMonth,
    setInitialMonth,
    months
  } = useContext(FormContext);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dados do Débito
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Valor da Parcela"
            name="amount"
            value={amount}
            onChange={({ target: { value } }) => {
              setAmount(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Mês Inicial</InputLabel>
            <Select
              value={initialMonth}
              renderValue={({ name }) => name}
              onChange={({ target: { value } }) => {
                setInitialMonth(value);
              }}
            >
              {months.map((month) => (
                <MenuItem value={month}>{month.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default Debt;
