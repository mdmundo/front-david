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
import { CurrencyMask } from "./Masks";

const Debt = () => {
  const {
    discount,
    setDiscount,
    total,
    setTotal,
    initialMonth,
    setInitialMonth,
    note,
    setNote,
    deadline,
    setDeadline,
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
            value={total.mask}
            onChange={({ target: { value } }) => {
              // This regex supports until 21 chars
              setTotal({
                mask:
                  value.length > 21
                    ? "0,00"
                    : `${parseInt(value.replaceAll(/\.|,/g, ""))}`.replace(
                        /(^\d$)|(^\d\d$)|(^\d{1,2})?(\d{3})?(\d{3})?(\d{3})?(\d{3})?(\d{2}$)/,
                        (m, p1, p2, p3, p4, p5, p6, p7, p8) =>
                          p1
                            ? `0,0${p1}`
                            : p2
                            ? `0,${p2}`
                            : p8
                            ? `${p3 ? p3 : ""}${p3 && p4 ? "." : ""}${
                                p4 ? p4 : ""
                              }${p5 ? "." : ""}${p5 ? p5 : ""}${p6 ? "." : ""}${
                                p6 ? p6 : ""
                              }${p7 ? "." : ""}${p7 ? p7 : ""},${p8}`
                            : "0,00"
                      ),
                int: value.replaceAll(/\.|,/g, ""),
              });
            }}
            fullWidth
          />
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
          <FormControl fullWidth>
            <InputLabel>Dia do Vencimento</InputLabel>
            <Select
              value={deadline}
              onChange={({ target: { value } }) => {
                setDeadline(value);
              }}
            >
              {Array(28)
                .fill()
                .map((el, i) => (
                  <MenuItem value={i + 1}>{i + 1}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Descrição"
            value={note}
            onChange={({ target: { value } }) => {
              setNote(value);
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Debt;
