import { useReducer, useEffect } from "react";
import AppBar from "../common/AppBar";
import { FormContext } from "../context";
import * as cities from "../common/cities";
import { categories, taxes, months, states } from "../common/lists";

const update = (state, update) => update;
const installment = ({ discount, total }) =>
  (total * ((100 - discount) / 100)).toFixed(0);
const installments = ({ index }) => 12 - index + 1;

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
