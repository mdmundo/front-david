import { useReducer } from "react";
import AppBar from "../common/AppBar";
import Steps from "./Steps";
import { FormContext } from "../context";

const update = (state, update) => update;

const Register = () => {
  const [cnpj, setCnpj] = useReducer(update);
  const [cpf, setCpf] = useReducer(update);
  const [type, setType] = useReducer(update, "cnpj");
  const [ie, setIe] = useReducer(update);
  const [rs, setRs] = useReducer(update);
  const [fantasy, setFantasy] = useReducer(update);
  const [category, setCategory] = useReducer(update);
  const [branch, setBranch] = useReducer(update);
  const [taxing, setTaxing] = useReducer(update);
  const [address, setAddress] = useReducer(update);
  const [city, setCity] = useReducer(update);
  const [state, setState] = useReducer(update);
  const [postal, setPostal] = useReducer(update);
  const [since, setSince] = useReducer(update);
  const [member, setMember] = useReducer(update);

  const [amount, setAmount] = useReducer(update);
  const [paid, setPaid] = useReducer(update);
  const [date, setDate] = useReducer(update);
  const [ref, setRef] = useReducer(update);
  const [record, setRecord] = useReducer(update);

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
      }}
    >
      <AppBar {...{ title: "Cadastro de Cliente", Component: <Steps /> }} />
    </FormContext.Provider>
  );
};

export { Register as default };
