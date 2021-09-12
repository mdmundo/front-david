import { format } from "date-fns";

const currencyBrlFormat = (input) =>
  `${input}`.replace(/(^\d$)|(^\d\d$)|(^\d{3,}$)/, (m, p1, p2, p3) =>
    p1
      ? `R$ 0,0${p1}`
      : p2
      ? `R$ 0,${p2}`
      : p3
      ? `R$ ${p3.replace(/\d\d$/, ",$&")}`
      : "R$ 0,00"
  );

const currencyBrlFormatWithDots = (input) =>
  `${input}`.replace(
    /(^\d$)|(^\d\d$)|(^\d{1,2})?(\d{3})?(\d{3})?(\d{3})?(\d{3})?(\d{2}$)/,
    (m, p1, p2, p3, p4, p5, p6, p7, p8) =>
      p1
        ? `R$ 0,0${p1}`
        : p2
        ? `R$ 0,${p2}`
        : p8
        ? `R$ ${p3 ? p3 : ""}${p3 && p4 ? "." : ""}${p4 ? p4 : ""}${
            p5 ? "." : ""
          }${p5 ? p5 : ""}${p6 ? "." : ""}${p6 ? p6 : ""}${p7 ? "." : ""}${
            p7 ? p7 : ""
          },${p8}`
        : "R$ 0,00"
  );

const percentFormat = (input) => `${input}`.replace(/\d+/, "$&%");

const percentBounds = (input) =>
  parseInt(input) >= 0 ? (parseInt(input) <= 100 ? input : "100") : "0";

const dateFormat = (input) =>
  input ? format(new Date(input), "dd/MM/yyyy") : "";

const dateTimeFormat = (input) =>
  input ? format(new Date(input), "dd/MM/yyyy' às 'HH:mm") : "";

export {
  currencyBrlFormat,
  currencyBrlFormatWithDots,
  percentFormat,
  percentBounds,
  dateFormat,
  dateTimeFormat,
};
