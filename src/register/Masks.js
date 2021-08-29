import MaskedInput from "react-text-mask";

const CnpjMask = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      guide={false}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
    />
  );
};

const CpfMask = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      guide={false}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
    />
  );
};

const CepMask = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      guide={false}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
    />
  );
};

const CurrencyMask = ({ inputRef, ...other }) => {
  return (
    <MaskedInput
      {...other}
      guide={false}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={(input) => {
        const rmComma = input.replace(",", "");
        const mask = Array(rmComma.length).fill(/\d/);
        mask.splice(-2, 0, ",");
        return mask;
      }}
      placeholderChar={"\u2000"}
    />
  );
};

export { CnpjMask, CpfMask, CepMask, CurrencyMask };
