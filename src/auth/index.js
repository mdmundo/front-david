import { useEffect, useContext, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import axios from "axios";
import storage from "localforage";
import AppContext from "../context";
import Error from "../common/Error";
import Loading from "../common/Loading";
import AppBar from "../common/AppBar";

const Auth = () => {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { dispatchInstance, url } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    axios(`${url}/auth/google/callback${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(({ data }) => {
        storage.setItem("token", data.jwt).then((token) => {
          dispatchInstance(
            axios.create({
              baseURL: url,
              headers: { Authorization: `Bearer ${token}` },
            })
          );
          navigate("/clients");
        });
      })
      .catch((e) => {
        setError("Não foi possível entrar no servidor.");
        setOpen(true);
      });
  }, []);

  return (
    <AppBar
      {...{
        title: "Autenticação",
        Component: error ? (
          <Error {...{ error, open, setOpen }} />
        ) : (
          <Loading />
        ),
      }}
    />
  );
};

export { Auth as default };
