const fs = require("fs");

const cities = [
  { state: "GO", city: "Turvânia" },
  { state: "GO", city: "Uirapuru" },
  { state: "GO", city: "Uruana" },
  { state: "GO", city: "Urutaí" },
  { state: "GO", city: "Varjão" },
  { state: "GO", city: "Vianópolis" },
  { state: "GO", city: "Vicentinópolis" },
  { state: "GO", city: "Turvelândia" },
  { state: "DF", city: "Brasília" },
  { state: "GO", city: "Vila Propício" },
  { state: "GO", city: "Vila Boa" },
  { state: "GO", city: "Valparaíso de Goiás" },
  { state: "GO", city: "Uruaçu" },
];

cities.sort((first, second) => {
  if (first.city < second.city) return -1;

  if (first.city > second.city) return 1;

  return 0;
});

cities.sort((first, second) => {
  if (first.state < second.state) return -1;

  if (first.state > second.state) return 1;

  return 0;
});

fs.writeFileSync("ordered-cities.json", JSON.stringify(cities));
