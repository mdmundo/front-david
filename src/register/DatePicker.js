import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = ({ label, date, setDate }) => {
  setDate(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        label={label}
        format="yyyy-MM-dd"
        value={date}
        onChange={(date) => {
          setDate(date);
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

const TimePicker = ({ label, time, setTime }) => {
  setTime(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        margin="normal"
        label={label}
        value={time}
        onChange={(time) => {
          setTime(time);
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export { DatePicker as default, TimePicker };
