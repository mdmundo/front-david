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

export default function AddressForm() {
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
              <MenuItem value={"Serviço"}>Serviço</MenuItem>
              <MenuItem value={"Comércio"}>Comércio</MenuItem>
              <MenuItem value={"Indústria"}>Indústria</MenuItem>
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
              <MenuItem value={"Simples Nacional"}>Simples Nacional</MenuItem>
              <MenuItem value={"Lucro Presumido"}>Lucro Presumido</MenuItem>
              <MenuItem value={"Lucro Real"}>Lucro Real</MenuItem>
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
            >
              <MenuItem value={"Acre"}>Acre</MenuItem>
              <MenuItem value={"Alagoas"}>Alagoas</MenuItem>
              <MenuItem value={"Amapá"}>Amapá</MenuItem>
              <MenuItem value={"Amazonas"}>Amazonas</MenuItem>
              <MenuItem value={"Bahia"}>Bahia</MenuItem>
              <MenuItem value={"Ceará"}>Ceará</MenuItem>
              <MenuItem value={"Distrito Federal"}>Distrito Federal</MenuItem>
              <MenuItem value={"Espírito Santo"}>Espírito Santo</MenuItem>
              <MenuItem value={"Goiás"}>Goiás</MenuItem>
              <MenuItem value={"Maranhão"}>Maranhão</MenuItem>
              <MenuItem value={"Mato Grosso"}>Mato Grosso</MenuItem>
              <MenuItem value={"Mato Grosso do Sul"}>
                Mato Grosso do Sul
              </MenuItem>
              <MenuItem value={"Minas Gerais"}>Minas Gerais</MenuItem>
              <MenuItem value={"Pará"}>Pará</MenuItem>
              <MenuItem value={"Paraíba"}>Paraíba</MenuItem>
              <MenuItem value={"Paraná"}>Paraná</MenuItem>
              <MenuItem value={"Pernambuco"}>Pernambuco</MenuItem>
              <MenuItem value={"Piauí"}>Piauí</MenuItem>
              <MenuItem value={"Rio de Janeiro"}>Rio de Janeiro</MenuItem>
              <MenuItem value={"Rio Grande do Norte"}>
                Rio Grande do Norte
              </MenuItem>
              <MenuItem value={"Rio Grande do Sul"}>Rio Grande do Sul</MenuItem>
              <MenuItem value={"Rondônia"}>Rondônia</MenuItem>
              <MenuItem value={"Roraima"}>Roraima</MenuItem>
              <MenuItem value={"Santa Catarina"}>Santa Catarina</MenuItem>
              <MenuItem value={"São Paulo"}>São Paulo</MenuItem>
              <MenuItem value={"Sergipe"}>Sergipe</MenuItem>
              <MenuItem value={"Tocantins"}>Tocantins</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Município"
            value={city}
            onChange={({ target: { value } }) => {
              setCity(value);
            }}
            fullWidth
          />
        </Grid>
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
          <TextField
            label="Início de Atividades"
            value={since}
            onChange={({ target: { value } }) => {
              setSince(value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Cliente Desde"
            value={member}
            onChange={({ target: { value } }) => {
              setMember(value);
            }}
            fullWidth
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
}
