import styles from "../styles/Header.module.css";
import React, { useState, useEffect } from "react";
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

function ConnectionHeader(props) {

  const router = useRouter();
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleClick = (buttonType) => {
    props.selectSignOption(buttonType);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && value) {
      router.push(`/search/${value}`);
      console.log("Recherche effectuée avec la valeur :", value);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
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
      <Navbar>
      <Navbar.Collapse>
        <Navbar.Link onClick={(e) => handleClick("signup")}>
          Create an account
        </Navbar.Link>
        <Navbar.Link onClick={(e) => handleClick("signin")}>
          Connect
        </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default ConnectionHeader;
