import DateFnsUtils from "@date-io/date-fns";
import ptBR from "date-fns/locale/pt-BR";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

const DatePicker = ({ label, date, setDate }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
      <KeyboardDatePicker
        fullWidth
        cancelLabel="Cancelar"
        ampm={false}
        format="dd/MM/yyyy"
        label={label}
        value={date}
        onChange={(date) => {
          setDate(date);
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

const TimePicker = ({ label, time, setTime }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
      <KeyboardTimePicker
        fullWidth
        cancelLabel="Cancelar"
        ampm={false}
        label={label}
        value={time}
        onChange={(time) => {
          setTime(time);
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

const DateTimePicker = ({ label, dateTime, setDateTime }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
      <KeyboardDateTimePicker
        fullWidth
        cancelLabel="Cancelar"
        ampm={false}
        format="dd/MM/yyyy' às 'HH:mm"
        label={label}
        value={dateTime}
        onChange={(dateTime) => {
          setDateTime(dateTime);
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export { DatePicker as default, TimePicker, DateTimePicker };
