import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useRouter } from "next/router";
import {
  Dropdown,
  Navbar,
  Avatar,
  Button,
  Modal,
  Label,
  TextInput,
  Checkbox,
  Radio,
} from "flowbite-react";
import LastFmModal from "./LastFmModal";
import ProfilModale from "./ProfileModal";
import { AiOutlineHome, AiFillCalendar } from "react-icons/ai";
import { logout } from "../reducers/user";
import { deleteProfile } from "../reducers/profile";

function UserHeader() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [disambiguation, setDisambiguation] = useState("");
  const profile = useSelector((state) => state.profile.value);
  const user = useSelector((state) => state.user.value);

  const [avatar, setAvatar] = useState();
  const [lfModal, setLfModal] = useState(false);
  const loading = open && options.length === 0;

  const dispatch = useDispatch();

  const toggleLfModal = () => setLfModal(!lfModal);

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
      console.log(valueInput);
      fetch(`http://localhost:3000/artists/search/${valueInput}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.artists.length > 0) {
            data.artists.forEach((objet) => {
              // Vérification de l'existence de la clé "disambiguation"
              if (!objet.hasOwnProperty("disambiguation")) {
                // Ajout de la clé "disambiguation" avec une valeur vide
                objet.disambiguation = "";
              }
            });
            console.log(data);
            setOptions(data.artists);
          }
        })
        .catch((error) => {
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
    if (event.key === "Enter" && value) {
      router.push(`/search/${value}`);
      console.log("Recherche effectuée avec la valeur :", value);
    }
  };

  const handleSelect = (artistMbid) => {
    router.push(`/artist/${artistMbid}`);
  };

  const handleLogOut = () => {
    router.push("/home")

    dispatch(logout());
    dispatch(deleteProfile());
  };

  return (
    <Navbar
      className="bg-white border-gray-200  items-center w-full dark:bg-gray-900"
      fluid={true}
      rounded={true}
    >
      <div>
        {/* <input
          type="text"
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="block p-2.5 ml-3 w-full z-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="🔎 Search artist"
          required
        /> */}
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
          getOptionLabel={(option) =>
            option.name + " - " + option.disambiguation
          }
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
      </div>
      <div className={styles.title}>
        <Navbar.Brand href="/">Album Release</Navbar.Brand>
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/">
          <AiOutlineHome className="h-11 w-10" />
        </Navbar.Link>
        <Navbar.Link href="/calendar">
          <AiFillCalendar className="h-11 w-10" />
        </Navbar.Link>
        <Dropdown
          label={
            <Avatar
              alt="User settings"
              className="h-11 w-11 mr-3"
              img={profile.avatar}
              rounded={true}
            />
          }
          arrowIcon={false}
          inline={true}
        >
          <Dropdown.Item onClick={toggleLfModal}>Import</Dropdown.Item>
          <LastFmModal
            show={lfModal}
            dismissible={true}
            onClose={toggleLfModal}
          />
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              handleLogOut();
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default UserHeader;
