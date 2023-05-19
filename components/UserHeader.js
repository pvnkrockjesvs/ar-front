import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";

function UserHeader() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (value) {
      console.log(value);
    }
    setTimeout(() => {
      if (value.length > 2) {
        fetch(`http://localhost:3000/artists/search/${value}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setOptions(data.artists.name);
          })
          .catch((error) => {
            console.error("Error fetching data 1:", error);
          });
      }
    }, 1000); // Ajouter une pause de 1 seconde (1000 millisecondes) avant cette requête
  }, [value]);

  //Fonction après appuie sur la touche entrée dans input text
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && value) {
      router.push(`/search/${value}`);
      console.log("Recherche effectuée avec la valeur :", value);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        {/* <Autocomplete
          id="search-artist"
          sx={{ width: 400, backgroundColor: "rgb(55, 165, 35)" }}
          filterOptions={(x) => x}
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          renderInput={(params) => (
            <TextField
              className={styles.textInput}
              {...params}
              label="🔎 Search artist"
              variant="outlined"
            />
          )}
        /> */}
        <input
          className={styles.messageContainer}
          type="text"
          placeholder="🔎 Search artist"
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      <div className={styles.title}>
        <span>Album Release</span>
      </div>
      <div className={styles.navMenu}>
        <div className={styles.linkContainer}>
          <FontAwesomeIcon className={styles.linkIcon} icon={faCalendar} />
          <Link href="/calendar">
            <span className={styles.linkText}>Calendar</span>
          </Link>
        </div>
        <div className={styles.linkContainer}>
          <FontAwesomeIcon className={styles.linkIcon} icon={faHome} />
          <Link href="/">
            <span className={styles.linkText}>Home</span>
          </Link>
        </div>
        <div className={styles.linkContainer}>
          <FontAwesomeIcon className={styles.linkIcon} icon={faUser} />
          <Link href="/">
            <span className={styles.linkText}>Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
