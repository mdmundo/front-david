const currencyBrlFormat = (input) =>
  input.replace(/(^\d$)|(^\d\d$)|(^\d{3,}$)/, (m, p1, p2, p3) =>
    p1
      ? `R$ 0,0${p1}`
      : p2
      ? `R$ 0,${p2}`
      : p3
      ? `R$ ${p3.replace(/\d\d$/, ",$&")}`
      : "R$ 0,00"
  );

const percentFormat = (input) => input.replace(/\d+/, "$&%");

const percentBounds = (input) =>
  input >= 0 ? (input <= 100 ? input : "100") : "0";

const dateFormat = (input) => input.split("-").reverse().join("/");

export { currencyBrlFormat, percentFormat, percentBounds, dateFormat };
