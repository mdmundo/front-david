import { useReducer, useEffect } from "react";
import AppBar from "../common/AppBar";
import { FormContext } from "../context";
import * as cities from "../common/cities";

const update = (state, update) => update;
const installment = ({ discount, total }) =>
  (total * ((100 - discount) / 100)).toFixed(0);
const installments = ({ index }) => 12 - index + 1;

const categories = ["Serviço", "Comércio", "Indústria"];
const taxes = ["Simples Nacional", "Lucro Presumido", "Lucro Real", "MEI"];
const months = [
  { index: 1, name: "Janeiro" },
  { index: 2, name: "Fevereiro" },
  { index: 3, name: "Março" },
  { index: 4, name: "Abril" },
  { index: 5, name: "Maio" },
  { index: 6, name: "Junho" },
  { index: 7, name: "Julho" },
  { index: 8, name: "Agosto" },
  { index: 9, name: "Setembro" },
  { index: 10, name: "Outubro" },
  { index: 11, name: "Novembro" },
  { index: 12, name: "Dezembro" },
];
const states = [
  { short: "AC", full: "Acre" },
  { short: "AL", full: "Alagoas" },
  { short: "AP", full: "Amapá" },
  { short: "AM", full: "Amazonas" },
  { short: "BA", full: "Bahia" },
  { short: "CE", full: "Ceará" },
  { short: "DF", full: "Distrito Federal" },
  { short: "ES", full: "Espírito Santo" },
  { short: "GO", full: "Goiás" },
  { short: "MA", full: "Maranhão" },
  { short: "MT", full: "Mato Grosso" },
  { short: "MS", full: "Mato Grosso do Sul" },
  { short: "MG", full: "Minas Gerais" },
  { short: "PA", full: "Pará" },
  { short: "PB", full: "Paraíba" },
  { short: "PR", full: "Paraná" },
  { short: "PE", full: "Pernambuco" },
  { short: "PI", full: "Piauí" },
  { short: "RJ", full: "Rio de Janeiro" },
  { short: "RN", full: "Rio Grande do Norte" },
  { short: "RS", full: "Rio Grande do Sul" },
  { short: "RO", full: "Rondônia" },
  { short: "RR", full: "Roraima" },
  { short: "SC", full: "Santa Catarina" },
  { short: "SP", full: "São Paulo" },
  { short: "SE", full: "Sergipe" },
  { short: "TO", full: "Tocantins" },
];

const Register = ({ title, Component }) => {
  // Client Form
  const [cnpj, setCnpj] = useReducer(update);
  const [cpf, setCpf] = useReducer(update);
  const [type, setType] = useReducer(update, "cnpj");
  const [ie, setIe] = useReducer(update);
  const [rs, setRs] = useReducer(update);
  const [fantasy, setFantasy] = useReducer(update);
  const [category, setCategory] = useReducer(update, categories[0]);
  const [branch, setBranch] = useReducer(update);
  const [taxing, setTaxing] = useReducer(update, taxes[0]);
  const [address, setAddress] = useReducer(update);
  const [state, setState] = useReducer(update, states[26]);
  const [city, setCity] = useReducer(update);
  const [postal, setPostal] = useReducer(update);
  const [since, setSince] = useReducer(update, new Date());
  const [member, setMember] = useReducer(update, new Date());

  // Debt Form
  const [total, setTotal] = useReducer(update, { int: "0", mask: "0,00" });
  const [discount, setDiscount] = useReducer(update, "0");
  const [note, setNote] = useReducer(update);
  const [deadline, setDeadline] = useReducer(update, "1");

  // Auxiliary Defs
  const [initialMonth, setInitialMonth] = useReducer(update, months[0]);
  const [availableCities, setAvailableCities] = useReducer(update);

  useEffect(() => {
    setAvailableCities(cities[state.short]);
    setCity(cities[state.short][0]);
  }, [state]);

  return (
    <FormContext.Provider
      value={{
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
        total,
        setTotal,
        discount,
        setDiscount,
        initialMonth,
        setInitialMonth,
        note,
        setNote,
        deadline,
        setDeadline,
        installment,
        installments,
        months,
        categories,
        taxes,
        cities: availableCities,
        states,
      }}
    >
      <AppBar {...{ title, Component }} />
    </FormContext.Provider>
  );
};

export { Register as default };
