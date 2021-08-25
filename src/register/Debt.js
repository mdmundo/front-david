import { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
    months,
  } = useContext(FormContext);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dados do Débito
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Valor do débito"
            name="amount"
            value={amount}
            onChange={({ target: { value } }) => {
              setAmount(value);
            }}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            label="Mês Inicial"
            value={initialMonth}
            onChange={({ target: { value } }) => {
              setInitialMonth(value);
            }}
            fullWidth
          />
        </Grid> */}
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
        {/* <Grid item xs={12} sm={6}>
          <TextField
            label="Data de pagamento"
            disabled={!paid}
            value={date}
            onChange={({ target: { value } }) => {
              setDate(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={paid}
                onChange={({ target: { checked } }) => {
                  setPaid(checked);
                }}
              />
            }
            label="O valor já está pago"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Número de Parcelas"
            type="number"
            value={installments}
            onChange={({ target: { value } }) => {
              setInstallments(value > 0 ? (value < 13 ? value : 12) : 1);
            }}
            fullWidth
          />
        </Grid> */}
      </Grid>
    </>
  );
};

export default Debt;
