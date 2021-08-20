import axios from "axios";

const instance = axios.create({
  baseURL: "https://0l5ox8r4.anyfiddle.run",
});

export { instance as default };
