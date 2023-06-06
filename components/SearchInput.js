import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [fetchOk, setFetchOk] = useState(false);
  const loading = open && options.length === 0;

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  const onChangeHandle = (valueInput) => {
    if (valueInput === "" || undefined) {
      setValue("");
      setOptions([]);
    } else if (valueInput.length > 0) {
      setValue(valueInput);

      fetch(`http://ar-back.vercel.app/artists/search/${valueInput}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setFetchOk(true);
            data.artists.forEach((objet) => {
              // Vérification de l'existence de la clé "disambiguation"
              if (!objet.hasOwnProperty("disambiguation")) {
                // Ajout de la clé "disambiguation" avec une valeur vide
                objet.disambiguation = "";
              }
            });

            setOptions(data.artists);
          }
        })
        .catch((error) => {
          setFetchOk(false);
          console.error("Error fetching data 1:", error);
        });
    }
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  //Fonction après appuie sur la touche entrée dans input text
  const handleKeyDown = (event) => {
    setTimeout(() => {
      if (event.key === "Enter" && value && fetchOk) {
        router.push(`/search/${value}`);
        console.log("Recherche effectuée avec la valeur :", value);
        setOpen(false);
      }
    }, 1000);
  };

  const handleSelect = (artistMbid) => {
    setTimeout(() => {
      router.push(`/artist/${artistMbid}`);
    }, 1000);
  };

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 300 }}
        onKeyDown={handleKeyDown}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => {
          option.name === value.name;
          option.mbid === value.mbid;
          handleSelect(value.mbid);
        }}
        getOptionLabel={(option) => option.name + " - " + option.disambiguation}
        options={options}
        //loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="🔎 Search Artist"
            variant="outlined"
            onChange={(ev) => {
              if (ev.target.value !== "" || ev.target.value !== null) {
                onChangeHandle(ev.target.value);
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
}

export default SearchInput;
