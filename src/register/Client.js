import { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormContext } from "../context";
import DatePicker from "./DatePicker";

const Client = () => {
  const {
    cnpj,
    setCnpj,
    cpf,
    setCpf,
    type,
    setType,
    ie,
    setIe,
    rs,
    setRs,
    fantasy,
    setFantasy,
    category,
    setCategory,
    branch,
    setBranch,
    taxing,
    setTaxing,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    postal,
    setPostal,
    since,
    setSince,
    member,
    setMember,
    categories,
    taxes,
    cities,
    states
  } = useContext(FormContext);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dados do Cliente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CNPJ"
            disabled={type !== "cnpj"}
            value={cnpj}
            onChange={({ target: { value } }) => {
              setCnpj(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="CPF"
            value={cpf}
            onChange={({ target: { value } }) => {
              setCpf(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Inscrição Estadual"
            value={ie}
            onChange={({ target: { value } }) => {
              setIe(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Razão Social"
            value={rs}
            onChange={({ target: { value } }) => {
              setRs(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome Fantasia"
            value={fantasy}
            onChange={({ target: { value } }) => {
              setFantasy(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={category}
              onChange={({ target: { value } }) => {
                setCategory(value);
              }}
            >
              {categories.map((category, i) => (
                <MenuItem key={i} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ramo de Atividade"
            value={branch}
            onChange={({ target: { value } }) => {
              setBranch(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Tributação</InputLabel>
            <Select
              value={taxing}
              onChange={({ target: { value } }) => {
                setTaxing(value);
              }}
            >
              {taxes.map((tax, i) => (
                <MenuItem key={i} value={tax}>
                  {tax}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Unidade Federativa</InputLabel>
            <Select
              value={state}
              onChange={({ target: { value } }) => {
                setState(value);
              }}
              renderValue={({ full }) => full}
            >
              {states.map((state, i) => (
                <MenuItem key={i} value={state}>
                  {state.full}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {cities && city && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Município</InputLabel>
              <Select
                value={city}
                onChange={({ target: { value } }) => {
                  setCity(value);
                }}
                renderValue={({ city }) => city}
              >
                {cities.map((city, i) => (
                  <MenuItem key={i} value={city}>
                    {city.city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label="Endereço"
            value={address}
            onChange={({ target: { value } }) => {
              setAddress(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="CEP"
            value={postal}
            onChange={({ target: { value } }) => {
              setPostal(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
            {...{
              label: "Início de Atividades",
              date: since,
              setDate: setSince
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
            {...{ label: "Cliente Desde", date: member, setDate: setMember }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={type === "cnpj"}
                onChange={({ target: { checked } }) => {
                  setType(checked ? "cnpj" : "cpf");
                  if (!checked) setCnpj();
                }}
              />
            }
            label="Cadastrar CNPJ"
          />
        </Grid>
      </Grid>
    </>
  );
};

export { Client as default };
