import { useContext } from "react";
import DateFnsAdapter from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FormContext } from "../context";

const dateFns = new DateFnsAdapter();

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
    total,
    discount,
    initialMonth,
    installment,
    installments,
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
          <ListItemText primary="Município" secondary={city.city} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Unidade Federativa" secondary={state.full} />
        </ListItem>
        <ListItem>
          <ListItemText primary="CEP" secondary={postal} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Início de Atividades"
            secondary={dateFns.format(dateFns.date(since), "dd/MM/yyyy")}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Cliente Desde"
            secondary={dateFns.format(dateFns.date(member), "dd/MM/yyyy")}
          />
        </ListItem>
      </List>
      <Typography variant="h6" gutterBottom>
        Débitos
      </Typography>
      <List disablePadding>
        <ListItem>
          <ListItemText primary="Valor do Serviço" secondary={`R$ ${total}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Desconto" secondary={`${discount}%`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Valor da Parcela"
            secondary={`R$ ${installment({
              discount,
              total,
              installments: installments(initialMonth),
            })}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Mês Inicial" secondary={initialMonth.name} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Parcelas até o fim do ano"
            secondary={installments(initialMonth)}
          />
        </ListItem>
      </List>
    </>
  );
};

export { Review as default };
