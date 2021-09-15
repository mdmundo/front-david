const fs = require("fs");

const cities = JSON.parse(fs.readFileSync("cities.json"));

cities.sort((first, second) => {
  return first.city.localeCompare(second.city);
});

cities.sort((first, second) => {
  return first.state.localeCompare(second.state);
});

for (const state of [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]) {
  fs.writeFileSync(
    `${state}.json`,
    JSON.stringify(cities.filter((city) => state === city.state))
  );
}
