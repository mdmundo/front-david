import { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FormContext } from "../context";

const Review = () => {
  const {
    cnpj,
    cpf,
    type,
    ie,
    rs,
    fantasy,
    category,
    branch,
    taxing,
    address,
    city,
    state,
    postal,
    since,
    member,
    amount,
    paid,
    date,
    ref,
    record,
    installments,
    initialMonth,
    months,
  } = useContext(FormContext);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Cliente
      </Typography>
      <List disablePadding>
        {type === "cnpj" && (
          <ListItem>
            <ListItemText primary="CNPJ" secondary={cnpj} />
          </ListItem>
        )}
        <ListItem>
          <ListItemText primary="CPF" secondary={cpf} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Tipo de cadastro"
            secondary={type.toUpperCase()}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Inscrição Estadual" secondary={ie} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Razão Social" secondary={rs} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Nome Fantasia" secondary={fantasy} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Categoria" secondary={category} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ramo de Atividade" secondary={branch} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Tributação" secondary={taxing} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Endereço" secondary={address} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Município" secondary={city} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Unidade Federativa" secondary={state} />
        </ListItem>
        <ListItem>
          <ListItemText primary="CEP" secondary={postal} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Início de Atividades" secondary={since} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Cliente Desde" secondary={member} />
        </ListItem>
      </List>
      <Typography variant="h6" gutterBottom>
        Débitos
      </Typography>
      <List disablePadding>
        <ListItem>
          <ListItemText primary="Valor do Débito" secondary={amount} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Mês Inicial" secondary={initialMonth.name} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Parcelas até o fim do ano"
            secondary={12 - initialMonth.index + 1}
          />
        </ListItem>
      </List>
    </>
  );
};

export { Review as default };
