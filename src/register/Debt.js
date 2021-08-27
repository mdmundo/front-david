import { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormContext } from "../context";
import { percentBounds } from "../common/utils";

const Debt = () => {
  const {
    discount,
    setDiscount,
    total,
    setTotal,
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            label="Valor do Serviço"
            value={total}
            onChange={({ target: { value } }) => {
              setTotal(value);
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
        <Grid item xs={12} sm={6}>
          <TextField
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            label="Desconto"
            value={discount}
            onChange={({ target: { value } }) => {
              setDiscount(percentBounds(value));
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Debt;
