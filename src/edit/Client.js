import { useState, useEffect, forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import Message from "../common/Message";
import { CepMask, CnpjMask, CpfMask } from "../register/Masks";
import * as staticCities from "../common/cities";
import { categories, taxes, months, states } from "../common/lists";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateDialog = ({
  data,
  setData,
  open,
  setOpen,
  axios,
  updateURL,
  updateId,
  updateItem,
}) => {
  const [clicked, setClicked] = useState(false);

  const [resultOpen, setResultOpen] = useState(false);
  const [updatedSuccessfully, setDeletedSuccessfully] = useState(false);

  const [category, setCategory] = useState(updateItem.category);
  const [branch, setBranch] = useState(updateItem.branch);
  const [taxing, setTaxing] = useState(updateItem.taxing);
  const [address, setAddress] = useState(updateItem.address);
  const [state, setState] = useState(
    states.find((el) => el.short === updateItem.state)
  );
  const [city, setCity] = useState(updateItem.city);
  const [postal, setPostal] = useState(updateItem.postal);

  const [cities, setCities] = useState();

  const handleUpdateConfirm = () => {
    setClicked(true);

    axios
      .put(updateURL, { category })
      .then(({ data: updated }) => {
        const refresh = data.map((el) => (el.id === updateId ? updated : el));

        setData(refresh);
        setOpen(false);
        setClicked(false);

        setDeletedSuccessfully(true);
        setResultOpen(true);
      })
      .catch((e) => {
        setOpen(false);
        setClicked(false);

        setDeletedSuccessfully(false);
        setResultOpen(true);
      });
  };

  useEffect(() => {
    setCities(state && staticCities[state.short]);
    setCity(state && staticCities[state.short][0]);
  }, [state]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        TransitionComponent={Transition}
      >
        <DialogTitle>Editar Registro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "Para atualizar o registro faça as modificações e confirme. Se algum dado não está disponível para modificação, delete o registro e crie outro com dados diferentes."
            }
          </DialogContentText>

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
          <TextField
            label="Ramo de Atividade"
            value={branch}
            onChange={({ target: { value } }) => {
              setBranch(value);
            }}
            fullWidth
          />
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
          {cities && city && (
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
          )}
          <TextField
            label="Endereço"
            value={address}
            onChange={({ target: { value } }) => {
              setAddress(value);
            }}
            fullWidth
          />
          <TextField
            InputProps={{
              inputComponent: CepMask,
            }}
            label="CEP"
            value={postal}
            onChange={({ target: { value } }) => {
              setPostal(value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateConfirm}
            disabled={clicked}
            color="default"
          >
            {clicked ? "Aguarde..." : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
      <Message
        {...{
          open: resultOpen,
          setOpen: setResultOpen,
          message: updatedSuccessfully
            ? "Registro atualizado com sucesso✅"
            : "Não foi possível atualizar o registro❌",
        }}
      />
    </>
  );
};

export { UpdateDialog as default };
